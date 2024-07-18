import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token)
      return res
        .status(401)
        .json({ sucess: false, message: "Unauthorized user." });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error)
        return res
          .status(401)
          .json({ success: false, message:error.message });
      req.user = decoded;

      next();
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export default verifyToken;
