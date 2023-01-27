const { User, Sequelize } = require("../../../models");
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

clientRedis.on("error", (err) => console.log("Redis Client Error", err));
clientRedis.on("connect", function () {
  console.log("Connected!");
});

clientRedis.connect();

module.exports = async (req, res) => {
  try {
    //* Params Input
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = limit * page;
    const userIds = req.query.userIds || [];
    var queryInside;

    const sqlOptions = [
      "id",
      "username",
      "email",
      "images",
      "phone",
      "slug",
      "address_id",
      "dob",
      "sex",
      "status_id",
    ];

    // * check User Ids Input
    if (userIds.length) {
      queryInside = {
        id: userIds,
      };
    }

    // * check search Input
    if (search.length) {
      queryInside = {
        [Op.or]: [
          {
            username: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
    }

    // //* Total User
    const totalUser = await User.count({
      where: queryInside,
    });

    //* Total Page
    const totalPage = Math.ceil(totalUser / limit);

    if (page >= totalPage) {
      return res.status(404).json({
        status: "error",
        message: "No page found",
      });
    }

    const users = await User.findAll({
      attributes: sqlOptions,
      where: queryInside,
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
    });

    if (totalPage) {
      return clientRedis.get(`users:${userIds}`, (err, exists) => {
        //* check if available or not in redis
        if (err) {
          throw err;
        }
        if (exists) {
          return res.status(200).json({
            status: "success",
            message: "get from redis",
            data: {
              page: page,
              limit: limit,
              totalUser: totalUser,
              totalPage: totalPage,
              result: users,
            },
          });
        } else {
          //* Input to Redis
          clientRedis.setex(
            `users:${userIds}`,
            3600,
            JSON.stringify({ users })
          );
          return res.status(200).json({
            status: "success",
            message: "store to redis",
            data: {
              page: page,
              limit: limit,
              totalUser: totalUser,
              totalPage: totalPage,
              result: users,
            },
          });
        }
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Users not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
