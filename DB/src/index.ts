require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const mongoose = require('mongoose');
const Route = require('./router/index.ts');
const errorMiddleware = require('./middlewares/error-middlelware')


const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus:200
}));
app.use('/api', Route);
app.use(errorMiddleware)


const Server = async () => {
    try {
       await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then((): void => console.log(colors.yellow('MongoDB connected!')))
        app.listen(PORT, (): void => console.log(colors.green(`Server started on port: ${PORT}`)))
    } catch (e) {
        console.log("Connection closed by server", "\n", e)
    }
}
Server()



