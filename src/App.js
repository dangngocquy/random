import './App.css';
import ExcelUploader from './components/Excel';
import Flower from './components/Flower';
// import Test from './components/Test';

function App() {
  
  return (
    <div className='container'>
      <Flower/>
      <ExcelUploader />
      {/* <Test/> */}
    </div>
  );
}

export default App;
