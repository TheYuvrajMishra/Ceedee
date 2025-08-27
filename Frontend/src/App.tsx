import { BrowserRouter,Routes, Route } from "react-router"
import HeroSection from "./Pages/Main/HeroSection"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
