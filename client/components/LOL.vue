<template>
  <div>
    <div class="block_button_menu">
      <p @click="logout()" class="button_menu" data-aos="fade-right">Déconnexion</p>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connexion</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>
    <div class="block_jeux_1 lol_image_1">
      <div class="block_text_block_jeux">
        <img data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true" style="width: 501px;height: 199px; margin-bottom:60px; margin-top:10%" class="logo_block_jeux" src="../images/lol_logo.png"/>
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
</style>