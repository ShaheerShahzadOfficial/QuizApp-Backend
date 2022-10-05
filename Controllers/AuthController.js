import User from "../Models/UserSchema.js"
import jsonwebtoken from "jsonwebtoken"
import { stringToHash,varifyHash } from "bcrypt-inzi";

// //  😊😊  SignUp Form Started 😘😘

const RegisterUser = async (req, res, next) => {
    let { name, email, password } = req.body

    const find =  await User.findOne({email})
    if(find) {
      return res.status(401).json({"msg":"You Are Already a User"})  
    }
    stringToHash(password).then( async hash => {
        req.body.password = hash
        await User.create(req.body).then((result) => {  
           res.status(201).json({"msg":"Registeration Successfully",
           "user":result})
        }).catch((err) => {
           res.status(500).json({"msg":err})
        });
     
     })  
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignUp Form Ended 🙋🏻‍♀️🙋🏻‍♀️


// //  😊😊  SignIn Form Started 😘😘

const Login = async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return (
            res.status(400).json({msg:"Please Enter Email && Password !"})
        )
    }

    const user = await User.findOne({ email })
    if (!user) {
       return res.status(401).json({ "msg": "You Are Not Registered User" })
    }
 
    varifyHash(password, user.password).then(async result => {
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
             msg: "You Are Logged In Successfully",
             "token": token,
             user:user
          })
 
       } else {
          res.status(500).json({ "msg": "Email Or Password Doesn't Match" })
       }
    }).catch(e => {
       console.log("error: ", e)
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


const GetUserDetail = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

}

export {
    RegisterUser,
    Login,
    Logout,
    GetUserDetail
}