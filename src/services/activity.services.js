const ResponseError = require('../utils')
const {activityRepository} = require('../repository')

const getAllActivity = async () => {
  const result = await activityRepository.getAllActivity()
  if(!result){
    throw err = new ResponseError(500, 'Internal Server Error')
  }
  return result
}

const createActivity = async(body) => {
  const {title} = body

  const result = await activityRepository.createActivity(title)
  if(!result){
    throw err = new ResponseError(500, 'Internal Server Error')
  }
  return result
}

module.exports = {getAllActivity, createActivity}
