import Head from 'next/head'
import React, { useState } from 'react';
import JickButton from '../components/JickButton'
import styles from '../styles/Home.module.css'


const rand = (multi) => {
  return parseInt(multi * Math.random(), 10);
}
const getRandomPosition = () => {
  // get width and height of the window
  let xMax = window.innerWidth - 150;
  let yMax = window.innerHeight - 50;

  return {
    x: rand(xMax), y: rand(yMax)
  }
}

export default function Home() {
  const [buttons, setButtons] = useState([{
    x: null, y: null, clicked: false, index: 0,
  }]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jick</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {buttons.map(button => 
            <JickButton 
              key={button.index}
              button={button}
              clickJickButton={(index) => {
                const position = getRandomPosition();
                const newButtons = [...buttons];
                newButtons[index].clicked = true;
                newButtons.push({
                  x: position.x,
                  y: position.y, 
                  clicked: false,
                  index: buttons.length,
                });
                setButtons(newButtons);
              }}
            />
          )}
        </main>
      </div>
    </div>
  )
}
