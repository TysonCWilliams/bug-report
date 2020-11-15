import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import BaseController from '../utils/BaseController'
import { noteService } from '../services/NoteService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/notes', this.getNotes)
      .get('', this.getBugs)
      .post('', this.createBug)
      .put('/:id', this.edit)
      .get('/:id', this.getById)
      .put('/:bugId/notes/:noteId', this.editNote)
  }

  async getBugs(req, res, next) {
    try {
      const data = await bugService.getBugs(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      res.send(await noteService.getNotes(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      res.send(await bugService.create(req.body))
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await bugService.edit(req.params.id, req.body))
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    console.log(req.params)
    try {
      res.send(await bugService.getById(req.params.id))
    } catch (err) {
      next(err)
    }
  }

  async editNote(req, res, next) {
    try {
      res.send(await noteService.edit(req.params.noteId, req.body))
    } catch (err) {
      next(err)
    }
  }
}
