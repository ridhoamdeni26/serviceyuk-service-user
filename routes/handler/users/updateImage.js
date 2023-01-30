require("dotenv").config();
const { User } = require("../../../models");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { MYHOSTNAME } = process.env;
const fs = require("fs");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      id: "string|empty:false|min:6|max:255",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const id = req.body.id;
    const image = req.body.image;

    //* Check base64
    if (!isBase64(image, { mimeRequired: true })) {
      return res.status(400).json({
        status: "error",
        message: "Invalid image base64",
      });
    }

    // * Check User
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const slugUser = user.slug;
    const userId = user.id;
    const userImages = user.images;

    base64Img.img(
      image,
      `public/images/${slugUser}`,
      `${slugUser}` + "-" + Date.now(),
      async (err, filepath) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            message: err.message,
          });
        }
        const filename = filepath.split("\\").pop().split("/").pop();

        if (userImages) {
          fs.unlink(`./public/${userImages}`, async (err) => {
            if (err) {
              return res.status(400).json({
                status: "error",
                message: err.message,
              });
            }
          });
        }

        await User.update(
          { images: `images/${slugUser}/${filename}` },
          {
            where: {
              id: userId,
            },
          }
        );

        return res.json({
          status: "success",
          data: {
            id: userId,
            images: `${MYHOSTNAME}/images/${slugUser}/${filename}`,
          },
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
