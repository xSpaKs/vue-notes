import Note from "./components/note";
import { createApp } from "vue";
import router from "./router";

const options = {
    data() {
        return {
            notes: [],
            newNoteTitle: "",
            newNoteContent: "",
        };
    },

    mounted() {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
        }
    },

    methods: {
        addNote() {
            if (this.newNoteTitle != "" && this.newNoteContent != "") {
                this.notes.push({
                    id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
                    title: this.newNoteTitle,
                    content: this.newNoteContent,
                    created: new Date(),
                    updated: new Date(),
                });

                this.newNoteTitle = "";
                this.newNoteContent = "";
            }
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },

        updateNote(updatedNote) {
            const index = this.notes.findIndex(
                (note) => note.id === updatedNote.id
            );

            if (index !== -1) {
                this.notes[index].title = updatedNote.title;
                this.notes[index].content = updatedNote.content;
                this.notes[index].updated = new Date();
            }

            localStorage.setItem("notes", JSON.stringify(this.notes));
        },

        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id !== id);

            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
    },

    components: {
        Note,
    },
};

const app = createApp(options);

app.use(router);

app.mount("#app");
