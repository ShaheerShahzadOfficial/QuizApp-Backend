import Quiz from "../Models/QuizSchema.js";
import AttemptQuiz from "../Models/PerformQuiz.js"
const createQuizQuestion = async (req, res, next) => {
    const { question, option, CorrectAnswer, course, time } = req.body

    if (!question || !option || !CorrectAnswer  || !course || !time) {
        return res.status(500).json({ "msg": "All Always Are Required" })
    }

    await Quiz.create({ question, option, CorrectAnswer, course, time }).then((result) => {
        res.status(201).json({ "quiz": result,"Success":true })
    }).catch((err) => {
        res.status(500).json({ "msg": err })
    });
}


const getQuiz = async (req,res) =>{
    await Quiz.find().then((result) => {
        res.status(200).json({ "quiz": result })
    }).catch((err) => {
        res.status(500).json({ "msg": err })
    });      
}


const getQuizByCategories = async (req,res) =>{
    await Quiz.find({course:req.params.id}).then((result) => {
        res.status(200).json({ "quiz": result })
    }).catch((err) => {
        res.status(500).json({ "msg": err })
    });      
}

const DeleteQuizQuestion = async (req, res, next) => {
    const question =  await Quiz.findById(req.params.id)
    if (!question) {
        return res.status(500).json({msg:"No Question found"})
    }
    await question.delete()
    res.status(200).json({
        success: true,
        msg: "product is deleted successfully"
    })

}


const submitCompleteQuiz = async (req, res)=>{
    
    const { quiz, Score, Course, Student } = req.body

    if (!quiz || !Score || !Course || !Student ) {
        return res.status(500).json({ "msg": "Invalid Data" })
    }

    await AttemptQuiz.create({quiz, Score, Course, Student }).then((result) => {
        res.status(201).json({ "result": result,"Success":true })
    }).catch((err) => {
        res.status(500).json({ "msg": err })
    });
}

const getAllSubmittedQuiz = async (req, res) => {
    await AttemptQuiz.find().then((result) => {
        res.status(200).json({ "result": result })
    }).catch((err) => {
        res.status(500).json({ "msg": err })
    });        
}

export {
    createQuizQuestion, DeleteQuizQuestion,getQuiz,submitCompleteQuiz,getAllSubmittedQuiz,getQuizByCategories
}