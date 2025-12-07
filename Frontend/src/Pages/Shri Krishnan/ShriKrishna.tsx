
import ReusableLanding from '../../components/LandingReusable'; // Adjust the path as needed
import { skaeData } from '../../components/Shri Krishnan/data'; // Import the data object
// Example usage component
const Venbro = () => {
  const handleButtonClick = (type: string, text: string) => {
    console.log(`Button clicked: ${type} - ${text}`);
  };

  return (
    <>
    <title>Ceedee's | Shri Krishna Automobile Enterprises</title>
    <ReusableLanding 
      data={skaeData} 
      onButtonClick={handleButtonClick}
    />
    </>
  );
};

export default Venbro;