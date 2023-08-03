import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'


function App() {
  const rouletteData = [
    {
      option: '🎹',
      category: 'music'
    },
    {
      option: '🔢',
      category: 'mathematics'
    },
    {
      option: '⚽',
      category: 'sportsleisure'
    },
    {
      option: '👑',
      category: 'wildcard'
    },
    {
      option: '🧪',
      category: 'science'
    },
    {
      option: '🎪',
      category: 'entertainment'
    },
    {
      option: '🌎',
      category: 'geography'
    }
  ]
  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.REACT_APP_API_KEY
    }
  }

  
  const [triviaData, setTriviaData] = useState([])
  
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  
  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  
  return (
    <div className="App">
        <div align="center" className="roulette-container">
        <Wheel
          mustStartSpinning={mustSpin}
          spinDuration={[0.2]}
          prizeNumber={prizeNumber}
          data={rouletteData}
          outerBorderColor={["#ccc"]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["tranparent"]}
          radiusLineWidth={[1]}
          textColors={["#f5f5f5"]}
          fontSize={[30]}
          backgroundColors={[
            "#3f297e",
            "green",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "grey"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            const apiUrl = `https://api.api-ninjas.com/v1/trivia?category=${rouletteData[prizeNumber].category}`;
              fetch(apiUrl, options)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setTriviaData(data);
              })
              .catch((error) => {
                console.error("Error al obtener los datos:", error);
              });
            }}
          />
          {
          mustSpin ?
            <button className="nonClickableButton roulette-button">
              SPIN!
            </button>
          :
            <button className="roulette-button" onClick={handleSpinClick}>
              SPIN!
            </button>
        }
      </div>
    </div>
  );
}

export default App;