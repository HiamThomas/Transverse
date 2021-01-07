<template>
  <div>
    <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/'>Accueil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
      <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Games</router-link>
    </div>
    <div class="fifa_image_1 block_jeux_1">
      <div class="block_text_block_fifa">
            <img class="logo_block_jeux_fifa" src="../images/fifa_logo.png"/>
            <div>
            <div class="text_block_jeux">
                <p style="margin-bottom: 10px;">Pour dapparaitre dans <br>la liste des joueurs</p>
                <button v-on:click="addToListGames(6)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;"><span>Favori</span></button>
                <p style="font-size: 0.9em;">ou</p>
                <p style="margin-bottom: 10px;">Chercher un joueur</p>
                <button v-on:click="navigate(6)" type="submit" class="btn max_width1 effect01" style="margin-bottom: 10px;"><span>Joueurs</span></button>
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
    };
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
        const res = await axios.post('/api/addToListGames', { userId: this.user.id, gameId: gameId }).then((result) => {
          alert("Ajout dans la liste effectuée");
        }).catch((err) => {
          alert("Jeu déjà ajouter à la liste");
        });
  },
  
},
  async created() {
    const res = await axios.get('/api/games')
    this.games = res.data;
    console.log(this.games);
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
        background: linear-gradient(0deg, rgba(21, 21, 21, 0.89), rgba(21, 21, 21, 0.89)), url(../images/fifa.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .fifa_image_2 {
        background-size: cover;
        background: url(../images/fifa_personnage.png);
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
</style>