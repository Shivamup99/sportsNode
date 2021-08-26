const { body,validationResult } = require('express-validator')

const userValidation = ()=>{
    return [
        body("firstName").isString().isLength({min:3,max:30}),
        body("lastName").isString().isLength({min:3,max:30}),
        body("email").isEmail().isLength({min:11,max:56}),
        body("mobile").isMobilePhone().isLength({min:10,max:10}),
        body("password").isString().isLength({min:5,max:20})
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

module.exports = {userValidation,schemaValidation}