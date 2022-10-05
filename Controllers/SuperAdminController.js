import User from "../Models/UserSchema.js"

const GetAllUser = async (req, res, next) =>{
 await User.find().then((result) => {
    res.status(200).json({
        Users:result
    })
}).catch((err) => {
    res.status(500).json({
        err
    })
});

}

const DeleteUser = async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
return res.status(404).json({msg:"user not found"})
    }

  await user.remove()

  res.status(200).json({msg:"user has been removed"})
}


 const UpdateUser = async (req, res) => {
        const user = await User.findById(req.params.id)
        const { AlowedToAttemptQuiz, role } = req.body
        if (!user) {
            return res.status(404).json({ msg: "No User Found" })
        }
        await User.findByIdAndUpdate(req.params.id, { AlowedToAttemptQuiz, role }).then((result) => {
            res.status(200).json({ msg: "User Updated Successfully" })
        }).catch((err) => {
            res.status(500).json({ msg: err })
        });

}

export {
    GetAllUser,DeleteUser,UpdateUser
}