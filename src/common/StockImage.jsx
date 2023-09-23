import './StockImage.css'
import stocks from '../assets/stocks.jpeg'

function StockImage(){
  return(
    <img id='stocks' src={stocks} alt="" />
  )
}

export default StockImage