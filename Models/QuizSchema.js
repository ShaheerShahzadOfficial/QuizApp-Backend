import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: String,
    option:[{
        type:String
    }],
    CorrectAnswer:String,
    course:String,
    time:Number,
    Student:{
        
    }
})

const Quiz = mongoose.model("Quiz",quizSchema)

export default Quiz