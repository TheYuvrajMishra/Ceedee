
import ReusableLanding from '../../Components/LandingReusable'; // Adjust the path as needed
import { skaeData } from '../../Components/Shri Krishnan/data'; // Import the data object
// Example usage component
const Venbro = () => {
  const handleButtonClick = (type: string, text: string) => {
    console.log(`Button clicked: ${type} - ${text}`);
  };

  return (
    <ReusableLanding 
      data={skaeData} 
      onButtonClick={handleButtonClick}
    />
  );
};

export default Venbro;