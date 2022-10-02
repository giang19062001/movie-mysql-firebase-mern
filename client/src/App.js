
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Movie from "./page/movie";
import HomePage from "./page/home";
import HomeAdminPage from "./page/homeAdmin";
import HomeCatePage from "./page/homeCate";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/movie/:id" element={<Movie></Movie>}></Route>
    <Route path="/admin" element={<HomeAdminPage></HomeAdminPage>}></Route>
    <Route path="/admin/cate" element={<HomeCatePage></HomeCatePage>}></Route>




    </Routes>
</BrowserRouter>
  );
}

export default App;
