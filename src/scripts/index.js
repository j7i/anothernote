import NoteService from './services/noteService.js'

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
const controller = new Refactor();
controller.updateView();

const addNewNoteButton = document.querySelector('#new-todo')
const noteTitleEl = document.querySelector('#note-title')
const noteContentEl = document.querySelector('#note-content')
const noteDateEl = document.querySelector('#note-date')

const detailView = document.querySelector('.note-details')

if (detailView) {
    let title
    let content
    let finishDate
    let rating = 1

    noteTitleEl.addEventListener('input', updateTitle)
    noteContentEl.addEventListener('input', updateContent)
    noteDateEl.addEventListener('input', updateDate)

    function updateTitle () { 
        title = this.value
    }

    function updateContent () { 
        content = this.value
    }

    function updateDate () {
        finishDate = this.value
    }

    addNewNoteButton.addEventListener('click', function() {
        let note = {
            title,
            content,
            finishDate,
            rating
        }
        console.log(note)
        controller.create(note)
    }, false)
}
