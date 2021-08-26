const { body,validationResult } = require('express-validator')

const aboutValidation = ()=>{
    return [
        body("title").isString().isLength({min:4,max:60}),
        body("content").isString().isLength({min:30}),
        //  body("video").isURL()
    ]
}

const schemaValidation = (req,res,next)=>{
  let errors = validationResult(req)
  if(errors.isEmpty()){
    return next()
  }

  const schemaError = []

  errors.array().map((err)=>schemaError.push({[err.param]:err.msg}))
  res.status(422).json({
      errors:schemaError
  })
}

module.exports = {aboutValidation,schemaValidation}