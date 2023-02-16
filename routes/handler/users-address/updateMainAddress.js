const { AddressUser, User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const id = req.params.uuid;

    //* Check User Address
    const userAddress = await AddressUser.findOne({
      where: { id: id },
    });
    if (!userAddress) {
      return res.status(404).json({
        status: "error",
        message: "User Address not found",
      });
    }

    const userId = userAddress.user_id;
    //* Check User Address
    const getDataUserAddress = await AddressUser.findOne({
      where: { user_id: userId, active_address: "active" },
    });

    //* If the user has an active address, set it to inactive
    if (getDataUserAddress) {
      getDataUserAddress.active_address = "not active";
      await getDataUserAddress.save();
    }

    //* Find the address the user wants to set as active
    const sqlOptions = ["id", "address", "active_address"];

    const addressToSetActive = await AddressUser.findByPk(id, {
      attributes: sqlOptions,
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });

    //* Set the address as active
    addressToSetActive.active_address = "active";
    await addressToSetActive.save();

    await User.update(
      { address_id: id },
      {
        where: {
          id: addressToSetActive.User.id,
        },
      }
    );

    return res.json({
      status: "success",
      message: "Main user address update successfully!",
      data: addressToSetActive,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
