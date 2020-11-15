import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'
// import { taskService } from '../services/TaskService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:id', this.delete)
      // .put('/bugs/:bugId/notes/:noteId', this.edit)
      // .get('/bugs/:id/notes', this.getNotes)
  }

  // async getNotes(req, res, next) {
  //   try {
  //     console.log(req)
  //     res.send(await noteService.getNotes(req.params.id))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async createNote(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      res.send(await noteService.create(req.body))
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await noteService.delete(req.params.id, req.userInfo.id))
    } catch (err) {
      next(err)
    }
  }

//   async editNote(req, res, next) {
//     try {
//       res.send(await noteService.edit(req.params.id, req.body))
//     } catch (err) {
//       next(err)
//     }
//   }
// }
}
