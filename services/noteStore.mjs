import Datastore from 'nedb-promise'
import path from 'path'

export class Note {
    constructor(title, content, finishDate, importance) {
        this.title = title
        this.content = content
        this.createdDate = new Date()
        this.finishDate = finishDate
        this.importance = importance
        this.completed = false
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: `${path.resolve('data')}/notes.db`, autoload: true, timestampData: true
        })
    }

    async create(body) {
        let note = new Note(body.title, body.content, body.finishDate, body.importance)
        return await this.db.insert(note)
    }

    async get(id) {
        return await this.db.findOne({_id: id})
    }

    async update(id, note) {
        return await this.db.update({_id: note._id}, note, {})
    }

    async all(sort, filterCompleted) {
        let notes
        if (sort === 'finishDate') {
            notes = await this.db.cfind({completed: filterCompleted}).sort({ finishDate : -1 }).exec()
        } else {
            notes = await this.db.cfind({completed: filterCompleted}).sort({ creadedAt : -1 }).exec()
        }
        return notes
    }
}

export const noteStore = new NoteStore()