import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class NoteService {
  async getNotes(bugId) {
    try {
      const res = await api.get('/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createNote(noteData) {
    try {
      await api.post('/notes', noteData)
      this.getNotes(noteData.bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async editNote(noteId, noteData) {
    try {
      await api.put('/notes/' + noteId, noteData)
      this.getNotes(noteData.bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteNote(noteId) {
    console.log(noteId)
    try {
      await api.delete('/notes/' + noteId)
    } catch (err) {
      logger.error(err)
    }
  }
}

export const noteService = new NoteService()
