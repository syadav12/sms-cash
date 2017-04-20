let teacher = require('./teacher.model')()
let feedback = require('../feedback/feedback.model')()
let sql= require('../../sqldb')
let db=sql()

let teacherFunctions={
  getTeacherAndFeedback: (req, res) => {
    if(req !== null && req != undefined && req.body != undefined && Object.keys(req).length!==0 && Object.keys(req.body).length!==0 || req.user != null){
      teacher.getTeacherAndFeedback(db, req.body)
      .then((result)=>{
          if(result.length == 0){
            res.status(200).json({message: 'NO_ROWS_FOUND'})
          }
          else{
            let data= [];
            result.map((item, indexItem)=>{
              let score = 0
              let totalRatings = 0
              let type = ""
              totalRatings = item.feedbacks.length
              for(let index=0 ;index<item.feedbacks.length; index ++){
                score = item.feedbacks[index].rating.score + score
              }
              score = (score/totalRatings)
              type = getRatingAsPerAverageMarks(score)
              let final = {
                finalScore: score,
                subject_id: item.feedbacks[indexItem].subject_id,
                type: type,
                subjectName: item.feedbacks[indexItem].subject.name
              }
              item.dataValues.averageFeedback = final
              data.push(item)
            })
            res.status(200).json({data, message: 'SUCCESS_OPERATION'})
          }
        })
      .catch((err)=>{
        res.status(500).json({error: err.toString(), message: 'IS_INTERNAL_SERVER_ERROR'})
      })
		}
		else{
			res.status(400).json({error: "Missing Paramters: courseId", message: 'IS_INVALID_INPUT_FORM'})
		}
  }
}

function getRatingAsPerAverageMarks(score){
  switch (true) {
    case (0<score && score<=20):
      return "BAD"
    case (20<score && score<=40):
      return "AVERAGE"
    case (40<score && score<=60):
      return "GOOD"
    case (60<score && score<=80):
      return "VERY GOOD"
    case (60<score && score<=80):
      return "VERY GOOD"
    case (80<score && score<=100):
      return "EXCELLENT"
    default:
      return "INVALID SCORE"
  }
}

module.exports = teacherFunctions