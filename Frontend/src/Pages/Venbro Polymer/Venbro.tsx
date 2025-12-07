
import ReusableLanding from '../../components/LandingReusable'; // Adjust the path as needed
import { venbroData } from '../../components/Venbro Polymer/data'; // Import the data object
// Example usage component
const Venbro = () => {
  const handleButtonClick = (type: string, text: string) => {
    console.log(`Button clicked: ${type} - ${text}`);
  };
  return (
    <>
    <title>Ceedee's | Venbro Polymer</title>
    <ReusableLanding 
      data={venbroData} 
      onButtonClick={handleButtonClick}
    />
    </>
  );
};

export default Venbro;