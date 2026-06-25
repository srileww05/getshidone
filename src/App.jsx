import { useEffect } from 'react'
import { useStore } from './store'
import Board from './components/Board'
import FocusMode from './components/FocusMode'
import HelpBox from './components/HelpBox'
import './App.css'

function App() {
  const { loadFromDB, loaded, focusCard } = useStore()

  useEffect(() => {
    loadFromDB()
  }, [])

  if (!loaded) {
    return (
      <div className="loading">
        <p>Loading your board...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>✅ getshidone</h1>
          <p className="tagline">one thing at a time.</p>
        </div>
      </header>
      <main>
        {focusCard ? <FocusMode /> : <Board />}
      </main>
      <HelpBox />
    </div>
  )
}

export default App