import  Joi  from "joi";

const authValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export default authValidate