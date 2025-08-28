import { BrowserRouter,Routes, Route } from "react-router"
import Navbar from "./Components/Navbar"
import MainPage from "./Pages/Main/MainPage"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
