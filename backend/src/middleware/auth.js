const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ message: 'No token' });
const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ message: 'No token' });
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload; // payload: { id, role }
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
}


function requireAdmin(req, res, next) {
if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
next();
}


module.exports = { authMiddleware, requireAdmin };