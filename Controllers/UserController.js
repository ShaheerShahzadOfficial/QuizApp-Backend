const GetUserDetail = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

}

export {
    GetUserDetail
}