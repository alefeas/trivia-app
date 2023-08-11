import { ExitArrow } from "../../components/exitArrow/ExitArrow.jsx"

export const HowToPlay = () => {
  return (
    <div>
      <ExitArrow/>
      <div className="howToPlayContainer">
        <div>
          <h3>How to play</h3>
          <p>The game consists of a trivia battle between 2 players. When the turn is yours you must spin the roulette which will determine the category in which you will respond. In the case that you get the wild card, you can choose it. If you answer well, you will continue to respond, but if not, the turn will be assigned to your rival.</p>
          <p>You will see a counter which will keep track of the number of correct answers of each one. The first to reach 7 correct answers will be the winner. If you want to keep playing, the winner will be the one who starts responding.</p>
        </div>
      </div>
    </div>
  )
}
