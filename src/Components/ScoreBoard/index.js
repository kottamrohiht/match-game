import './index.css'

const ScoreBoard = props => {
  const {playAgain, score} = props
  const trophyUrl =
    'https://assets.ccbp.in/frontend/react-js/match-game-trophy.png'
  const reset =
    'https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png'

  const clickResetButton = () => {
    playAgain()
  }

  return (
    <div className="score-board-img-container">
      <img src={trophyUrl} alt="trophy" className="trophy" />
      <p className="your-score"> YOUR SCORE </p>
      <p className="your-score-count"> {score} </p>
      <button onClick={clickResetButton} type="button" className="play-again">
        <img src={reset} className="reply-icon" alt="reset" />
        PLAY AGAIN
      </button>
    </div>
  )
}

export default ScoreBoard
