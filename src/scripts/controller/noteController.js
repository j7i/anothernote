import NoteService from './../services/noteService.js'

export default class NoteController {
    constructor() {
        this.noteService = new NoteService()

        this.addNew
        
        this.title
        this.content
        this.finishDate
        this.rating
    }

    queryElements() {
        this.detailView = document.querySelector('.note-details')
        this.addNew = document.querySelector('#new-todo')
        this.title = document.querySelector('#note-title')
        this.content = document.querySelector('#note-content')
        this.date = document.querySelector('#note-date')
    }

    addListeners() {
        this.title.addEventListener('input', this.updateTitle())
        this.content.addEventListener('input', this.updateContent())
        this.date.addEventListener('input', this.updateDate())

        this.addNewNoteButton.addEventListener('click', function(note) {
            note.rating = 1
            this.noteService.create(note)
            console.log('Initialised note creation:', note)
        }, false)
    }

    updateTitle () { 
        this.title = this.value
    }

    updateContent () { 
        this.content = this.value
    }

    updateDate () {
        this.finishDate = this.value
    }
}

const controller = new NoteController()
controller.addListeners()