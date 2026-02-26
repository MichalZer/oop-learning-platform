import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {

    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    if (!authHeader||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
}
try {
    //Extract the token part from the header
    const token = authHeader.split (" ")[1];

    // Verify the token using the secret key (will throw if expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information from the token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    // If verification fails, return an unauthorized error
    res.status(401).json({ message: "Invalid token" });
  }
}