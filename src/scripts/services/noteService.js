export default class NoteService {
    async getAllNotes() {
        const res = await fetch(`/notes`, {
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
}