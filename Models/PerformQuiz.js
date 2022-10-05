import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    quiz:[{
        question:String,
        answer:String
    }],
    Score:Number,
    Course:String,
    Student:[{
        id:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },name:String,email:String
}]
})


const AttemptQuiz = mongoose.model("QuizAttempted",quizSchema)

export default AttemptQuiz
