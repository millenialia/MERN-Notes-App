import express from "express";

const router = express.Router() 

import * as NotesController from "../controllers/notesController"

router.get("/", NotesController.getNotes);  

router.get("/:noteId", NotesController.getNote);  

router.post("/", NotesController.createNote);  

router.patch("/:noteId", NotesController.updateNote);  

router.delete("/:noteId", NotesController.deleteNote);  

export default router;