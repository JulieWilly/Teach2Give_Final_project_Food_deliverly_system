const verifyUserDetails = async (req, res, next) => {
  try {
    const { custName, custEmail, custPhoneNumber, custLocation, approvedCust } =
      req.body;
    if (!custName)
      return res.status(400).json("Please provide a the customer name.");
    if (!custEmail)
      return res
        .status(400)
        .json("Please provide a the customer Email address.");
    if (!custPhoneNumber)
      return res
        .status(400)
        .json("Please provide a the customer phone number.");
    if (!custLocation)
      return res.status(400).json("Please provide a the customer location.");
    if (!approvedCust)
      return res
        .status(400)
        .json(
          "Please provide if the customers accout has been approved or has not been approved..",
        );
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default verifyUserDetails;
