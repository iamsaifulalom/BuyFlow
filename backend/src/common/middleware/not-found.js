// src/common/middleware/notFound.js

export function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        message: `${req.method.toString()} "${req.originalUrl}" route  not found`
    });
}
