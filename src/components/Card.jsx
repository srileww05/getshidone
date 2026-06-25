import { useState } from 'react'
import { useStore } from '../store'

const EFFORT_LABELS = {
  tiny: '🟢 Tiny',
  small: '🔵 Small',
  medium: '🟡 Medium',
  big: '🔴 Big',
}

const COLUMNS = [
  { id: 'col-brain-dump', label: '🧠 Brain Dump' },
  { id: 'col-today', label: '🎯 Today' },
  { id: 'col-in-progress', label: '⚡ In Progress' },
  { id: 'col-done', label: '✅ Done' },
]

function Card({ card, columnId }) {
  const { moveCard, deleteCard, setFocusCard } = useStore()
  const [showMenu, setShowMenu] = useState(false)

  const handleMove = (toColId) => {
    if (toColId !== columnId) {
      moveCard(card.id, columnId, toColId)
    }
    setShowMenu(false)
  }

  return (
    <div className="card">
      <div className="card-top">
        <span className="effort-dot">{EFFORT_LABELS[card.effort]}</span>
        <div className="card-actions">
          <button
            className="focus-btn"
            onClick={() => setFocusCard({ ...card, columnId })}
            title="Focus on this task"
          >
            🎯
          </button>
          <button
            className="menu-btn"
            onClick={() => setShowMenu(!showMenu)}
            title="Move or delete"
          >
            ⋯
          </button>
        </div>
      </div>

      <p className="card-title">{card.title}</p>

      {showMenu && (
        <div className="card-menu">
          <p className="menu-label">Move to:</p>
          {COLUMNS.filter(c => c.id !== columnId).map(col => (
            <button key={col.id} onClick={() => handleMove(col.id)}>
              {col.label}
            </button>
          ))}
          <hr />
          <button
            className="delete-btn"
            onClick={() => {
              deleteCard(card.id, columnId)
              setShowMenu(false)
            }}
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Card