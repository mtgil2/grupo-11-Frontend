import './App.css'
import StockImage from './common/StockImage';
import Navbar from './common/Navbar';
import CardSession from './session/CardSession';

function App() {

  return (
    <>
      <Navbar/>
      <CardSession form='login'/>
      <div className='landing-img'>
        <StockImage/>
      </div>
      <p className='phrase'>
        Legit Business - Tu mejor opción para comprar y vender acciones 
        está aquí.
        </p>
      
    </>
  )
}

export default App
