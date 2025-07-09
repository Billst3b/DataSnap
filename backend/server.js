const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection',(err)=>{
    console.log('UNHANDLED REJECTION! Shutting down the server...');
    console.log(err.name, err.message);
    server.close(() =>{
        process.exit(1); 
    });
});

process.on('SIGTERM',()=>{
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
})