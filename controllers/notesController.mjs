import { noteStore } from './../services/noteStore'

export class NotesController {

    async getAllNotes(req, res) {
        const {sort, filter} = req.query
        res.json((await noteStore.all(sort, filter)))
    }

    async createNote(req, res) {
        res.json(await noteStore.create(req.body))
    }

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id))
    }

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id, req.body))
    }
}

export const notesController = new NotesController()