import './Btn.css';

function Btn(props) {
  const { text, onClickFunction, w, h, fs } = props;

  const buttonStyle = {
    width: w,
    height: h,
    fontSize: fs,
  };

  return (
    <button className='interface-button' onClick={onClickFunction} style={buttonStyle}>
      {text}
    </button>
  );
}

export default Btn;
