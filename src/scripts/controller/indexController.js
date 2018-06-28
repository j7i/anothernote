import NoteService from './../services/noteService.js'
import NoteController from './noteController.js'

class IndexController {
    constructor() {
        this.noteService = new NoteService();
        this.style

        this.sort = 'byCreatedAt'
        this.filter = false
        this.notes
        this.filteredNotes
        
        this.noteTemplate = document.querySelector('#notes-template')
        this.noteArea = document.querySelector('.notes__inner')
        
        this.sortActions
        this.filterToggle
        this.styleToggle

        this.completeToggles = []
    }

    checkIfMainView() {
        const mainClass = document.querySelector('.notes')
        return mainClass
    }

    queryElements() {
        this.sortActions = document.querySelectorAll('button[data-sort]')
        this.filterToggle = document.querySelector('.filter__toggle')
        this.styleToggle = document.querySelector('.style-toggle')
    }

    applyListeners() {
        this.sortActions.forEach(filter => {
            filter.addEventListener('click', async (e) => {
                this.sort = e.target.dataset.sort
                document.querySelector('.active').classList.remove('active')
                e.target.classList.add('active')
                this.updateNotesTemplate()
            })
        })

        this.filterToggle.addEventListener('click', async (e) => {
            if (this.filter) {
                e.target.classList.add('active')
                e.target.children[0].innerHTML = 'check_box'
            } else {
                e.target.classList.remove('active')
                e.target.children[0].innerHTML = 'check_box_outline_blank'
            }
            this.filter = !this.filter
            this.filterCompletedNotes()
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

    init() {
        this.queryElements()
        this.applyListeners()
    }

    filterCompletedNotes() {
        if (this.filter) {
                this.filteredNotes = this.notes.filter(note => note.completed == !this.filter)
                this.updateNotesTemplate(this.filteredNotes)
        } else {
            this.updateNotesTemplate(this.notes)
        }
        
    }

    queryTemplateElements() {
        this.completeToggles = document.querySelectorAll('.note__complete-toggle')
    }

    applyTemplateListeners() {
        this.completeToggles.forEach(toggle => {
            toggle.addEventListener('click', async (e) => {
                const id = e.target.closest('.note').dataset.id
                await this.noteService.toggleComplete(id)
                this.updateNotesTemplate()
            })
        })
    }

    renderNotesTemplate(notes) {
        const noteTemplate = this.noteTemplate.innerHTML
        const compileNoteTemplate = Handlebars.compile(noteTemplate)
        this.noteArea.innerHTML = compileNoteTemplate(notes)
    }
    
    async updateNotesTemplate(filteredNotes) {
        let notes = filteredNotes
        if (!filteredNotes) {
            notes = this.notes = await this.noteService.getAllNotes(this.sort, this.filter)
        }
        this.renderNotesTemplate(notes)
        this.queryTemplateElements()
        this.applyTemplateListeners()
    }
}

const controller = new IndexController()
if (controller.checkIfMainView()) {
    controller.updateNotesTemplate()
    controller.init()
}
