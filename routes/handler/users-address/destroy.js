const { AddressUser, User } = require("../../../models");
const redis = require("redis");
const clientRedis = redis.createClient({
  url: "redis://redis:6379",
  legacyMode: true,
  enableOfflineQueue: false,
  retry_strategy(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.times_connected > 10) {
      return undefined;
    }
    return Math.max(options.attempt * 100, 3000);
  },
});

clientRedis.connect();

module.exports = async (req, res) => {
  try {
    const userIds = req.params.uuid;

    const userAddress = await AddressUser.findOne({
      where: { id: userIds },
    });
    if (!userAddress) {
      return res.status(404).json({
        status: "error",
        message: "User Address not found",
      });
    }

    clientRedis.get(`users-address:${userIds}`, async (err, exists) => {
      //* check if available or not in redis

      if (exists) {
        clientRedis.del(`users-address:${userIds}`);

        const updateUsersAddress = await AddressUser.findByPk(userIds);
        // * Get user_id from Users Address

        const usersData = updateUsersAddress.user_id;

        await User.update(
          { address_id: null },
          {
            where: {
              id: usersData,
            },
          }
        );

        await AddressUser.destroy({
          where: { id: userIds },
        });

        return res.status(200).json({
          status: "success",
          message: "Users Address deleted successfully",
        });
      } else {
        const updateUsersAddress = await AddressUser.findByPk(userIds);
        // * Get user_id from Users Address

        const usersData = updateUsersAddress.user_id;

        await User.update(
          { address_id: null },
          {
            where: {
              id: usersData,
            },
          }
        );

        await AddressUser.destroy({
          where: { id: userIds },
        });

        return res.status(200).json({
          status: "success",
          message: "Users Address deleted successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
