<template>
  <div>
    <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/login'><button @click="logout()" class="button_deconnexion">Déconnexion</button></router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connexion</router-link>
      <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>
    <div class="fifa_image_1 block_jeux_1">
      <div class="block_text_block_fifa">
            <img data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true" class="logo_block_jeux_fifa" v-bind:src="'/images/fifa_logo.png'"/>
            <div>
            <div class="text_block_jeux">
              <template v-if="!vraioufaux">
                <p style="margin-bottom: 10px;" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Pour dapparaitre dans <br>la liste des joueurs</p>
                <button v-on:click="addToListGames(6)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="100" data-aos-once="true"><span>Favori</span></button>
                </template>
                <template v-else>
                  <p style="margin-bottom: 10px;" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Pour ne plus apparaitre dans <br>la liste des joueurs</p>
                <button v-on:click="deleteFromListGames(6)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="100" data-aos-once="true"><span>Supprimer</span></button>
              </template>
                <p style="font-size: 0.9em;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="200" data-aos-once="true">ou</p>
                <p style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="300" data-aos-once="true">Cherche un joueur</p>
                <button v-on:click="navigate(6)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="400" data-aos-once="true"><span>Joueurs</span></button>
            </div>
            </div>
        </div>
        <div class="image_block_jeux_fifa fifa_image_2"></div>
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
        games: [],
        vraioufaux: false,
    };
  },
  mounted(){
    this.afficherBoutonFavori(6);
  },
  
  methods: {
    logout(){
       this.$emit('logout')
    },
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    },
    navigate(id){
        window.location.href = '#/Tchat/'+id;
    },
async addToListGames(gameId){
        const res = await axios.post('/api/addToListGames', { userId: this.user.id, gameId: gameId });
        this.afficherBoutonFavori(6);
  },
  async deleteFromListGames(gameId){
        const res = await axios.put('/api/deleteFromJeux', { userId: this.user.id, gameId: gameId });
        this.afficherBoutonFavori(6);
  },
  async afficherBoutonFavori(gameId) {
    
    if (this.user !== undefined){
      const res = await axios.post('/api/getSiJeuxFavori', { userId: this.user.id, gameId: gameId  });
      this.vraioufaux = res.data.length !== 0;
    }
    else
      this.vraioufaux = false;
  },
},
  async created() {
    const res = await axios.get('/api/games')
    this.games = res.data;
  },

};
</script>

<style scoped>
.block_text_block_fifa{
  position: absolute;
  left: 18%;
  top: 8%;
  z-index: 1;
}

.fifa_image_1 {
  background: linear-gradient(0deg, rgba(21, 21, 21, 0.89), rgba(21, 21, 21, 0.89)), url(/images/fifa.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fifa_image_2 {
  background-size: cover;
  background: url(/images/fifa_personnage.png);
  background-position: center;
  background-repeat: no-repeat;
}
.image_block_jeux_fifa{
  position: absolute;
  bottom: 0%;
  right: 0%;
  width: 886px;
  height: 921px;
  background-size: 100%;
}
.logo_block_jeux_fifa {
  margin: auto;
  margin-bottom: 30px;
  margin-top: 10%;
  width: 445px;
  height: 302px;
}
.block_jeux_1 {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.text_block_jeux {
  font-style: normal;
  font-weight: bold;
  font-size: 1.4em;
  line-height: 49px;
  color: #FFFFFF;
  margin: auto;
  text-align: center;
}
</style>