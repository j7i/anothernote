import NoteService from './services/noteService.js'
import NoteController from './controller/noteController.js'

class IndexController {
    constructor() {
        this.noteService = new NoteService();
        this.sort = 'byCreatedAt'
        this.filter = false
        this.notes
        this.filteredNotes
        this.style
        
        this.noteTemplate = document.querySelector('#notes-template')
        this.noteArea = document.querySelector('.notes__inner')
        
        this.sortActions
        this.completeToggles = []
        this.styleToggle
    }

    checkIfMainView() {
        const mainClass = document.querySelector('.notes')
        return mainClass
    }

    queryElements() {
        this.sortActions = document.querySelectorAll('button[data-sort]')
        this.filterToggle = document.querySelector('.filter__toggle')
        this.completeToggles = document.querySelectorAll('.note__complete-toggle')
        this.styleToggle = document.querySelector('.style-toggle')
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
                e.target.children[0].innerHTML = 'check_box_outline_blank'
            }
            this.filter = !filter
            this.filterCompletedNotes()
        })

        this.completeToggles.forEach(toggle => {
            toggle.addEventListener('click', async (e) => {
                const id = e.target.closest('.note').dataset.id
                await this.noteService.toggleComplete(id)
                this.updateView()
            })
        })

        this.styleToggle.addEventListener('click', async (e) => {
            if (!this.style) {
                document.querySelector('body').classList.add('inverted')
            } else {
                document.querySelector('body').classList.remove('inverted')
            }
            this.style = !this.style
        })
    }

    renderNotes(notes) {
        const noteTemplate = this.noteTemplate.innerHTML
        const compileNoteTemplate = Handlebars.compile(noteTemplate)
        this.noteArea.innerHTML = compileNoteTemplate(notes)
        console.log(notes)
    }

    filterCompletedNotes() {
        if (this.filter) {
                this.filteredNotes = this.notes.filter(note => note.completed == !this.filter)
                this.renderNotes(this.filteredNotes)
        } else {
            this.renderNotes(this.notes)
        }
        
    }
    
    async updateView() {
        this.notes = await this.noteService.getAllNotes(this.sort, this.filter)
        this.renderNotes(this.notes)
        this.queryElements()
        this.applyListeners()
    }
}

const controller = new IndexController()
if (controller.checkIfMainView()) {
    controller.updateView()
}
