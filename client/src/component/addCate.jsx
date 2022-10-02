import { useState, useEffect } from "react";
import { Stack, Button, TextField, Typography, Container } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AddCate = () => {

  const [cate,setCate] = useState({
    name:"",
   })
   const [data,setData] = useState()


const navigate = useNavigate()


  const handleChange = (event) =>{
    setCate((preState) => ({
          ...preState,
          [event.target.name]: event.target.value,
        }));
  }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER+ "api/cate")
        .then((res) =>
        setData(res.data)
        )
    },[])

    const handleAdd = async() =>{
      console.log(cate)
      try {
       await axios.post(process.env.REACT_APP_SERVER+ "api/cate",cate)
        setTimeout(() => {
            navigate(0)
        }, 1000);
      } catch (error) {
        window.alert(error)
      }

    }
    const handleDelete = async(id) =>{
        await axios.delete(process.env.REACT_APP_SERVER+ `api/cate/${id}`)
            setTimeout(() => {
                navigate(0)
            }, 1000);
      }
    return(
      <>
      <img alt="" className="brightness-50 absolute "  src={require("../assets/cover.jpg")} />
      <Container sx={{paddingY:30}}>
      <Stack spacing={3} >
      <Typography align="center" variant="h4" className="text-slate-50 z-40 font-semibold">ADD CATEGORY NEW</Typography>
        <TextField type="text"  placeholder="name"  name="name" className="bg-slate-50" onChange={handleChange}/>
      
          <Button  className="bg-sky-500 hover:bg-sky-700 text-slate-50" onClick={handleAdd}> ADD CATE</Button>
      </Stack>

      </Container>
          
      <TableContainer component={Paper} sx={{paddingY:30}} className="bg-neutral-800 ">
        <Typography align='center' variant='h3' className='text-slate-50' >List Cate</Typography>

    
      <Table sx={{ minWidth: 650 }} className="mt-6">
        <TableHead>
          <TableRow>
            <TableCell align="center"  className='text-slate-50'>ID CATE </TableCell>
            <TableCell align="center"  className='text-slate-50'>Name </TableCell>

            <TableCell align="center"></TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.name}
            >

             <TableCell align="center"  className='text-slate-50'>{row.id}</TableCell>
              <TableCell align="center"  className='text-slate-50'>{row.name}</TableCell>
              <TableCell align="center">
                  <Button className='bg-red-700 text-slate-50' onClick={() => handleDelete(row.id)}>DELETE</Button>
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>
    )
}
export default AddCate