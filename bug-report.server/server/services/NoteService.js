import { dbContext } from '../db/DbContext'
import Note from '../models/Note'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getNotes(id) {
    const data = await dbContext.Notes.find({ bugId: id })
    return data
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async delete(id, userId) {
    const noteProfile = await dbContext.Notes.findById(id)
    // @ts-ignore
    if (userId === noteProfile.profile) {
      await dbContext.Notes.findByIdAndDelete(id)
      if (!Note) {
        throw new BadRequest('No found Note')
      } return this.getNotes()
    } throw new BadRequest('Access Denied')
  }

  async edit(id, body) {
    await dbContext.Notes.findByIdAndUpdate(id, body, { new: true })
    if (!Note) {
      throw new BadRequest('No found Note')
    }
    const data = await dbContext.Notes.findOne({ _id: id })
    return data
  }
}

export const noteService = new NoteService()
