import express from 'express';

import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js'
  const router=express.Router();
    router.get('/',getPosts);
    router.post('/addPost',auth,createPost);
    router.patch('/updatePost/:id',auth,updatePost);
    router.delete('/deletePost/:id',auth,deletePost);
    router.patch('/likePost/:id/likePost',auth,likePost);

    export default router;