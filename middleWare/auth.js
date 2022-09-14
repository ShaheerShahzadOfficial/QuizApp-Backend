import jsonwebtoken from "jsonwebtoken"

function checkToken(req, res, next) {
    //get authcookie from request
    const { authToken } = req.cookies

    if (!authToken) {
        return res.status(401).json({
            msg:"Please Login to access this resource"
        })
    }

    //verify token which is in cookie value
    const decoded = jsonwebtoken.verify(authToken, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            res.status(403).json({
                Message: "You Are Not Authenticated"
            }
            )
            console.log(err)

        }
        else if (decoded) {
            req.user = decoded
            next()
        }
    }
    )
}



const AuthenticatedUserRole = (roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                msg:`Role: ${req.user.role} is not allow to access this Resource`
            })
        }

        next()
    }

}






export {
    AuthenticatedUserRole,
    checkToken
}