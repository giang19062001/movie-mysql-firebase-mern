import { Player } from 'video-react';

const Clip = ({movie}) =>{
    console.log(movie)
    return(
        <>
        {movie !== undefined?(
            <Player
            autoPlay
            >
              
            <source src={movie}/>
           </Player>
        ):null}
        </>
    )

}
export default Clip