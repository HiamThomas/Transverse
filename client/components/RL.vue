<template>
  <div>
    <div class="block_button_menu">
      <p @click="logout()" class="button_menu" data-aos="fade-right">Deconnexion</p>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
      <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Games</router-link>
    </div>
    <div class="rl_image_1 block_jeux_1">
      <div class="block_text_block_jeux">
            <img class="logo_block_jeux_rl" src="../images/rl_logo.png"/>
            <div>
            <div class="text_block_jeux">
              <template v-if="!vraioufaux">
                <p style="margin-bottom: 10px;">Pour apparaitre dans <br>la liste des joueurs</p>
                <button v-on:click="addToListGames(2)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;"><span>Favori</span></button>
                </template>
                <template v-else>
                  <p style="margin-bottom: 10px;">Pour ne plus apparaitre dans <br>la liste des joueurs</p>
                <button v-on:click="deleteFromListGames(2)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;"><span>Supprimer</span></button>
              </template>
                <p style="font-size: 0.9em;">ou</p>
                <p style="margin-bottom: 10px;">Chercher un joueur</p>
                <button v-on:click="navigate(2)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;"><span>Joueurs</span></button>
            </div>
            </div>
        </div>
        <div class="image_block_jeux_rl rl_image_2"></div>
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
    this.afficherBoutonFavori(2);
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
        this.afficherBoutonFavori(2);
  },
  async deleteFromListGames(gameId){
        const res = await axios.put('/api/deleteFromJeux', { userId: this.user.id, gameId: gameId });
        this.afficherBoutonFavori(2);
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
    .rl_image_1 {
        background: linear-gradient(0deg, rgba(21, 21, 21, 0.89), rgba(21, 21, 21, 0.89)), url(../images/rl.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .rl_image_2 {
        background: url(../images/rl_voiture.png);
        background-position: center;
        background-repeat: no-repeat;
    }
    .image_block_jeux_rl{
        position: absolute;
        bottom: 0%;
        right: 0%;
        width: 930px;
        height: 700px;
        background-size: 100%;
    }
    .logo_block_jeux_rl {
    margin: auto;
    margin-bottom: 30px;
    width: 800px;
    height: 300px;
}
</style>