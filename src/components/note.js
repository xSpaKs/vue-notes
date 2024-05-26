export default {
    props: ["id", "title", "content", "created", "updated"],
    data() {
        return {
            currentTitle: this.title,
            currentContent: this.content,
        };
    },

    methods: {
        deleteNote() {
            this.$emit("delete-note", this.id);
            console.log(this.id);
        },

        updateNote() {
            this.$emit("update-note", {
                id: this.id,
                title: this.currentTitle,
                content: this.currentContent,
            });
        },
    },

    template: `
    
    <div class="note">
        <p>{{id}}</p>
        <input type="text" v-model="currentTitle"/>
        <input type="text" v-model="currentContent"/>
        <p>Created on : {{created}}</p>
        <p>Last updated on : {{updated}}</p>
        <button @click="updateNote">Update note</button>
        <button @click="deleteNote">Delete note</button>
    </div>
    
    `,
};
