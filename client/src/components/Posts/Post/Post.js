import React from "react";
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from "react-redux";
import moment from 'react-moment';
import { deletePost ,likePost} from "../../../actions/posts";
 const Post=({post,setCurrentId})=>{
    const user=JSON.parse(localStorage.getItem('profile'));
    const likes=()=>{
        if(post.likes.length>0){
            return post.likes.find((like)=>like===(user?.result?.googleId||user?.result?._id))?(
                <>
                <ThumbUpAltIcon fontsize="small" />&nbsp;{post.likes.length>2}?`You and $`{post.likes.length}
                </>
            ):(
                <>
                <ThumbUpAltIcon fontsize="small" />
                </>
            );
        }
    }
    const dispatch=useDispatch();
    return(
       <Card>
        <CardMedia component='img' image={post.selectedFile} title={post.title}/>
        <div>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant ="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId===post?.creator||user?.result?._id===post?.creator)&&(
        <div>
            <Button style={{color:"white"}} size="small" onClick={()=>{
                
            }}>
                <MoreHorizIcon  fontsize="default"/>
            </Button>
        </div>
        )}
        <div>
            <Typography variant="body2" color="textSecondary">{post.tags.maps((tag)=>`#${tag}`)}</Typography>
        </div>
       <CardContent>
        <Typography variabe="h5" gutterButton>{post.message}</Typography>
       </CardContent>
       <CardActions>
       <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))} >
        <ThumbUpAltIcon fontsize="small"/>
        <Likes/>
        Like
        {post.likeCount}
        </Button>
        {(user?.result?.googleId===post?.creator||user?.result?._id===post?.creator)&&(
            <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))} >
           
            <DeleteIcon fontsize="small"/>
            Delete
            </Button>
        )}
        
       </CardActions>
       </Card>
    );

 }
 export default Post;