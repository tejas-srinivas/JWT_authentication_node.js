const router = require("express").Router();
const { User,validate } = require("../model/user")
const bcrypt = require("bcrypt")

router.post("/", async (request,response) => {
    try {
       const { error } =  validate(request.body);
        if(error)
            return response.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({email: request.body.email})
        
        if(user)
            return response.status(409).send({ message: "User with given email already exists"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(request.body.password,salt)

        await new User({...request.body, password: hashPassword}).save();
        response.status(201).send({message: "User created successfully"})
    } 
    catch(error){
        response.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router;