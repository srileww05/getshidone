import { useState, useEffect } from 'react'
import { useStore } from '../store'

function FocusMode() {
  const { focusCard, clearFocusCard, moveCard } = useStore()
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let interval = null
    if (running) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(interval)
            setRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [running])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const handleDone = () => {
    moveCard(focusCard.id, focusCard.columnId, 'col-done')
    clearFocusCard()
  }

  return (
    <div className="focus-mode">
      <button className="exit-focus" onClick={clearFocusCard}>
        ← Back to board
      </button>

      <div className="focus-content">
        <p className="focus-label">RIGHT NOW YOU'RE WORKING ON</p>
        <h1 className="focus-task">{focusCard.title}</h1>

        <div className="timer">
          <p className="timer-display">{formatTime(seconds)}</p>
          <div className="timer-controls">
            <button onClick={() => setRunning(!running)}>
              {running ? '⏸ Pause' : '▶ Start'}
            </button>
            <button onClick={() => { setSeconds(25 * 60); setRunning(false) }}>
              ↺ Reset
            </button>
          </div>
        </div>

        <div className="focus-actions">
          <button className="done-btn" onClick={handleDone}>
            ✅ Mark as Done
          </button>
          <button className="skip-btn" onClick={clearFocusCard}>
            Not now, back to board
          </button>
        </div>
      </div>
    </div>
  )
}

export default FocusMode