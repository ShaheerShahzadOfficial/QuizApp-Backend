import User from "../Models/UserSchema.js"

const GetAllUser = async (req, res, next) =>{
const Users = await User.find()
res.status(200).json({
    Users
})
}

const DeleteUser = async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
return res.status(404).json({msg:"user not found"})
    }

  await user.remove()

  res.status(404).json({msg:"user has been removed"})
}


const UpdateUserRole = async (req,res,next) =>{

const {role} = req.body

    await User.findByIdAndUpdate(req.params.id, {role});

    res.status(200).json({
        success: true,
    });
}


const AllowUsertoAtemptQuiz = async (req,res,next) =>{

    const {AlowedToAttemptQuiz} = req.body
    
        await User.findByIdAndUpdate(req.params.id, {AlowedToAttemptQuiz});
    
        res.status(200).json({
            success: true,
        });
    }

export {
    GetAllUser,DeleteUser,UpdateUserRole,AllowUsertoAtemptQuiz
}