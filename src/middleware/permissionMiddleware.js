// middlewares/permissionMiddleware.js

const permission = (requiredRoles) => {
    return (req, res, next) => {
      try {
        const userRoles = req.user.roles;
  
        const hasPermission = requiredRoles.some(role => userRoles.includes(role));
  
        if (!hasPermission) {
            return res.errorKey('PERMISSION').error();
        }
  
        next();
      } catch (err) {
        console.error('Permission error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
  };
  
  module.exports = permission;
  