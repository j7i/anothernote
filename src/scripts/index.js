import NoteService from './services/noteService.js';

class IndexController {
    constructor() {
        this._noteService = new NoteService();
    }

    _render(notes) {
        const notesArea = document.querySelector('.notes__inner')

        for(let note of notes) {
            console.log(note)
            let itemMarkup = `
                <div data-id="${note._id}" class="note-item${note.state == 'PENDING' ? '' : ' note-item--done'}">
                    <div class="note-item__description">
                        <h3 class="note-item__title">
                            <i class="material-icons">${note.state == 'PENDING' ? 'check_box_outline_blank' : 'check_box_done'}</i> ${note.title}
                        </h3>
                        <p class="note-item__content">${note.content}</p>
                    </div>
                    <div class="note-item__importance">
                        <i class="material-icons">star</i>
                    </div>
                    <a href="#">
                        <div class="note-item__edit">
                            <i class="material-icons">edit</i>
                        </div>
                    </a>
                </div>
            `
            
            notesArea.insertAdjacentHTML('afterbegin', itemMarkup)
        }
    }

    async create(note) {
        const notes = await this._noteService.create(note);
    }
    
    async updateView() {
        const notes = await this._noteService.getAllNotes();
        this._render(notes);
    }

}

//controller
const controller = new IndexController();
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
