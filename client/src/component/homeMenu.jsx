import {  Avatar, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material"
import * as React from 'react';
import '../css/homeMenu.scss'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { signInWithPopup,FacebookAuthProvider ,GoogleAuthProvider} from "firebase/auth";
import { authentication } from "../firebase";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { logIn,logOut } from "../redux/user/userReducer";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const HomeMenu = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer?.user);

    const [user, setUser] = React.useState({
        email:"",
        password:""
    });

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (e) =>{
        setUser((preState)=>({
            ...preState,[e.target.name]:e.target.value
        }))

    }
    const handleLogin = () =>{
        console.log(user)

      if(user?.email === "admin" && user?.password === "123"){
        
        navigate("/admin")
      }
      else{
        window.alert("đăng nhập trang admin thất bại")
      }

    }

    const signInFacebook =  () =>{

      const provider = new FacebookAuthProvider();
      signInWithPopup(authentication,provider)
       .then((res)=>{
        console.log(res)
        dispatch(logIn(res.user))
       })
       .catch((err)=>{
        console.log(err.message)
       })
    }
    const signInGoogle =  () =>{

      const provider = new GoogleAuthProvider();
      signInWithPopup(authentication,provider)
       .then((res)=>{
        console.log(res)
        dispatch(logIn(res.user))
       })
       .catch((err)=>{
        console.log(err.message)
       })
    }

    
    const handleLogout = () =>{
      dispatch(logOut())
    }
    return(
        
    <Box>
        <Stack className="absolute z-10" direction="row"
         justifyContent="space-between"
         alignItems="center"
         >
        <Typography className="ml-3 skew-x-6 uppercase text-red-700 brightness-125 drop-shadow-2xl" id="name" >Netflig</Typography>
       {userInfo === null?(
        <Button className="text-slate-50 bg-red-700 " id="sign" onClick={handleClickOpen} >Sign in</Button>
       ):(
        <Stack>
        <Button className="text-slate-50 bg-red-700 flex flex-col" id="sign"  onClick={handleLogout}>
          <small>{userInfo?.displayName}</small>
        ( logout )</Button>
        </Stack>
      )}
        
        </Stack>
        <Box  className="absolute z-10" id="box">
            <Typography align="center" className="text-slate-50 " id="title">Unlimited movies, TV shows, and more.Watch anywhere. Cancel anytime.Ready to watch? Enter your email to create or restart your membership.</Typography>
        </Box>
        <Box>
        <img alt="" className="brightness-50"  src={require("../assets/cover.jpg")} />
        </Box>


        <Dialog
        open={open}
        onClose={handleClose}

      >
        <DialogTitle sx={{color:"white",backgroundColor:"#b91c1c",marginBottom:3}}>
          {"NETFILG"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText  >
            <Stack spacing={2}>
                <TextField placeholder="Email" name="email" variant="filled" type="text" onChange={handleChange}></TextField>
                <TextField placeholder="Password" name="password" variant="filled" type="password" onChange={handleChange}></TextField>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions  >
          <Stack direction="column" justifyContent="center" sx={{margin:"auto"}} spacing={2}>
            <Button sx={{color:"red"}} onClick={handleLogin} variant="outlined">Login</Button>
            <Divider/>
            <Button onClick={signInFacebook}>
              <FacebookIcon></FacebookIcon>&ensp;
              Login by Facebook</Button>
              <Divider/>
              <Button onClick={signInGoogle}>
              <GoogleIcon></GoogleIcon>&ensp;
              Login by Google</Button>
          </Stack>
        </DialogActions>
      </Dialog>
     </Box>
     
    )
}
export default HomeMenu