
import axios from "axios"
import { useState,useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { Player } from 'video-react';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import Clip from "./clip";


const Movie = () =>{
    const [data,setData] = useState(null)

    const [value, setValue] = useState(1);

    const params = useParams();
    const userInfo = useSelector(state => state.userReducer?.user);

    useEffect(()=>{
      axios.get(process.env.REACT_APP_SERVER+ `api/movie/${params.id}`)
      .then((res) =>
        setData(res.data)
      )
    },[params.id,data?.movie.link])


  
    return(
        <Box className="pt-12" sx={{paddingBottom:30}}>
          {data?.movie.link !== null ?(
            <>
            <Typography className="text-slate-50  font-mono" variant="h5" align="center">{data?.movie.name}<small>({data?.movie.year})</small></Typography>
            <Typography className="text-slate-50  font-mono" variant="h5" align="center"><small>Thể loại :{data?.cate}</small></Typography>
           
           {userInfo === null ?(
            <Box className="mt-3 mb-6">
            <Typography align="center" className=" bg-neutral-700 p-2 rounded-full ">
            <Rating
                value={1}
                readOnly 
              />
            </Typography>
           <Typography className="text-red-600  font-mono" variant="h6" align="center">(Đăng nhập để đánh giá)</Typography>
          </Box>
           ):(
            <Typography align="center" className="my-3 bg-neutral-700 p-2 rounded-full ">
            <Rating
                value={value}
                 onChange={(event, newValue) => {
                  setValue(newValue);
                }}

              />
            </Typography>
           )}
            
           <Clip movie={data?.movie.link}></Clip>
          </>
          ):null}


        </Box>
    )
}
export default Movie