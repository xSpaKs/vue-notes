<template>
    <div class="note">
        <input type="text" v-model="currentTitle" />
        <div style="display: flex; gap: 15px">
            <textarea type="text" v-model="currentContent" />
            <p style="white-space: nowrap">Word count : {{ wordCount() }}</p>
        </div>
        <p>Created on : {{ created_at }}</p>
        <p>Last updated on : {{ updated_at }}</p>
        <button @click="updateNote">Update note</button>
        <button @click="deleteNote">Delete note</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            title: "",
            content: "",
            created_at: "",
            updated_at: "",
            currentTitle: "",
            currentContent: "",
        };
    },

    mounted() {
        this.loadNote();
    },

    watch: {
        "$route.params.id": "loadNote",
    },

    methods: {
        loadNote() {
            this.id = this.$route.params.id;

            const savedNotes = localStorage.getItem("notes");
            const notes = JSON.parse(savedNotes);

            const note = notes.find((item) => item.id === this.id);

            this.title = this.currentTitle = note.title;
            this.content = this.currentContent = note.content;
            this.created_at = note.created;
            this.updated_at = note.updated;
        },

        deleteNote() {
            this.$emit("delete-note", this.id);
        },

        updateNote() {
            this.$emit("update-note", {
                id: this.id,
                title: this.currentTitle,
                content: this.currentContent,
            });

            this.loadNote();
        },

        wordCount() {
            return this.content.trim().split(/\s+/).length;
        },
    },
};
</script>
