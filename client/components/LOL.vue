<template>
  <div>
    <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/login'><button @click="logout()" class="button_deconnexion">Déconnexion</button></router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connexion</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>
    <div class="block_jeux_1 lol_image_1">
      <div class="block_text_block_jeux">
        <img data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true" style="width: 501px;height: 199px; margin-bottom:60px; margin-top:10%" class="logo_block_jeux" v-bind:src="'/images/lol_logo.png'"/>
        <div>
          <div class="text_block_jeux">
            <template v-if="!vraioufaux">
              <p style="margin-bottom: 10px;" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Pour apparaitre dans <br>la liste des joueurs</p>
              <button v-on:click="addToListGames(4)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="100" data-aos-once="true"><span>Favori</span></button>
            </template>
            <template v-else>
              <p style="margin-bottom: 10px;" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Pour ne plus apparaitre dans <br>la liste des joueurs</p>    
              <button v-on:click="deleteFromListGames(4)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="100" data-aos-once="true"><span>Supprimer</span></button>
            </template>
            <p style="font-size: 0.9em;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="200" data-aos-once="true">ou</p>
            <p style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="300" data-aos-once="true">Cherche un joueur</p>
            <button v-on:click="navigate(4)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="400" data-aos-once="true"><span>Joueurs</span></button>
          </div>
        </div>
      </div>
      <div class="image_block_lol"></div>
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
    this.afficherBoutonFavori(4);
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
        this.afficherBoutonFavori(4);
  },
  async deleteFromListGames(gameId){
        const res = await axios.put('/api/deleteFromJeux', { userId: this.user.id, gameId: gameId });
        this.afficherBoutonFavori(4);
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



<style>
.lol_image_1 {
  background: linear-gradient(0deg, rgba(21, 21, 21, 0.89), rgba(21, 21, 21, 0.89)), url(/images/lol1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.image_block_lol {
  position: absolute;
  bottom: 0%;
  right: 5%;
  background: url(/images/lol_personnage3.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 1164px;
  height: 687px;
}

.logo_block_jeux {
  margin: auto;
  width: 710px;
  height: 325px;
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
.block_text_block_jeux {
  position: absolute;
  left: 10%;
  top: 15%;
  z-index: 1;
}
</style>