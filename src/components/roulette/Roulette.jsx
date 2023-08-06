import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { decode } from 'html-entities';
import Modal from '@mui/material/Modal';
import { Wheel } from 'react-custom-roulette'
import { Loader } from '../loader/Loader.jsx';

const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    color: 'white',
    fontSize: '30px'
};

const modalStyle = {
    transition:0
}

export const Roulette = () => {
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
        option: '👑',
        wildcard: true,
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
        }
    ]
    
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

    const [player, setPlayer] = useState(1)
    const [playerOneCounter, setPlayerOneCounter] = useState(0)
    const [playerTwoCounter, setPlayerTwoCounter] = useState(0)

    const [open, setOpen] = useState(false);
    const [openWildcard, setOpenWildcard] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpenWildcard = () => setOpenWildcard(true);
    const handleClose = () => {
        setOpen(false)
        setAnswerColor(false)
    }
    const handleCloseWildcard = () => setOpenWildcard(false);
    
    const [loading, setLoading] = useState(false)
    const [triviaData, setTriviaData] = useState([])

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const [possibleAnswers, setPossibleAnswer] = useState([])

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };
    
    const chooseCategory = (category) => {
        const apiUrl = `https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`;
        apiFunction(apiUrl)
    }

    const [answerColor, setAnswerColor] = useState(false)
    const [buttonValue, setButtonValue] = useState('')

    const verifyAnswer = (answer) => {
        console.log(answer);
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

    useEffect(() => {
        if (triviaData.length !== 0 ) {
            const options = triviaData.incorrect_answers
            options.push(triviaData.correct_answer)
            options.sort(() => Math.random() - 0.5)
            setPossibleAnswer(options)
            setLoading(false)
            handleCloseWildcard()
            handleOpen()
        }
    }, [triviaData])

    return (
        <div>

        <div className='counterContainer'>
        <span>Counter</span>
        <br />
        <span>{playerOneCounter}</span>
        <span> - </span>
        <span>{playerTwoCounter}</span>
        <br />
        <span>Turn: player {player}</span>
        </div>
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
            "#dc0936",
            "#f7a416",
            "#e6471d",
            "#e5177b",
            "grey"
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

        <Modal
            sx={modalStyle}
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <div>
            <h3>{triviaData.category}</h3>
            <span>{decode(triviaData.question)}</span>
            <br />
            <br />
            {
                possibleAnswers.map((answer) =>
                    <div>
                        {
                            !answerColor ?
                            <button onClick={() => verifyAnswer(answer)}>
                                {decode(answer)}
                            </button>
                            : 
                            <button value={answer} className={triviaData.correct_answer === answer ? 'nonClickableButton correctAnswer' : 'nonClickableButton'} id={triviaData.correct_answer !== answer && buttonValue === answer ? 'incorrectAnswer' : ''}>
                                {decode(answer)}
                            </button>
                        }
                    </div>
                )
            }
            {
                answerColor ?
                <div className='spinAgainButtonContainer'>
                    <button className='spinAgainButton' onClick={handleClose}>Spin again!</button>
                </div>
                : <></>
            }
            </div>
            </Box>
        </Modal>
        <Modal
            open={openWildcard}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {rouletteData.map(item => 
                    <ul>
                        {
                            <span value={item.category} onClick={() => chooseCategory(item.category)}>{item.categoryTitle}</span>
                        }
                    </ul>
                )}
            </Box>
        </Modal>
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
    {
        loading ?
        <Loader/> 
        : <span></span>
    }
    </div>
    )
}
