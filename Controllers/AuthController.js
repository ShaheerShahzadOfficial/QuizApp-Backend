import User from "../Models/UserSchema.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

// //  😊😊  SignUp Form Started 😘😘


const RegisterUser = async (req, res, next) => {
    let { name, email, password } = req.body

const findUser = await User.findOne({email})
if (findUser) {
return(
    res.status(500).json({
        msg: ` User Already Exist with this Email `
    })
)
}

    const SALT_ROUND = 10
    await bcrypt.hash(password, SALT_ROUND, async (err, hash) => {
        if (err) {
            return (
                res.status(500).json({
                    msg: ` ${err.message} `
                })
            )
        } else {
                 await User.create({
                name, email, password: hash,
            }).then((result) => {
                res.status(201).json({
                    success: true,
                    email: result.email,
                    name: result.name,
                    createdAt: result.createdAt,
                    message: "Login Successfull",
                    role: result.role,
                    message: " Registeration Successful  "
                })
            }).catch((err) => {
              
                res.status(500).json({
                    message: err.message
                })
            });
        }
    })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignUp Form Ended 🙋🏻‍♀️🙋🏻‍♀️

// 

// //  😊😊  SignIn Form Started 😘😘

const Login = async (req, res, next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return (
            res.status(400).json({msg:"Please Enter Email && Password !"})
        )
    }


    const userFound = await User.findOne({ email })
        .then(async (user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    const token = jsonwebtoken.sign(
                        {
                            email,
                            name: user.name,
                            role: user.role,
                            id: user._id
                        },
                        process.env.ACCESS_TOKEN,
                        {
                            expiresIn: process.env.EXPIRES_IN
                        }
                    )

                    res.cookie('authToken', token, {
                        expires: new Date(
                            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                        httpOnly: false,
                        maxAge: 120 * 60 * 60 * 1000,
                    })


                    res.status(200).json({
                        token,
                        email,
                        name: user.name,
                        avatar: user.avatar,
                        createdAt: user.createdAt,
                        message: "Login Successfull",
                        role: user.role,

                    })



                }
                if (!result) {
                    res.status(401).json({
                        msg: "Email or Password not matched",
                    })
                }


            })
        }).catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

//   SignIn Form Ended 


// logout

const Logout = async (req, res, next) => {
    res
        .clearCookie("authToken")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}

export {
    RegisterUser,
    Login,
    Logout
}