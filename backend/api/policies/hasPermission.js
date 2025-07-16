const User = require('../mongoose-models/User');

module.exports = (permissionName) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            // Lấy user cùng với role và permission
            const user = await User.findById(userId).populate({
                path: 'roles',
                populate: {
                    path: 'permissions',
                    model: 'Permission'
                }
            });

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const userPermissions = user.roles.flatMap(role => role.permissions.map(p => p.name));
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
