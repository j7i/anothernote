import NoteService from './services/noteService.js'
import NoteController from './controller/noteController.js'

class Refactor {
    constructor() {
        this.noteService = new NoteService();
        
        this.noteTemplate = document.querySelector('#notes-template')
        this.noteArea = document.querySelector('.notes__inner')

        this.completeToggles = []
    }

    render(notes) {
        this.renderNotes(notes)
        this.findCompleteToggles()
        this.applyCompleteToggles()

    }

    renderNotes(notes) {
        const noteTemplate = this.noteTemplate.innerHTML
        const compileNoteTemplate = Handlebars.compile(noteTemplate)
        this.noteArea.innerHTML = compileNoteTemplate(notes)
        console.log(notes)
    }

    findCompleteToggles() {
        this.completeToggles = document.querySelectorAll('.note__complete-toggle')
    }

    applyCompleteToggles() {
        this.completeToggles.forEach(toggle => {
            toggle.addEventListener('click', async (e) => {
                const id = e.target.closest('.note').dataset.id;
                await this.noteService.toggleComplete(id);
                this.updateView();
            })
        })
    }

    async create(note) {
        const notes = await this.noteService.create(note)
    }
    
    async updateView() {
        const notes = await this.noteService.getAllNotes()
        this.render(notes)
    }
}

//controller
const controller = new Refactor()
controller.updateView()