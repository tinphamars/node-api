const catchHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
module.exports = catchHandler
