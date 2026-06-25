import { useState } from 'react'
import { useStore } from '../store'
import Column from './Column'

function Board() {
  const { getActiveBoard } = useStore()
  const board = getActiveBoard()

  if (!board) return <p>No board found.</p>

  return (
    <div className="board">
      <div className="columns">
        {board.columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  )
}

export default Board