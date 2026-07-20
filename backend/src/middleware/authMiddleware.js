import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log("Headers:");
  console.log(req.headers);

  const authHeader = req.headers.authorization;

  console.log("Authorization:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(403).json({
      message: "Invalid Token",
    });
  }
};
