import {useRef} from 'react';
import styles from '../styles/JickButton.module.css'


export default function JickButton(props) {
  let btnRef = useRef();
  const {button} = props;
  const {index, clicked, x, y} = button;
  const className = clicked ? styles.jickClicked : styles.jick;
  const style = (x && y) ? {position: 'absolute', left: x, top: y} : null;
    
  return (
    <button
        type="button"
        className={className}
        onClick={e => {
            props.clickJickButton(index);
            if(btnRef.current){
                btnRef.current.setAttribute("disabled", "disabled");
            }
        }}
        style={style}
        ref={btnRef}
    >
       jick.
    </button>
  )
}
