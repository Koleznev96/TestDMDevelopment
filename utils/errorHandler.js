module.exports = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        error: error.message ? error.message : error
    });
}