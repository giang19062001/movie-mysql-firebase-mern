import { useState, useEffect } from "react";
import { Stack, Button, TextField, Typography, Container } from "@mui/material"
import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";

const AddMovie = () => {

  const [movie,setMovie] = useState({
    name:"",
    year:0,
    link:null,
    photo:null,
    CateId:""
})
 const [processing,setProcessing] = useState(false)
 const [cate,setCate] = useState([])
const navigate = useNavigate()


  const handleChange = (event) =>{
    setMovie((preState) => ({
          ...preState,
          [event.target.name]: event.target.value,
        }));
  }
    const uploadVideo = async (videoValue) => {

      setMovie((preState) => ({
        ...preState,
        link:undefined
      }));

       const imageRef = ref(storage, `videos/${videoValue.name + v4()}`);
       await uploadBytes(imageRef, videoValue).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((video) => {
            setMovie((preState) => ({
              ...preState,
              link: video
            }));
          });
        });
      };

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER+ "api/cate")
        .then((res) =>
        setCate(res.data)
        )
    },[])
    useEffect(()=>{
       if(movie.link === undefined){
        setProcessing(true)
       }else{
        setProcessing(false)
       }
    },[movie.link])

    const handleAdd = () =>{
      console.log(movie)
      try {
        axios.post(process.env.REACT_APP_SERVER+ "api/movie",movie,{headers: {
          "Content-Type": "multipart/form-data"}
      })
      navigate(0)
      } catch (error) {
        window.alert(error)
      }

    }

    return(
      <>
      <img alt="" className="brightness-50 absolute "  src={require("../assets/cover.jpg")} />
      <Container sx={{paddingY:10}}>
      <Stack spacing={3} >
      <Typography align="center" variant="h4" className="text-slate-50 z-40 font-semibold">ADD MOVIE NEW</Typography>
        <TextField type="text"  placeholder="name"  name="name" className="bg-slate-50" onChange={handleChange}/>
        <TextField   type="text"  placeholder="year" name="year" className="bg-slate-50" onChange={handleChange}/>
        <label for="photo"  className="text-slate-50 z-40 uppercase font-bold">upload photo</label>
        <TextField  type="file" name="photo" className="bg-slate-50"
        onChange={(event) => {
          setMovie((preState) => ({
            ...preState,
            photo: event.target.files[0]
          }));
        }}/>
        <label for="link"  className="text-slate-50 z-40 uppercase font-bold">upload video</label>
        <TextField
          type="file"
          id="link"
          name="link"
          className="bg-slate-50"
          onChange={(event) => {
            uploadVideo(event.target.files[0])
          }}
        />
                <label for="CateId"  className="text-slate-50 z-40 uppercase font-bold">Category</label>

             <FormControl fullWidth   >
                    <Select
                      fullWidth
                      className="bg-slate-50 "
                      name="CateId"
                      onChange={handleChange}
                     >
                      {cate.map((c,index)=>(
                         <MenuItem value={c?.id} key={index}>{c?.name}</MenuItem>
                      ))}
                    </Select>
            </FormControl>
        
          <Button  className="bg-sky-500 hover:bg-sky-700 text-slate-50" onClick={handleAdd}> ADD MOVIE</Button>
      </Stack>
      {processing === true ?(
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      ):null}

      </Container>
      </>
    )
}
export default AddMovie