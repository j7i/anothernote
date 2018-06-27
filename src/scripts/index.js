import NoteService from './services/noteService.js'
import NoteController from './controller/noteController.js'

class IndexController {
    constructor() {
        this.noteService = new NoteService();
        this.sort = 'byCreatedAt'
        this.filter = false
        this.notes
        this.filteredNotes
        
        this.noteTemplate = document.querySelector('#notes-template')
        this.noteArea = document.querySelector('.notes__inner')
        
        this.sortActions
        this.completeToggles = []
    }

    checkIfMainView() {
        const mainClass = document.querySelector('.notes')
        return mainClass
    }

    queryElements() {
        this.sortActions = document.querySelectorAll('button[data-sort]')
        this.filterToggle = document.querySelector('.filter__toggle')
        this.completeToggles = document.querySelectorAll('.note__complete-toggle')
    }

    applyListeners() {
        this.sortActions.forEach(filter => {
            filter.addEventListener('click', async (e) => {
                this.sort = e.target.dataset.sort
                document.querySelector('.active').classList.remove('active')
                e.target.classList.add('active')
                this.updateView()
            })
        })

        this.filterToggle.addEventListener('click', async (e) => {
            let filter = this.filter
            if (filter) {
                e.target.classList.add('active')
                e.target.children[0].innerHTML = 'check_box'
            } else {
                e.target.classList.remove('active')
                console.log(e.target.children)
                e.target.children[0].innerHTML = 'check_box_outline_blank'
            }
            this.filter = !filter
            this.filterCompleted()
        })

        this.completeToggles.forEach(toggle => {
            toggle.addEventListener('click', async (e) => {
                const id = e.target.closest('.note').dataset.id
                await this.noteService.toggleComplete(id)
                this.updateView()
            })
        })
    }

    init() {
        this.queryElements()
        this.applyListeners()
    }

    renderNotes(notes) {
        const noteTemplate = this.noteTemplate.innerHTML
        const compileNoteTemplate = Handlebars.compile(noteTemplate)
        this.noteArea.innerHTML = compileNoteTemplate(notes)
        console.log(notes)
    }

    render(notes) {
        this.renderNotes(notes)
    }

    filterCompleted() {
        if (this.filter) {
                this.filteredNotes = this.notes.filter(note => note.completed == !this.filter)
                this.renderNotes(this.filteredNotes)
        } else {
            this.renderNotes(this.notes)
        }
        
    }
    
    async updateView() {
        this.notes = await this.noteService.getAllNotes(this.sort, this.filter)
        this.render(this.notes)
    }
}

const controller = new IndexController()
if (controller.checkIfMainView()) {
    controller.init()
    controller.updateView()
}
