const sendResponse = (res, status, message, data, others) => {
    return res.status(status).json({
        success: true,
        message,
        data: data || {},
        ...others,
    });
};

module.exports = sendResponse;
