import { uploadService } from "./asset.service.js"

export const uploadController = {
    signUrl: async (req, res, next) => {
        try {
            const signedUrlAndKey = await uploadService.signUrl(req.body);
            res.status(200).json({
                success: true,
                message: "Sign url successfully",
                data: signedUrlAndKey
            })
        } catch (error) {
            next(error)
        }
    },
}