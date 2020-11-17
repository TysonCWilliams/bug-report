import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('/bugs')
      AppState.bugs = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createBug(bugData) {
    try {
      const res = await api.post('/bugs', bugData)
      AppState.bugs.push(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async getBugDetails(bugId) {
    try {
      const res = await api.get('/bugs/' + bugId)
      AppState.bugDetails = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteBug(bugId) {
    try {
      await api.delete('/bugs/' + bugId)
      this.getBugs()
    } catch (err) {
      logger.error(err)
    }
  }

  async editBug(bugId, bugData) {
    try {
      await api.put('/bugs/' + bugId, bugData)
      this.getBugs()
    } catch (err) {
      logger.error(err)
    }
  }
}

export const bugService = new BugService()
