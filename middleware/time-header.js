module.exports = function (req, res, next) {
    res.set('x-server-time', Date.now());
    next();
};