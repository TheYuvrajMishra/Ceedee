
import HeroSection from '../../Components/Main/HeroSection'
import Carousal from '../../Components/Main/Carousal'

function MainPage() {
  return (
    <div>
      <HeroSection/>
      {/* <div className='h-[1px] mt-2 bg-black w-full mx-auto rounded-full'></div>
      <h1 className='m-5 text-5xl font-extrabold'>Venbro Polymers</h1> */}
      <Carousal/>
    </div>
  )
}

export default MainPage
