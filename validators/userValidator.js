// const Joi = require('joi');


// const oauthSchema = Joi.object({
//   google: Joi.object({
//     provider_id: Joi.string().required(),
//     linked: Joi.boolean().default(false)
//   }).required()
// });


// const profileSchema = Joi.object({
//   name: Joi.string().required(),
// });


// const userSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password_hash: Joi.string().optional(), 
//   oauth: oauthSchema.required(),
//   profile: profileSchema.required(),
//   created_at: Joi.date().iso().default(() => new Date(), 'current date'),
//   updated_at: Joi.date().iso().default(() => new Date(), 'current date')
// });

// module.exports = userSchema;
