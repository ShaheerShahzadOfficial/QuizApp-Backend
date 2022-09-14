import Quiz from "../Models/QuizSchema.js";

const createQuizQuestion = async (req, res, next) => {
    await Quiz.create(req.body).then((result) => {
        res.status(201).json({
            quiz: result,
            success: true
        })
    })
}


const DeleteQuizQuestion = async (req, res, next) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }

}



export {
    createQuizQuestion, DeleteQuizQuestion
}