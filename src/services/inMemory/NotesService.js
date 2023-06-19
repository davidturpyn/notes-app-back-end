class NotesService {
  constructor() {
    this.notesServ = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this.notesServ.push(newNote);

    const isSuccess = this.notesServ.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this.notesServ;
  }

  getNoteById(id) {
    const note = this.notesServ.filter((n) => n.id === id)[0];
    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this.notesServ.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this.notesServ[index] = {
      ...this.notesServ[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this.notesServ.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this.notesServ.splice(index, 1);
  }
}

module.exports = NotesService;
