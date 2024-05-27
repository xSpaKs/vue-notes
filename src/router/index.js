import { createRouter, createWebHistory } from "vue-router";
import Note from "@/components/Note.vue";
import Empty from "@/components/Empty.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Empty",
            component: Empty,
        },
        {
            path: "/note/:id",
            name: "Note",
            component: Note,
            props: true,
        },
    ],
});

export default router;
