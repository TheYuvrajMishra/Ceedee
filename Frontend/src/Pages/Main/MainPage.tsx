
import TwoCompany from '../../Components/Main/TwoCompany'
import HeroSection from '../../Components/Main/HeroSection'
import PartnerSection from '../../Components/Main/PartnerSection'
import ServicesSection from '../../Components/Main/Services'
import CompInfo from '../../Components/Main/CompInfo'
import VentureText from '../../Components/Main/VentureText'

function MainPage() {
  return (
    <div>
      {/* <div className='h-[1px] mt-2 bg-black w-full mx-auto rounded-full'></div>
      <h1 className='m-5 text-5xl font-extrabold'>Venbro Polymers</h1> */}
      <HeroSection/>
      <CompInfo/>
      <PartnerSection/>
      <ServicesSection/>
      <VentureText/>
      <TwoCompany/>
    </div>
  )
}

export default MainPage
