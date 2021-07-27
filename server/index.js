import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import postModel from "./models/postModel.js";
import User from "./models/userModel.js";

import Comment from "./models/commentModel.js";


const app = express();

app.use(express.static('uploads'));
app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/auth',authRoutes);
/*app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});*/



const CONNECTION_URL = 'mongodb+srv://Vatshal:DIVIJ0807@cluster0.antej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,() => {console.log(`Server running on port: ${PORT}`); }))
    .catch((err) => console.log(err.message));

const clearDb = () => {    
    
    postModel.deleteMany({},()=> {
        console.log("Deleted");
    });
    Comment.deleteMany({},()=>{
        console.log("Comments deleted");
    })
   /* User.deleteMany({},() => {
        console.log("Deleted all users");
    });*/

}
mongoose.set('useFindAndModify',false);