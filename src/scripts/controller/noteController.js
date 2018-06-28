import NoteService from './../services/noteService.js'

class Note {
    constructor(note) {
        this.title = note.title
        this.content = note.content
        this.finishDate = note.finishDate
        this.completed = note.completed
        this.importance = note.importance
    }
}

export default class NoteController {
    constructor() {
        this.noteService = new NoteService()
        this.isDetail
        this.noteId
        this.styleToggle
        this.style

        this.submit
        this.form
        
        this.title
        this.content
        this.finishDate
        this.completed
        this.importance = 1
    }

    checkIfDetailView() {
        const detailClass = document.querySelector('.note-details')
        console.log(detailClass)
        return detailClass
    }

    render() {
        this.noteId = this.getIdParam()
        this.addListeners()
        if(this.noteId) {
            this.fillForm(this.noteId)
        }
    }

    queryElements() {
        this.form = document.querySelector('#note-form')
        this.submit = document.querySelector('#todo-submit')
        this.title = document.querySelector('#note-title')
        this.content = document.querySelector('#note-content')
        this.finishDate = document.querySelector('#note-date')
        this.importanceOptions = document.querySelectorAll('input[name="importance"]')
        this.styleToggle = document.querySelector('.style-toggle')
    }

    addListeners() {
        this.queryElements()

        this.importanceOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                this.importance = e.target.value
            })
        })

        this.form.addEventListener('submit', async(e) => {
            e.preventDefault()
            await this.submitForm(this.getFormData())
            this.form.reset()
            window.location.href = 'index.html'
        }, false)

        this.styleToggle.addEventListener('click', async (e) => {
            if (!this.style) {
                document.querySelector('body').classList.add('inverted')
            } else {
                document.querySelector('body').classList.remove('inverted')
            }
            this.style = !this.style
        })
    }

    getIdParam() {
        const url = new URLSearchParams(window.location.search);
        return url.get('id');
    }

    async fillForm(byId) {
        this.submit.innerHTML = 'Save'
        const note = await this.noteService.getNote(byId)
        this.title.value = note.title
        this.content.value = note.content
        this.finishDate.value = note.finishDate
        this.completed = note.completed
        this.importance = note.importance
        this.importanceOptions.forEach(option => {
            if (option.value == this.importance) {
                option.checked = 'checked'
            }
        })
    }

    getFormData() {
        return new Note({
            title: this.title.value,
            content: this.content.value,
            finishDate: this.finishDate.value,
            completed: this.completed,
            importance: Number(this.importance)
        })
    }

    async submitForm(note) {
        if (this.noteId) {
            note._id = this.noteId
            this.noteService.update(note)
        } else {
            this.noteService.create(note)
        }
    }
}

const controller = new NoteController()
if (controller.checkIfDetailView()) {
    controller.render()
}
