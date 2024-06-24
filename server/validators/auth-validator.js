const {z} = require("zod");

const signupSchema = z.object({

    username: z
    .string({required_error:"username is required"})
    .min(3, "username must be at least 3 characters long")
    .trim()
    .max(255,{message:"username can't be greater than 255 characters"}),

    email: z
    .string({required_error:"email is required"})
    .email("Invalid email address")
    .min(3, "email must be at least 3 characters long")
    .max(255,{message:"email can't be greater than 255 characters"}),

    password: z
    .string({required_error:"password is required"})
    .min(8, "Password must be at least 8 characters long")
    .max(255,{message:"password can't be greater than 255 characters"}),

    phone: z
    .string({required_error:"phone is required"})
    .min(10, "phone number must be at least 10 characters long")
    .trim(),

});


module.exports = signupSchema;
