import { BrowserRouter,Routes, Route } from "react-router"
import HeroSection from "./Pages/Main/HeroSection.tsx"
import HeroSectionInfo from "./Pages/Main/BusinessInfo.tsx"
import Navbar from "./Components/Navbar.tsx"
// import LogoNav from "./Components/LogoNav.tsx"
// import FloatingLogo from "./Components/FloatingLogo.tsx"
function App() {
  return (
    <BrowserRouter>
      {/* Main Navigation Bar */}
      <Navbar />
      
      {/* <FloatingLogo/> */}
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
