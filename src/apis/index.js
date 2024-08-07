import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

// Update board
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

// Columns
export const createColumnAPI = async (newColumnData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return reponse.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

// Cards
export const createCardAPI = async (newCardData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return reponse.data
}


