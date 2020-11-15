import { dbContext } from '../db/DbContext'
import Bug from '../models/Bug'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getBugs(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(id, body) {
    // eslint-disable-next-line eqeqeq
    if (body.closed == true && body.closedDate == undefined) {
      body.closedDate = new Date()
    }
    await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true })
    if (!Bug) {
      throw new BadRequest('No found Bug')
    } return this.getBugs()
  }

  async getById(id) {
    return await dbContext.Bugs.findById(id)
  }
}

export const bugService = new BugService()
