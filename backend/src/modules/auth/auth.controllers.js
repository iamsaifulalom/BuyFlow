export const authControllers = {
    userDetails: async (req, res, next) => {
        res.status(200).json({ name: "saiful", role: "admin" })
    }
}