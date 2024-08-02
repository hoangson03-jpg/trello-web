import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}
