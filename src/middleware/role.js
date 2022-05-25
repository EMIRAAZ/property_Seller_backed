exports.role = {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  USER: 'USER',
};

function authRole(role = []) {
  return (req, res, next) => {
    if (req.user && role.includes(req.user.role)) next();
    else throw new Error('Access denied');
  };
}
module.exports = authRole;
