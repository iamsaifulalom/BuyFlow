// src/common/utils/send-response.js

export const sendResponse = ({ res, success, message, statusCode, data }) => {

    const response = {
        success,
        message
    }

    if (data) response.data = data

    return res.status(statusCode).json(response)
}
