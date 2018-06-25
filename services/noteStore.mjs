import Datastore from 'nedb-promise'

export class Note {
    constructor(title, content, finishDate, rating) {
        this.title = title
        this.content = content
        this.createdDate = new Date()
        this.finishDate = finishDate
        this.rating = rating
        this.state = "PENDING"
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './../data/notes.db', autoload: true, timestampData: true
        })
    }

    async log() {
        return await console.log(this.db)
    }

    async create(title, content, finishDate, rating) {
        let note = new Note(title, content, finishDate, rating)
        return await this.db.insert(note)
    }

    async get(id) {
        return await this.db.findOne({_id: id})
    }

    async all() {
        return await this.db.cfind({}).sort({ createdDate: -1 }).exec()
    }
}

export const noteStore = new NoteStore()