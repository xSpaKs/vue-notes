<template>
    <div class="note">
        <p>{{ id }}</p>
        <p>Word count : {{ wordCount }}</p>
        <input type="text" v-model="currentTitle" />
        <input type="text" v-model="currentContent" />
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
        },
    },

    computed: {
        wordCount() {
            return this.content.trim().split(/\s+/).length;
        },
    },
};
</script>
