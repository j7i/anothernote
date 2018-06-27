import NoteService from './services/noteService.js'
import NoteController from './controller/noteController.js'

class IndexController {
    constructor() {
        this.noteService = new NoteService();
        this.sort = 'finishDate'
        this.filter = false
        
        this.noteTemplate = document.querySelector('#notes-template')
        this.noteArea = document.querySelector('.notes__inner')

        this.completeToggles = []
    }

    checkIfMainView() {
        const mainClass = document.querySelector('.notes')
        return mainClass
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
        const notes = await this.noteService.getAllNotes(this.sort, this.filter)
        this.render(notes)
    }
}

const controller = new IndexController()
if (controller.checkIfMainView()) {
    controller.updateView()
}
