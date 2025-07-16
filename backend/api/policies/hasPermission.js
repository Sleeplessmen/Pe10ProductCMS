const User = require('../mongoose-models/User');

module.exports = (permissionName) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            // Truy vấn user và populate role + permissions
            const user = await User.findById(userId).populate({
                path: 'role',
                populate: {
                    path: 'permissions',
                    model: 'Permission'
                }
            });

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const role = user.role;
            if (!role || !Array.isArray(role.permissions)) {
                return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
            }

            const userPermissions = role.permissions.map(p => p.name);
            const hasPermission = userPermissions.includes(permissionName);

            if (!hasPermission) {
                return res.status(403).json({ message: 'Forbidden: Bạn không có quyền.' });
            }

            return next();
        } catch (err) {
            console.error('[hasPermission] Error:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};
