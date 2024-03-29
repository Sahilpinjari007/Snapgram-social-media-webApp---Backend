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
import likeRouter from './routes/like.routes.js'
import followerRouter from './routes/follower.routes.js'
import savedRouter from './routes/saved.routes.js';
import shareRouter from './routes/shared.routes.js';
import notificationRouter from './routes/notification.routes.js'


// declear routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/media/comment', commentRouter);
app.use('/api/v1/like', likeRouter);
app.use('/api/v1/u/follow', followerRouter)
app.use('/api/v1/m/saved', savedRouter);
app.use('/api/v1/m/share', shareRouter)
app.use('/api/v1/notification', notificationRouter);


connectDB()
.then(()=>{

    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT}!..`);
    })

}).catch(error => {
    console.log('mongoDB connection faild!..', error);
})