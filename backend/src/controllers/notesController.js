import Note from "../models/Note.js";

export const getAllNotes = async (req,res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        // .sort({createdAt: -1}) optional chain method - sorts the notes by createdAt key of the json response.

        // if you don't provide a status code, 200 is taken as default
        res.status(200).json(notes);
    } catch (error) {
        console.error("error in getAllNotes controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}

export const getNoteById = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id);
        return res.status(200).json(note);
    } catch (error) {
        console.error("error in getNoteById controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const note = new Note({title: title, content: content});

        /* 
        since the key and value pairs have same name, one can simply write - 

        const newNote = new Note({title, content});
        */
        const savedNote = await note.save();
        // res.status(201).json({message: "note created successfully"});
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('error in createNote controller:', error);
        res.status(500).json({message: "internal server error"});
    } 
}

export const updateNote = async (req,res) => {
    try {
        const {title, content} = req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content});
        
        if (!updatedNote) {
            res.status(404).json({message: "note not found"});
        } else {
            res.status(200).json({message: "note updated successfully", updatedNote});
        }

        
        /*
        .findByIdAndUpdate(id, values, options, callback)
        1. id: identifier of document/row you want to update

        2. values: object containing fields and new values

        3. options (optional): object containing additional functionalities:
                a. "new: true" - returns updated doc instead of original one
                b. upsert: true - creates document if doesn't exist
                
        4. callback fn (optional) - for handling result, can be used in place of await or .then()
        */

        
        // res.status(200).json({message: "note updated successfully"});
    } catch (error) {
        console.error("error in updateNote controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}

export const deleteNote = async (req,res) => {
    try {
         const deletedNote = await Note.findByIdAndDelete(req.params.id);

         if (!deletedNote) return res.status(404).json({message: "note not found"});

         res.status(200).json({message: "note deleted successfully", deletedNote});
    } catch (error) {
        console.error("error in deleteNote controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}