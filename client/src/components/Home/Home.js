import React,{useState,useEffect} from "react";
import { Container,Grid,Grow} from "@mui/material";
import { useDispatch } from "react-redux";
import {getPosts} from '../../actions/posts';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
const Home =()=>{
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    const x=()=>{
    useEffect(()=>{
      dispatch(getPosts());
    },[currentId,dispatch]);
  }
    const user=null;
    return(
        <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing="3">
                 <Grid item xs={12} sm={4}>
                  <Posts  setCurrentId={setCurrentId}/>
                 </Grid>
                 <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                 </Grid>
          </Grid>
        </Container>
      </Grow>
    );
}
export default Home;