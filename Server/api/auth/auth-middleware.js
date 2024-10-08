

function authenticate(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next()
    } else {
        res.status(401).json({ you: "this is not accesable" });
    }
};



function authorize(roles = []) {
    // roles param can be a single role or an array of roles
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Assuming req.user is populated after authentication
        if (!req.user) {
            // If the user is not logged in
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            // If the user's role is not in the allowed roles
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }

        // User is authorized
        next();
    };
}

module.exports = { authenticate, authorize };