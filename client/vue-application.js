const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')
const Fortnite = window.httpVueLoader('./components/Fortnite.vue')
const Rl = window.httpVueLoader('./components/RL.vue')
const Amongus = window.httpVueLoader('./components/AmongUs.vue')
const Lol = window.httpVueLoader('./components/Lol.vue')
const Counterstrike = window.httpVueLoader('./components/CounterStrike.vue')
const Fifa = window.httpVueLoader('./components/Fifa.vue')
const Games = window.httpVueLoader('./components/Games.vue')
const Tchat = window.httpVueLoader('./components/Tchat.vue')
const Message = window.httpVueLoader('./components/Message.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/profil', component: Profil },
    { path: '/game/1', component: Fortnite },
    { path: '/game/2', component: Rl },
    { path: '/game/3', component: Amongus },
    { path: '/game/4', component: Lol },
    { path: '/game/5', component: Counterstrike },
    { path: '/game/6', component: Fifa },
    { path: '/games', component: Games },
    { path: '/tchat/:id', component: Tchat },
    {
        path: '/message/:id/:gameid',
        name: 'Message',
        component: Message,
    }
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
            this.user = {};
            await axios.get('/api/logout', {})
            window.location.href = "#/";
        },
        async modifierInfo(editingProfil) {
            await axios.put('/api/modifierInfo/' + this.user.id, editingProfil)
            this.user.age = editingProfil.age;
            this.user.nationality = editingProfil.nationality;
            this.user.language = editingProfil.language;
            this.user.discord = editingProfil.discord;
            this.user.main_game = editingProfil.main_game;
            this.user.pseudo_game = editingProfil.pseudo_game;
            this.user.description = editingProfil.description;
            this.user.photo = editingProfil.photo;
            this.user.games = editingProfil.games;
            console.log(this.user);
        },
        async Games(games) {
            const res = await axios.get('/api/games')
            games = res.data;
            console.log(games);
            window.location.href = '#/games';
        }
    }
})