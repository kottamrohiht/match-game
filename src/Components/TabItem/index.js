import './index.css'

const TabItem = props => {
  const {item, isActive, updateActiveTabId} = props
  const {displayText, tabId} = item

  const buttonClicked = () => {
    updateActiveTabId(tabId)
  }

  const active = isActive ? 'active-item ' : ''

  return (
    <li className="tabitem-list">
      <button
        onClick={buttonClicked}
        type="button"
        className={`tab-button ${active} `}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
