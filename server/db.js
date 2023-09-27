const mongoose = require("mongoose");
module.exports = () => {
    const MONGODB_URI = 'mongodb+srv://root:root@cluster0.wofh74a.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology:true })

    mongoose.connection.on('connected',()=>{
        console.log('Database connected Successfully')
    })

    mongoose.connection.on('disconnected',()=>{
        console.log('Database Disconnected')
    })

    mongoose.connection.on('error',(error)=>{
        console.log('Error while connecting to database',error.message)
    }) 
}



