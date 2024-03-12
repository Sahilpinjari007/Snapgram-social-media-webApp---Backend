import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './DB/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';;


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.get('/', (req, res) =>{
    res.send('hello it is snapgram server!..');
})


// import routes
import userRouter from './routes/user.routes.js'
import mediaRouter from './routes/media.routes.js'
import commentRouter from './routes/comment.routes.js'


// declear routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/media/comment', commentRouter);


connectDB()
.then(()=>{

    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT}!..`);
    })

}).catch(error => {
    console.log('mongoDB connection faild!..', error);
})