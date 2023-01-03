import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState(initialState);
  const [isSignup, setisSignup] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const handleShowPassword = () =>
    setshowPassword((preShowPassword) => !preShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

    const switchMode = () => setisSignup((preisSignup) => !preisSignup);
    
     const googleFailure=()=>{
          console.log('Google Sign In was unsuccessful.Try Again Later');
     }
     const googleSuccess=async(res)=>{
      const result= res?.profileObj;
      const token=res?.tokenId;
      try{
        dispatch({type:'AUTH',data:{result,token}});
        history('/')
      }catch(error){
        console.log(error);
      }
     }

  return (
    <Container components="main" maxWidth="xs">
      <Paper elevation={3}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Sign Up" : "Sign In"}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
               {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="755318207688-rnbspve8bkhntgtpgh2lr8vo85e86ri8.apps.googleusercontent.com"
              render={(renderProps) => {
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                 Google Sign In
                </Button>
              }}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
         
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Auth;
