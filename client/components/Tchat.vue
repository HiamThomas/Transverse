<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu" style="text-shadow:none">
      <p @click="logout()" class="button_menu_black" data-aos="fade-right">Déconnexion</p>
      <p class="button_menu_black" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu_black" data-aos="fade-right" data-aos-delay="100" to='/login'>Connexion</router-link>
        <router-link v-else class="button_menu_black" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu_black" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu_black" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>
    </header>
    
    <div class="left_block_login">
        <section>
          <br>
          <br>
          <br>
          <div class="liste">
            <div class="containers" v-for="u in users" :key="u.id" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
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
    
    <div class="right_block_login">
      <div class="text_block_left_login">
        <h1 class="titre_login_left" data-aos="fade-left">Vous cherchez quelqu'un?</h1>
        <p class="paragraphe_right" data-aos="fade-up" data-aos-delay="100">Sélectionner un utilisateur pour communiquer avec lui.</p>
      </div>
    </div>
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
    justify-content: center;
}
.containers {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 15px;
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