import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './components/App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Quote from './components/Quote.vue'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// Route config
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/quote',
    component: Quote
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new Router({
  routes // es6 syntax routes: routes
})

// For every new route scroll to the top of the page
router.beforeEach((from, to, next) => {
  window.scrollTo(0, 0)
  next()
})

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
