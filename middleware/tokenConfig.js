import jwt from "jsonwebtoken";
import "@dotenvx/dotenvx";

const tokenConfig = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token Invalid" });
    }
  }

  res.status(400).json({ message: "No token provided" });
};

export default tokenConfig;