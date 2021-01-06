<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu white">
        <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>Accueil</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link v-if="user.id == undefined" class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/profil'>Profil</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>About</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link v-if="user.id != undefined" class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/games'>Games</router-link>
      </div>
    </header>
    <section>
        <br><br><br>
        
        
      <div style="margin:10px;">
          <h2 style="color:white">Messages </h2>

        <div class="containers" v-for="msg in messageList" :key="msg.message_id" >
            <div style="color:green" v-if="msg.message_userid == user.id">
                <h4 style="text-align:right">{{msg.message_content}}</h4>
                        <h6 style="text-align:right">{{msg.message_dates }}</h6>
            </div>
            <div v-else>
                <h4>{{msg.message_content}}</h4>
                <h6>{{msg.message_dates }}</h6>
            </div>
        </div>
          <input type="text" placeholder="Veuillez saisir le message à envoyer" :value="message" @input="handleChange">
          <div class="buttons center">
            <div class="size1">
        <button @click="send" class="btn max_width1 effect01">Envoyer</button>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
module.exports = {
  props: {
      user:{type: Object},
  },
  data() {
    return {
        messageList: [],
        message:""
    };
  },
  methods: {
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    },
    async send(){
        if(this.message == ""){
        alert("Message vide !!!")
return
        }
        const res = await axios.post('/api/WriteSimpleMessage', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id,message:this.message }).then(async (result) => {
            alert("message envoyé")
            const res = await axios.post('/api/getSMS', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id }).then((result) => {
            this.messageList = result.data;
            this.message="";
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
        }).catch((err) => {
            alert("Echec lors de l'envoi");
        });
    },
    handleChange(e) {
        this.message = e.target.value
    }
},
  async created() {
       const res = await axios.post('/api/getSMS', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id }).then((result) => {
            this.messageList = result.data;
            console.log(this.messageList);
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
},

};
</script>


<style>
.containers {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
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
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

</style>