import NoteService from './../services/noteService.js'

class Note {
    constructor(note) {
        this.title = note.title
        this.content = note.content
        this.finishDate = note.finishDate
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
        this.importance = 1
    }

    checkIfDetailView() {
        const detailClass = document.querySelector('.note-details')
        console.log(detailClass)
        return detailClass
    }

    render () {
        const id = this.getIdParam()
        this.addListeners()
        if(id) {
            this.fillForm(id)
        }
    }

    getIdParam() {
        const url = new URLSearchParams(window.location.search);
        return url.get('id');
    }

    async fillForm(byId) {
        const note = await this.noteService.getNote(byId)
        this.title.value = note.title
        this.content.value = note.content
        this.finishDate.value = note.finishDate
        this.importance = note.importance
    }

    queryElements() {
        this.form = document.querySelector('#note-form')
        this.submit = document.querySelector('#new-todo')
        this.title = document.querySelector('#note-title')
        this.content = document.querySelector('#note-content')
        this.finishDate = document.querySelector('#note-date')
        this.importanceOptions = document.querySelectorAll('input[name="importance"]');
    }

    getFormData() {
        console.log(this.importance)
        return new Note({
            title: this.title.value,
            content: this.content.value,
            finishDate: this.finishDate.value,
            importance: Number(this.importance)
        })
    }

    addListeners () {
        this.queryElements()

        this.importanceOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                this.importance = e.target.value
            })
        })

        this.form.addEventListener('submit', async(e) => {
            e.preventDefault()
            console.log(this.getFormData())
            await this.noteService.create(this.getFormData())
            this.form.reset()
            window.location.href = 'index.html'
        }, false)
    }
}

const controller = new NoteController()
if (controller.checkIfDetailView()) {
    controller.render()
}
