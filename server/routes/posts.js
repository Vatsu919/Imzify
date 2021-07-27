import express from 'express';
import {commentPost, createPost, getPosts, likePost} from '../controllers/posts.js';
import multer from 'multer';
import path from 'path';
import auth from '../middleware/auth.js';

const __dirname = path.resolve(path.dirname('')); 
//const upload = multer({dest: __dirname + '/uploads/images'});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/uploads/images`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({storage:storage})

const router = express.Router();

router.get('/',getPosts);
router.post('/',[auth,upload.single('image')],createPost);
router.patch('/:id/likepost',auth,likePost);
router.post('/:id/comment',auth,commentPost);

export default router;