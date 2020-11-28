const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')
const Fortnite = window.httpVueLoader('./components/Fortnite.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/profil', component: Profil },
    { path: '/fortnite', component: Fortnite }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        user: {}
    },
    async mounted() {
        if (this.user !== undefined) {
            const res1 = await axios.get('/api/me');
            this.user = res1.data
        }
    },
    methods: {
        async addRegister(username, email, password) {
            const res = await axios.post('/api/register', { username: username, email: email, password: password })
            this.user = res.data;
            window.location.href = '#/profil';
        },
        async connect(username, password) {
            const res = await axios.post('/api/login', { username: username, password: password })
            this.user = res.data;
            console.log(this.user);
            window.location.href = '#/profil';
        },
        async logout() {
            window.location.href = "#/";
            this.user = {};
            await axios.get('/api/logout', {})
        }
    }
})