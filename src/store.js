import { create } from 'zustand'
import { openDB } from 'idb'

const DB_NAME = 'getshidone'
const DB_VERSION = 1

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('boards')) {
        db.createObjectStore('boards', { keyPath: 'id' })
      }
    },
  })
}

async function saveBoards(boards) {
  const db = await getDB()
  const tx = db.transaction('boards', 'readwrite')
  await tx.store.clear()
  for (const board of boards) {
    await tx.store.put(board)
  }
  await tx.done
}

async function loadBoards() {
  const db = await getDB()
  return db.getAll('boards')
}

const defaultBoard = {
  id: 'board-1',
  title: 'My Board',
  columns: [
    { id: 'col-brain-dump', title: '🧠 Brain Dump', cards: [] },
    { id: 'col-today', title: '🎯 Today (max 3)', cards: [] },
    { id: 'col-in-progress', title: '⚡ In Progress', cards: [] },
    { id: 'col-done', title: '✅ Done', cards: [] },
  ],
}

export const useStore = create((set, get) => ({
  boards: [defaultBoard],
  activeBoard: 'board-1',
  focusCard: null,
  loaded: false,

  loadFromDB: async () => {
    const boards = await loadBoards()
    if (boards.length > 0) {
      set({ boards, loaded: true })
    } else {
      await saveBoards([defaultBoard])
      set({ loaded: true })
    }
  },

  getActiveBoard: () => {
    const { boards, activeBoard } = get()
    return boards.find(b => b.id === activeBoard)
  },

  addCard: (columnId, title) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title,
      effort: 'small',
      notes: '',
      subtasks: [],
    }
    set(state => {
      const boards = state.boards.map(board => {
        if (board.id !== state.activeBoard) return board
        return {
          ...board,
          columns: board.columns.map(col => {
            if (col.id !== columnId) return col
            return { ...col, cards: [...col.cards, newCard] }
          }),
        }
      })
      saveBoards(boards)
      return { boards }
    })
  },

  moveCard: (cardId, fromColId, toColId) => {
    set(state => {
      const boards = state.boards.map(board => {
        if (board.id !== state.activeBoard) return board
        let movedCard = null
        const columns = board.columns.map(col => {
          if (col.id === fromColId) {
            movedCard = col.cards.find(c => c.id === cardId)
            return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          }
          return col
        })
        const finalColumns = columns.map(col => {
          if (col.id === toColId && movedCard) {
            return { ...col, cards: [...col.cards, movedCard] }
          }
          return col
        })
        return { ...board, columns: finalColumns }
      })
      saveBoards(boards)
      return { boards }
    })
  },

  deleteCard: (cardId, columnId) => {
    set(state => {
      const boards = state.boards.map(board => {
        if (board.id !== state.activeBoard) return board
        return {
          ...board,
          columns: board.columns.map(col => {
            if (col.id !== columnId) return col
            return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          }),
        }
      })
      saveBoards(boards)
      return { boards }
    })
  },

  setFocusCard: (card) => set({ focusCard: card }),
  clearFocusCard: () => set({ focusCard: null }),
}))