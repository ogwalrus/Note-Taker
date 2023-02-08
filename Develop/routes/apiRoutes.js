const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// ROUTING
router.get("/notes", (req, res) => {
  console.log("GET request for notes.");

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Successfully got saved notes.");
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  console.log("POST request for new note.");

  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNote = req.body;
  newNote.id = uuidv4();
  notes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  
  console.log("Successfully added a new note.");
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  console.log("DELETE request to delete note.");

  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNotes = notes.filter((note) => {
    return note.id !== req.params.id;
  });
    
  fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));

  console.log("Successfully deleted a note.");
  res.json(newNotes);
});

module.exports = router;