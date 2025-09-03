
import TwoCompany from '../../Components/Main/TwoCompany'
import HeroSection from '../../Components/Main/HeroSection'
import ServicesSection from '../../Components/Main/Services'

function MainPage() {
  return (
    <div>
      {/* <div className='h-[1px] mt-2 bg-black w-full mx-auto rounded-full'></div>
      <h1 className='m-5 text-5xl font-extrabold'>Venbro Polymers</h1> */}
      <HeroSection/>
      <ServicesSection/>
      <TwoCompany/>
    </div>
  )
}

export default MainPage
