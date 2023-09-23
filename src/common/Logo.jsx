import smallLogo from '../assets/smalllogo.png';
import logo from '../assets/logo.png';
import bigLogo from '../assets/biglogo.png';

import './Logo.css';

function Logo(props) {
  const { alt, size } = props;
  let img;

  switch (size) {
    case 'small':
      img = smallLogo;
      break;
    case 'big':
      img = bigLogo;
      break;
    default:
      img = logo;
  }

  return <img className='logo' src={img} alt={alt} />;
}

export default Logo;
