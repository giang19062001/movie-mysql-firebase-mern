import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const HomeList = () =>{
    const [data,setData] = useState([])
    const [cate,setCate] = useState([])
    const [cateChose,setCateChose] = useState(null)


    useEffect(()=>{
      axios.get(process.env.REACT_APP_SERVER+ "api/movie")
      .then((res) =>
        setData(res.data)
      )
      axios.get(process.env.REACT_APP_SERVER+ "api/cate")
      .then((res) =>
      setCate(res.data)
      )
    },[])

  const handleSearch = async () =>{
   await axios.get(process.env.REACT_APP_SERVER+ "api/movie/search/" + cateChose)
    .then((res) =>
      setData(res.data)
    )

  }

    return(
        <Box className="bg-neutral-900 "  sx={{paddingBottom:50}}>
              
         <Container className=" pt-6 pb-2 " maxWidth="sm" >
          <Stack direction="row"   
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <Typography className="font-bold text-slate-50 ">Category:  </Typography>
              <FormControl fullWidth   >
                    <Select
                      fullWidth
                      placeholder="Category"
                      className="bg-slate-50 "
                      onChange={(e) => setCateChose(e.target.value)}
                     >
                      {cate.map((c,index)=>(
                         <MenuItem value={c?.id} key={index}>{c?.name}</MenuItem>
                      ))}
                    </Select>
            </FormControl>
            <Button className="bg-red-700 hover:bg-red-800 text-slate-50" onClick={handleSearch}>Find movie</Button>
          </Stack>
        </Container>
     
            <Typography className="font-bold text-slate-50  text-xl py-6 pl-6">Danh sách Moive in NETFILG</Typography>

        <Grid container className="pl-6 pr-6" spacing={2}>
            {data?.map((movie,index)=>(
            <Grid item key={index} md={2} sm={4}>
                <Link to={`/movie/${movie.id}`}>
                <img src={process.env.REACT_APP_SERVER + movie.photo} className="w-24 h-28 sm:w-60 sm:h-60" alt="" />

                </Link>
            </Grid>
            ))}

        </Grid>
        </Box>
    )
}
export default HomeList