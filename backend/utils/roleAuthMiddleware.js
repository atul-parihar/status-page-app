const authorizeRoles = (roles) => (req, res, next) => {

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
    }

    // Prevent non-admins from assigning roles during registration
    if (req.body.role && req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can assign roles." });
    }

    next();
};

export default authorizeRoles;