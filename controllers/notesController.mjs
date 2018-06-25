import { noteStore } from './../services/noteStore'

export class NotesController {

    async getAllNotes(req, res) {
        res.json((await noteStore.all()))
    }

    async createNote(req, res) {
        res.json(await noteStore.create(
            req.body.title,
            req.body.content,
            req.body.finishDate,
            req.body.rating
        ))
    }

    async showNote(req, res) {
        res.json(await noteStore.get(req.params.id))
    }

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id))
    }
}

export const notesController = new NotesController()