import React,{useState,useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { createPost,updatePost} from "../../actions/posts";
import { useSelector } from "react-redux";

const Form = ({currentId,setCurrentId}) => {
  const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id ===currentId):null);
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));
  useEffect(()=>{
    if(post) setpostData(post);
  },[post])

  const [postData, setpostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  
  const handlesubmit = (e) => {
    try{  e.preventDefault();
      console.log(currentId)
      if(currentId===0){
      dispatch(createPost({...postData,name:user?.result?.name}));
      }
      else{
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
      }
      console.log(postData)
      clear();
      if(!user?.result?.name){
        return(
          <Paper>
            <Typography variant="h6" align="center" >
              Please Sign IN to create yout own memories and like other's memories
              </Typography>         
              </Paper>
        )
      }
    }
    catch(error){
      console.log(error)
    }
  
  };
  const clear=()=>{
    setCurrentId(null);
    setpostData({title:'',message:'',tags:'',selectedFile:''})
  }
  return (
    <Paper >
      <form 
        onSubmit={handlesubmit}
        sx={{
          margin:50,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
         <Typography variant="h6">{currentId?'Editing':'Creating'} a Memory</Typography>
        
        <TextField
          name="title"
          variant="outlined"
          label="Title "
          fullWidth
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags "
          fullWidth
          value={postData.tags}
          onChange={(e) => setpostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div sx={{ width: "97%", margin: "10px 0" }}>
          <FileBase64 sx={{width: '97%',
    margin: '10px 0',}}
            type="file"
            multiple={false}
            onDone={({base64}) =>
              (setpostData ( { ...postData, selectedFile: base64 }))
            }
          />
          </div>
        <Button
          sx={{ marginBottom: 10 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          sx={{ marginBottom: 10 }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
