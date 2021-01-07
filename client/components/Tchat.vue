<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu">
      <p @click="logout()" class="button_menu" data-aos="fade-right">Deconnexion</p>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Games</router-link>
    </div>
    </header>
    <section>
        <div class="liste">
            <div class="containers" v-for="u in users" :key="u.id" >
                <router-link :to="{name: 'Message', params: {id: u.id,gameid: $route.params.id}}" style="text-decoration:none">
                    <img v-bind:src="u.photo" alt="Avatar" style="width:100%;">
                    <div class="text">
                        <p style="font-size:2em"> {{u.username}}</p>
                        <p style="opacity:0.8">{{u.email}}</p>
                        <p style="opacity:0.8">{{u.nationality}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
  </div>
</template>

<script>

module.exports = {
  props: {
      user:{type: Object}
  },
  data() {
    return {
        users: [],
    };
  },
  methods: {
    logout(){
       this.$emit('logout')
    },
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    },
},
  async created() {
    const res = await axios.post('/api/getAllUserByGames', { userId: this.user.id, gameId: this.$route.params.id }).then((result) => {
            this.users = result.data;
            console.log(this.users);
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
  },

};
</script>



<style scoped>
.liste{
    margin-left: 5%;
    margin-right: 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.containers {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px; 
  min-width: 350px;
  min-height: 120px;
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 70px;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.containers::after {
  content: "";
  clear: both;
  display: table;
}

.containers img {
  float: left;
  max-width: 120px;
  max-height: 120px;
  width: 100%;
  border-radius: 50%;
  vertical-align: middle;
  border: solid;
  border-color: black;
}

.text{
    margin:0;
    margin-top: 10px;
    color: black;
    text-align:center;
}
</style>