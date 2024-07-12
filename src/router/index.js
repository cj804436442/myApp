import Vue from "vue";
import Router from "vue-router";
import Student from "../pages/student.vue";
import MainPage from "../pages/mainPage.vue";

Vue.use(Router);

const Login = r => require.ensure([], () => r(require('../pages/login.vue')), 'Login');
const managPages = r => require.ensure([], () => r(require('../pages/managPages/managPages.vue')), 'managPages');
const photoAlbum = r => require.ensure([], () => r(require('../pages/photoAlbum/photoAlbum.vue')), 'photoAlbum');
const rightPart = r => require.ensure([], () => r(require('../pages/managPages/component/rightPart.vue')), 'rightPart');
const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/Student",
      name: "Student",
      component: Student
    },
    {
      path: "/MainPage",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/managPages",
      name: "managPages",
      component: managPages,
      children: [
        // {
        //   path: '',
        //   component: home,
        //   meta: [],
        // },
        {
          path: "/photoAlbum",
          name: "photoAlbum",
          component: photoAlbum
        },
        {
          path: "/rightPart",
          name: "rightPart",
          component: rightPart
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  }
  const user = localStorage.getItem("user")
  if (!user && to.path !== '/') {
    return next("/")
  }
  next()
})

export default router