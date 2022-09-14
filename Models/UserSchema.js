import mongoose from "mongoose"
import validator from 'validator';

const UserSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [30, "Name Cannot exceed 30 Character"],
        minLenght: [5, "Name Should have Atleast 5 character"]

    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        validate: [validator.isStrongPassword, "Please Enter Strong Password"],
        minLenght: [8, "Password Should have Atleast 8 character"],
    },
    role: {
        type: String,
        default: "Student"          
    },
    AlowedToAttemptQuiz: {
        type: Boolean,
        default: false          
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


})

const User = mongoose.model("User", UserSchema)
export default User