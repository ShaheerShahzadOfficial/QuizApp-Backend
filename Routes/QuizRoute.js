import express from "express"
import { createQuizQuestion, DeleteQuizQuestion, getAllSubmittedQuiz, getQuiz, getQuizByCategories, submitCompleteQuiz } from "../Controllers/QuizController.js"
import { checkToken } from "../middleWare/auth.js"

const QuizRoute = express.Router()

QuizRoute.route("/AddQuiz").post(createQuizQuestion)
QuizRoute.route("/getQuiz").get(getQuiz)
QuizRoute.route("/deleteQuiz").delete(DeleteQuizQuestion)
QuizRoute.route("/submitCompleteQuiz").post(checkToken,submitCompleteQuiz)
QuizRoute.route("/AllAnswer").get(getAllSubmittedQuiz)
QuizRoute.route("/getQuizByCategories/:id").get(getQuizByCategories)

export default QuizRoute
