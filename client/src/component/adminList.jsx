import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Typography } from '@mui/material';
import axios from "axios"
import { useState,useEffect } from "react"
import {Link} from "react-router-dom" 
import { useNavigate } from "react-router-dom";



const AdminList = () => {
    const [rows,setRows] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER+ "api/movie")
        .then((res) =>
        setRows(res.data)
        )
      },[])


  const handleDelete = async(id) =>{
    await axios.delete(process.env.REACT_APP_SERVER+ `api/movie/${id}`)
        setTimeout(() => {
            navigate(0)
        }, 1000);
  }
  return (
    <TableContainer component={Paper} sx={{paddingY:30}} className="bg-neutral-800 ">
        <Typography align='center' variant='h3' className='text-slate-50' >List Movie</Typography>

        <Link to="/admin/cate" >
        <Typography align='center' variant='h5' className='text-sky-500 my-3 underline' >Create category</Typography>
        </Link>
      <Table sx={{ minWidth: 650 }} className="mt-6">
        <TableHead>
          <TableRow>
            <TableCell align="center" className='text-slate-50'>Photo</TableCell>
            <TableCell align="center"  className='text-slate-50'>Name movie</TableCell>
            <TableCell align="center"  className='text-slate-50'>Year publisher</TableCell>
            <TableCell align="center"  className='text-slate-50'>Star</TableCell>
            <TableCell align="center"  className='text-slate-50'>Category id</TableCell>
            <TableCell align="center"  className='text-slate-50'>Link movie</TableCell>
            <TableCell align="center"></TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
            >
             <TableCell align="center">
                <Avatar variant='square' src={process.env.REACT_APP_SERVER + row.photo} className="w-60  h-60 mx-auto"></Avatar>
             </TableCell>
             <TableCell align="center"  className='text-slate-50'>{row.name}</TableCell>
              <TableCell align="center"  className='text-slate-50'>{row.year}</TableCell>
              <TableCell align="center"  className='text-slate-50'>5</TableCell>
              <TableCell align="center"  className='text-slate-50'>{row.CateId}</TableCell>
              <TableCell align="center" > 
                 <a href={row.link} className="text-sky-500">Http://firebase...</a>
                </TableCell>
              <TableCell align="center">
                  <Button className='bg-red-700 text-slate-50' onClick={() => handleDelete(row.id)}>DELETE</Button>
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AdminList