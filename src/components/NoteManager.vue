<template>
    <div
        style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            padding-top: 100px;
        "
    >
        <div>
            <form @submit.prevent="addNote">
                <div>
                    <label for="name">Name of the note</label>
                    <input type="text" name="name" v-model="newNoteTitle" />
                </div>
                <div>
                    <label for="content">Content of the note</label>
                    <textarea
                        style="width: 350px"
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
                    created: this.formattedDate(),
                    updated: this.formattedDate(),
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
                this.notes[index].updated = this.formattedDate();
            }
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id !== id);
            localStorage.setItem("notes", JSON.stringify(this.notes));
            this.$router.push("/");
        },

        formattedDate() {
            return new Date().toLocaleString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
    },
    components: { Note },
};
</script>
