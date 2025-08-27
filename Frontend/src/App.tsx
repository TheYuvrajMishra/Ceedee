import { BrowserRouter,Routes, Route } from "react-router"
import HeroSection from "./Pages/Main/HeroSection"
import Navbar from "./Components/Navbar"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroSection/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
