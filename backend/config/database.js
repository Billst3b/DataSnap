const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
     await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;//tZyDczhcDLwZEDZY
//mongodb+srv://adaylraseni:tZyDczhcDLwZEDZY@cluster0.hrzgtit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0