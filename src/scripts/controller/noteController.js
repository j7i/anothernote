import NoteService from './../services/noteService.js'

class Note {
    constructor(note) {
        this.title = note.title
        this.content = note.content
        this.date = note.date
        this.importance = note.importance
    }
}

export default class NoteController {
    constructor() {
        this.noteService = new NoteService()
        this.isDetail

        this.submit
        this.form
        
        this.title
        this.content
        this.finishDate
        this.rating
    }

    checkIfDetailView() {
        const detailClass = document.querySelector('.note-details')
        console.log(detailClass)
        return detailClass
    }

    queryElements() {
        this.form = document.querySelector('#note-form')
        this.submit = document.querySelector('#new-todo')
        this.title = document.querySelector('#note-title')
        this.content = document.querySelector('#note-content')
        this.date = document.querySelector('#note-date')
    }

    getFormData() {
        return new Note({
            title: this.title.value,
            content: this.content.value,
            date: this.date.value,
            importance: '1'
        })
    }

    addListeners() {
        this.queryElements()

        this.form.addEventListener('submit', async(e) => {
            e.preventDefault()
            console.log(this.getFormData())
            await this.noteService.create(this.getFormData())
            this.form.reset()
        }, false)
    }
}

const controller = new NoteController()
if (controller.checkIfDetailView()) {
    controller.addListeners()
}
