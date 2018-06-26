export default class NoteService {
    async getAllNotes() {
        const res = await fetch(`/notes`, {
            method: 'GET'
        })
        return await res.json()
    }

    async getNote(id) {
        const res = await fetch(`/notes/${id}`, {
            method: 'GET'
        })
        return await res.json()
    }

    async create(note) {
        const res = await fetch('/notes/', {
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        return res.json()
    }

    async toggleComplete(id) {
        const note = await this.getNote(id)
        note.completed = !note.completed
        await this.update(note)
    }

    async update(note) {
        const res = await fetch(`/notes/${note._id}`, {
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        return res.json()
    }
}