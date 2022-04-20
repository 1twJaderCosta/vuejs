import { createWebHistory, createRouter } from "vue-router"

import HomePage from "@/pages/HomePage"
import NotFoundPage from "@/pages/NotFoundPage.vue"
import DetailPage from "@/pages/DetailPage.vue"

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },{
    path: '/detail/:id',
    name: "DetailPage",
    component: DetailPage,
  },
  {
    path: '/:catchAll(.*)*',
    name: "NotFoundPage",
    component: NotFoundPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router