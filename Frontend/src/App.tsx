import { BrowserRouter,Routes, Route } from "react-router"
import HeroSection from "./Pages/Main/HeroSection.tsx"
import HeroSectionInfo from "./Pages/Main/HeroSectionInfo.tsx"
import Navbar from "./Components/Navbar"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <HeroSectionInfo/>
          </>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
