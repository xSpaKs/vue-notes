<template>
    <div style="display: grid; grid-template-columns: 1fr 1fr">
        <div>
            <form @submit.prevent="addNote">
                <div>
                    <label for="name">Name of the note</label>
                    <input type="text" name="name" v-model="newNoteTitle" />
                </div>
                <div>
                    <label for="content">Content of the note</label>
                    <input
                        type="text"
                        name="content"
                        v-model="newNoteContent"
                    />
                </div>
                <input type="submit" value="Create new note" />
            </form>
            <div>
                <h3>List of notes</h3>
                <router-link
                    style="display: flex; flex-direction: column"
                    v-for="note in notes"
                    :to="{
                        name: 'Note',
                        params: {
                            id: note.id,
                        },
                    }"
                >
                    {{ note.title }}
                </router-link>
            </div>
        </div>
        <router-view @delete-note="deleteNote" @update-note="updateNote">
        </router-view>
    </div>
</template>

<script>
import Note from "./Note.vue";
export default {
    data() {
        return { notes: [], newNoteTitle: "", newNoteContent: "" };
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
            this.$router.push("/");
        },
    },
    components: { Note },
};
</script>
