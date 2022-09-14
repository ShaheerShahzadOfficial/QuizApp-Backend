import mongoose from "mongoose"

const QuizSchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    },
    question: {
        required: true,
        type: String
    },
    Answers: [
        {
            required: true,
            type: String
        }
    ],
    CorrectAnswer: {
        required: true,
        type: String
    },
    time: [{

        time: {
            type: Number,
            required: true
        },
        prefix:{
            type:String,
            required:true
        }

    }]

})

const Quiz = mongoose.model("Quiz", QuizSchema)
export default Quiz