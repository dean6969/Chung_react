import Leaflet from '../components/fact/Leaflet';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Chart from '../components/fact/Chart';

function Fact() {
  return (
    <div>
      <Navbar />
      <Leaflet />
      <Chart />
      <Footer />
    </div>
  );
}

export default Fact;
