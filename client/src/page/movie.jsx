import { Box } from "@mui/material"
import HomeMenu from "../component/homeMenu"
import Movie from "../component/movie"

const MoviePage = () =>{
    return(
        <Box className="bg-neutral-900">
        <HomeMenu></HomeMenu>
        <Movie></Movie>
        </Box>
    )
}
export default MoviePage