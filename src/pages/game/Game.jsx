import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { decode } from 'html-entities';
import { Wheel } from 'react-custom-roulette';
import { Loader } from '../../components/loader/Loader.jsx';
import Modal from '@mui/material/Modal';
import { ExitArrow } from '../../components/exitArrow/ExitArrow.jsx';
import { useSessionStorage } from '../../hooks/sessionStorage.jsx';

const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '30px'
};

const modalStyle = {
    transition:0
}
export const Game = () => {
    const rouletteData = [
        {
        option: '🎹',
        category: 12,
        categoryTitle: 'Music'
        },
        {
        option: '⚽',
        category: 21,
        categoryTitle: 'Sports'
        },
        {
        option: '🔢', 
        category: 19,
        categoryTitle: 'Maths'
        },
        
        {
        option: '🎬',
        category: 11,
        categoryTitle: 'Films'
        },
        {
        option: '🧪',
        category: 17,
        categoryTitle: 'Science'
        },
        {
        option: '🌎',
        category: 22,
        categoryTitle: 'Geography'
        },
        {
            option: '👑',
            wildcard: true,
        }
    ]
    
    //PLAYERS STATES
    const [player, setPlayer] = useState(1)
    const [playerOneCounter, setPlayerOneCounter] = useSessionStorage('playerOneCounter', 0)
    const [playerTwoCounter, setPlayerTwoCounter] = useSessionStorage('playerTwoCounter', 0)
    
    //MODAL STATES
    const [open, setOpen] = useState(false);
    const [openWildcard, setOpenWildcard] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        startTimer()
    }
    const handleOpenWildcard = () => setOpenWildcard(true);
    const handleClose = () => {
        setOpen(false)
        setAnswerColor(false)
        setTimeOut(false)
    }
    const handleCloseWildcard = () => setOpenWildcard(false);
    
    //ROULETTE STATES
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    
    //DATA STATES
    const [loading, setLoading] = useState(false)
    const [triviaData, setTriviaData] = useState([])
    
    //RESULTS STATES
    const [answerColor, setAnswerColor] = useState(false)
    const [possibleAnswers, setPossibleAnswer] = useState([])
    const [buttonValue, setButtonValue] = useState('')

    //TIMER STATES
    const [counter, setCounter] = useState(30)
    const [timeOut, setTimeOut] = useState(false)

    //FUNCTIONS
    const apiFunction = (apiUrl) => {
        fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok")
            }
            return response.json();
        })
        .then((data) => {
            setTriviaData(data.results[0]);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error)
        });
        setLoading(true)
    }
    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };
    
    const chooseCategory = (category) => {
        const apiUrl = `https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`;
        apiFunction(apiUrl)
        handleCloseWildcard()
    }

    
    const verifyAnswer = (answer) => {
        setButtonValue(answer)
        if (answer === triviaData.correct_answer) {
            if (player === 1) {
                setPlayerOneCounter(playerOneCounter+1)
            } else {
                setPlayerTwoCounter(playerTwoCounter+1)
            }
        } else {
            if (player === 1) {
                setPlayer(2)
            } else {
                setPlayer(1)
            }
        }
        setAnswerColor(true)
    }

    const playAgain = () => {
        handleClose()
        setPlayerOneCounter(0)
        setPlayerTwoCounter(0)
    }
    
    //USE EFFECTS
    useEffect(() => {
        if (triviaData.length !== 0 ) {
            const options = triviaData.incorrect_answers
            options.push(triviaData.correct_answer)
            options.sort(() => Math.random() - 0.5)
            setPossibleAnswer(options)
            setLoading(false)
            handleOpen()
        }
    }, [triviaData])

    const startTimer = () => {
        setTimeout(() => {
            setCounter(counter - 1)
        }, 1000);
    }   
    useEffect(() => {
        if(counter===0) {
            setTimeOut(true)
            setAnswerColor(true)
            setCounter(30)
            if (player === 1) {
                setPlayer(2)
            } else {
                setPlayer(1)
            }
        } else if(counter===30 || counter === 0 || timeOut || answerColor || !open){
            setCounter(30)
        } else {
            startTimer()
        }
    },[counter])

    useEffect(() => {
        setCounter(30)
    }, [buttonValue])
    return (
        <>
            <ExitArrow/>
            <div>
            <div className='game'>

            <div className='counterContainer'>
            <span>TURN: P{player}</span>
            <div>
                <span>(P1) {playerOneCounter}</span>
                <span> - </span>
                <span>{playerTwoCounter} (P2)</span>
            </div>
            </div>
            <div align="center" className="roulette-container">
            <Wheel
                mustStartSpinning={mustSpin}
                spinDuration={[0.4]}
                prizeNumber={prizeNumber}
                data={rouletteData}
                outerBorderColor={["black"]}
                radiusLineColor={["black"]}
                radiusLineWidth={[1]}
                textColors={[""]}
                fontSize={[30]}
                backgroundColors={[
                    "lightsalmon",
                    "lightcoral",
                    "lightblue",
                    "lightgray",
                    "lightgreen",
                    "wheat",
                    "lightpink",
                ]}
                onStopSpinning={() => {
                    if (!rouletteData[prizeNumber].wildcard) {
                        const apiUrl = `https://opentdb.com/api.php?amount=1&category=${rouletteData[prizeNumber].category}&type=multiple`;
                        apiFunction(apiUrl)
                    } else {
                        handleOpenWildcard()
                    }
                    setMustSpin(false);
                }}
                />
                {
                    mustSpin ?
                    <button className="nonClickableButton roulette-button">
                    SPIN!
                    </button>
                :
                <button className="roulette-button button" onClick={handleSpinClick}>
                    SPIN!
                    </button>
                }
            <Modal
                    className='modal'
                    sx={modalStyle}
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box className='boxModal' sx={style}>
                    {
                playerOneCounter === 7 || playerTwoCounter === 7 ?
                <div className='congratsContainer'>
                    <span>Congratulations! Player {player} is the winner</span> 
                    <button className='playAgainButton' onClick={playAgain}>PLAY AGAIN</button>
                </div>
                :

                    <div className='questionContainer'>
                    <h3>{triviaData.category}</h3>
                    <span>{decode(triviaData.question)}</span>
                    {
                        answerColor || timeOut ?
                        <></> : <span>Time left: {counter}</span>
                    }
                    <div>
                    {
                        possibleAnswers.map((answer) =>
                        <div>
                                {
                                    !answerColor ?
                                    <button className='answerButton' onClick={() => verifyAnswer(answer)}>
                                        {decode(answer)}
                                    </button>
                                    : 
                                    <button value={answer} className={triviaData.correct_answer === answer ? 'nonClickableButton correctAnswer answerButton' : 'nonClickableButton answerButton'} id={triviaData.correct_answer !== answer && buttonValue === answer ? 'incorrectAnswer' : ''}>
                                        {decode(answer)}
                                    </button>
                                }
                            </div>
                        )
                    }
                    </div>
                    {
                        !timeOut && answerColor ?
                        <div className='spinAgainButtonContainer'>
                            {
                                buttonValue === triviaData.correct_answer ?
                                <span className='correctMessage'>Correct! Continue spinning</span>
                                : <span className='incorrectMessage'>Incorrect! Turn of player {player}</span>
                            }
                            <button className='spinAgainButton answerButton' onClick={handleClose}>Spin again!</button>
                        </div>
                        : 
                        <div>
                            {
                                timeOut ?
                                <div className='spinAgainButtonContainer'>
                                    <span className='incorrectMessage'>Time out! Turn of player {player}</span>
                                    <button className='spinAgainButton answerButton' onClick={handleClose}>Spin again!</button>
                                </div>
                                : <span></span>
                            }
                        </div>
                    }
                    </div>
        }
                    </Box>
                </Modal>
                <Modal
                    className='modal'
                    open={openWildcard}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box className='boxModal' sx={style}>
                        {rouletteData.map(item => 
                            <ul>
                                {
                                    <span className='category' value={item.category} onClick={() => chooseCategory(item.category)}>{item.categoryTitle}</span>
                                }
                            </ul>
                        )}
                    </Box>
                </Modal>
            </div>
            </div>
            {
                loading ?
                <Loader/> 
                : <span></span>
            }
            </div>
    </>
    )
}
