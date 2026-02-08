import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {

    // Get the Authorization header from the request
    const autHaeder = req.headers.authorization;

    if (!autHaeder||!authHaeder.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
}
try {
    //Extract the token part from the header
    const token = authHaeder.split (" ")[1];

    // Verify the token using the secret key
    const secoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information from the token to the request object
    req.user = secoded;

    // Proceed to the next middleware or route handler
    next();
}catch (err) {
    // If verification fails, return an unauthorized error
    res.status(401).json({ message: "Invalid token" });
  }
}