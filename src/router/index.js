import { createRouter, createWebHistory } from "vue-router";
import Note from "@/components/note";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/note/:id",
            component: Note,
        },
    ],
});

export default router;
