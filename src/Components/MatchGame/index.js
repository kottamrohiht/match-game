import {Component} from 'react'

import TabItem from '../TabItem'
import Thumbnail from '../Thumbnail'
import ScoreBoard from '../ScoreBoard'

import './index.css'

class MatchGame extends Component {
  state = {
    matchingImg: '',
    activeTab: '',
    imgId: '',
    showScorecard: false,
    score: 0,
    seconds: 60,
  }

  componentDidMount() {
    this.acceptProps()
  }

  acceptProps = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      matchingImg: imagesList[0].imageUrl,
      activeTab: tabsList[0].tabId,
      imgId: imagesList[0].id,
    })
    this.timerId = setInterval(this.setTimer, 1000)
  }

  setTimer = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
      this.setState({
        showScorecard: true,
      })
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  playAgain = () => {
    this.setState({
      showScorecard: false,
      seconds: 60,
      score: 0,
    })
    this.acceptProps()
  }

  chechMatchingId = id => {
    const {imgId} = this.state
    const {imagesList} = this.props
    if (imgId === id) {
      const randomObj =
        imagesList[Math.ceil(Math.random() * imagesList.length - 1)]
      this.setState(prevState => ({
        matchingImg: randomObj.imageUrl,
        imgId: randomObj.id,
        score: prevState.score + 1,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({
        showScorecard: true,
        seconds: 0,
      })
    }
  }

  updateActiveTabId = tabId => {
    this.setState({
      activeTab: tabId,
    })
  }

  renderImageTobeMatch = () => {
    const {matchingImg} = this.state

    return (
      <li className="img-tobe-match-container">
        <img src={matchingImg} className="img-to-be-match" alt="match" />
      </li>
    )
  }

  renderNavbar = () => {
    const {score, seconds} = this.state
    const logoImg =
      'https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png'
    const timerImg =
      'https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png'

    return (
      <ul className="nav-container">
        <img src={logoImg} alt="website logo" className="website-logo" />
        <li className="score-timer-container">
          <p className="score">
            {' '}
            Score: <span className="span-el"> {score} </span>{' '}
          </p>
          <img src={timerImg} alt="timer" className="timer-img" />
          <p className="timer"> {seconds} sec </p>
        </li>
      </ul>
    )
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTab, showScorecard, score} = this.state
    const filteredItems = imagesList.filter(each => each.category === activeTab)

    return (
      <div className="game-container">
        {this.renderNavbar()}
        <div className="inside-container">
          {showScorecard === false ? (
            <div>
              {this.renderImageTobeMatch()}
              <ul className="tab-item-container">
                {tabsList.map(each => (
                  <TabItem
                    item={each}
                    key={each.tabId}
                    isActive={activeTab === each.tabId}
                    updateActiveTabId={this.updateActiveTabId}
                  />
                ))}
              </ul>

              <ul className="thumbnail-container">
                {filteredItems.map(each => (
                  <Thumbnail
                    item={each}
                    key={each.id}
                    chechMatchingId={this.chechMatchingId}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="ScoreBoard-container">
              <ScoreBoard playAgain={this.playAgain} score={score} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
