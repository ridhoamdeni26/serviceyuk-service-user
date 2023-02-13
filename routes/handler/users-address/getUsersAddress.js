const {
  AddressUser,
  User,
  Sequelize,
  Province,
  City,
  Subdistrict,
} = require("../../../models");
const Op = Sequelize.Op;
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
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = limit * page;
    const userIds = req.query.userIds || [];
    var queryInside;

    const sqlOptions = [
      "id",
      "type_address",
      "address",
      "province_id",
      "city_id",
      "subdistrict_id",
      "postal_code",
      "active_address",
    ];

    if (userIds.length) {
      queryInside = {
        user_id: userIds,
      };
    }

    if (search.length) {
      queryInside = {
        [Op.or]: [
          {
            address: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
    }

    // //* Total Address Users
    const totalUsersAddress = await AddressUser.count({
      where: queryInside,
    });

    //* Total Page
    const totalPage = Math.ceil(totalUsersAddress / limit);

    if (page >= totalPage) {
      return res.status(404).json({
        status: "error",
        message: "No page found",
      });
    }

    const usersAddress = await AddressUser.findAll({
      attributes: sqlOptions,
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
        {
          model: Province,
          attributes: ["name_province"],
        },
        {
          model: City,
          attributes: ["name_city"],
        },
        {
          model: Subdistrict,
          attributes: ["name_subdistrict"],
        },
      ],
      where: queryInside,
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
    });

    if (totalPage) {
      return clientRedis.get(
        `users-address:${userIds}:${search}`,
        (err, exists) => {
          //* check if available or not in redis
          if (err) {
            throw err;
          }
          if (exists) {
            return res.status(200).json({
              status: "success",
              data: {
                page: page,
                limit: limit,
                totalUserAddress: totalUsersAddress,
                totalPage: totalPage,
                result: usersAddress,
              },
            });
          } else {
            //* Input to Redis
            clientRedis.setex(
              `users-address:${userIds}:${search}`,
              3600,
              JSON.stringify({ usersAddress })
            );

            return res.status(200).json({
              status: "success",
              data: {
                page: page,
                limit: limit,
                totalUserAddress: totalUsersAddress,
                totalPage: totalPage,
                result: usersAddress,
              },
            });
          }
        }
      );
    } else {
      return res.status(404).json({
        status: "error",
        message: "Users Address not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
