import React from "react";
import Post from  './Post/Post';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
 const Posts=({setCurrentId})=>{
    const posts=useSelector((state)=>state.posts);
    console.log(posts);
    return(
      
        !posts.length?<CircularProgress/>:(
         <Grid>
                 {posts.map((post)=>(
                  <Grid item key={post._id} xs={12} sm={6}>
                     <Post post={post} setCurrentId= {setCurrentId}/>
                     </Grid>

                 ))}
         </Grid>
        )

    );

 }
 export default Posts;