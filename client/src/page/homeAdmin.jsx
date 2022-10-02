import { Box } from "@mui/material"
import AddMovie from "../component/addMovie"
import AdminList from "../component/adminList"


const HomeAdminPage = () =>{
    return(
        <Box >
        <AddMovie></AddMovie>
        <AdminList ></AdminList>
        </Box>
    )
}
export default HomeAdminPage