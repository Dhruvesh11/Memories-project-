import React,{useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'
import {Link,useNavigate,useLocation } from 'react-router-dom';
import { Container,AppBar,Typography,Grid,Grow, Toolbar, Avatar, Button } from "@mui/material";
import memories from '../../images/memories.png'
import { decode } from "punycode";
const Navbar =()=>{
    const history=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const Logout=()=>{
         dispatch({type:'LOGOUT'});
         history.push('/');
         setUser(null);
    }
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const x=()=>{
    React.useEffect=(()=>{
        const token=user?.token;
        if(token){
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime())logout();
                }
        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location])
}
    return(
    <AppBar sx={{ borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',}} position="static" color="inherit">
            <div>
            <Typography component={Link} sx={{color: 'rgba(0,183,255, 1)',}} variant="h2" align="center">Memories</Typography>
            </div>
            
             <img sx={{ marginLeft: '15px',}} src={memories} alt="memories" height="60"/>
             <Toolbar>
             {
                user?(
                    <div>
                        <Avatar alt={user.result.name} src={user.result.name.imageUrl}>{user.result.name.charAT(0)}</Avatar>
                        <Typography variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={Logout}>Logout</Button>
                    </div>
                ):(
                       <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )
             }
             </Toolbar>
          </AppBar>
    );
}
export default Navbar;