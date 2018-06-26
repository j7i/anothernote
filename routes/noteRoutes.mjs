import express from 'express'
import {notesController} from './../controllers/notesController'

const router = express.Router()

router.get("/notes/", notesController.getAllNotes.bind(notesController))
router.post("/notes/", notesController.createNote.bind(notesController))
router.get("/notes/:id/", notesController.getNote.bind(notesController))
router.put("/notes/:id/", notesController.updateNote.bind(notesController))

export const noteRoutes = router