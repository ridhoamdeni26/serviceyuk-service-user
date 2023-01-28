const { User } = require("../../../models");

module.exports = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  const user = await User.findOne({
    where: { confirmation_code: confirmationCode },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User with confirmation email not found",
    });
  }

  const statusUser = 1;
  const userId = user.id;
  const updateConfirmationEmail = await User.update(
    {
      status_id: statusUser,
      confirmation_code: "",
    },
    {
      where: {
        id: userId,
      },
    }
  );

  if (updateConfirmationEmail) {
    return res.json({
      status: "success",
      message: "Success Verification Email",
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "Error Verification Email",
    });
  }
};
