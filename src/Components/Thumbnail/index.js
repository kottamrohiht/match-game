import './index.css'

const Thumbnail = props => {
  const {item, chechMatchingId} = props
  const {id, thumbnailUrl} = item

  const thumbnailClicked = () => {
    chechMatchingId(id)
  }

  return (
    <li className="thumbnailUrl-container">
      <button
        onClick={thumbnailClicked}
        type="button"
        className="thumbnail-button"
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default Thumbnail
