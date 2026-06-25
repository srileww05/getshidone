import { useState } from 'react'
import { useStore } from '../store'
import Card from './Card'

function Column({ column }) {
  const { addCard } = useStore()
  const [input, setInput] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleAdd = () => {
    if (input.trim() === '') return
    addCard(column.id, input.trim())
    setInput('')
    setShowInput(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') setShowInput(false)
  }

  const isToday = column.id === 'col-today'
  const isFull = isToday && column.cards.length >= 3

  return (
    <div className="column">
      <div className="column-header">
        <span className="card-count">{column.cards.length}</span>
        <h2 className="column-title">{column.title}</h2>
        <span className="column-arrow">→</span>
      </div>

      {isFull && (
        <p className="today-warning">
          3 tasks max. Finish one before adding more.
        </p>
      )}

      <div className="cards-list">
        {column.cards.map(card => (
          <Card key={card.id} card={card} columnId={column.id} />
        ))}
      </div>

      {!isFull && (
        <div className="add-card-area">
          {showInput ? (
            <div className="add-card-input">
              <input
                autoFocus
                type="text"
                placeholder="What needs doing?"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="input-actions">
                <button onClick={handleAdd}>Add</button>
                <button onClick={() => setShowInput(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="add-card-btn" onClick={() => setShowInput(true)}>
              + add a task
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Column