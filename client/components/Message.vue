<template onload="scroll()">
    <div>
        <div>
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
        </div>
        <body onload="scroll()">
            <section style="height:100%">
                <br>
                <div style="margin:8%">
                    <div class="background_tchat">
                        <h2 style="color:white">Messages </h2>
                        <div id="block_tchat">
                            <div class="containers" v-for="msg in messageList" :key="msg.message_id" onload="scroll()">
                                <div style="color:green" v-if="msg.message_userid == user.id">
                                    <h4 style="text-align:right">{{msg.message_content}}</h4>
                                    <h6 style="text-align:right">{{msg.message_dates }}</h6>
                                </div>
                                <div v-else>
                                    <h4>{{msg.message_content}}</h4>
                                    <h6>{{msg.message_dates }}</h6>
                                </div>
                            </div>
                            <br><br><br>
                        </div>

                        <input class="input_message" type="text" placeholder="Veuillez saisir le message à envoyer" :value="message" @input="handleChange">
                        <div class="buttons center" style="height:50px">
                            <button @click="send" class="btn max_width1 effect01">Envoyer</button>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    </div>
</template>

<script>
    function scroll() {
        console.log("feza");
        var elem = document.getElementById('block_tchat');
        elem.scrollTop = elem.scrollHeight;
    }
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
      
    logout(){
       this.$emit('logout')
    },
    
    async send(){
        if(this.message == ""){
        alert("Message vide !!!")
return
        }
        const res = await axios.post('/api/WriteSimpleMessage', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id,message:this.message }).then(async (result) => {
        const res = await axios.post('/api/getSMS', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id }).then((result) => {
        this.messageList = result.data;
        this.message="";
        scroll();
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
        const res = await axios.post('/api/getAllUserByGames', { userId: this.user.id, gameId: this.$route.params.id }).then((result) => {
            this.users = result.data;
            console.log(this.users);
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
       const res2 = await axios.post('/api/getSMS', { userId: this.user.id, gameId: this.$route.params.gameid,receiverid:this.$route.params.id }).then((result) => {
            this.messageList = result.data;
            console.log(this.messageList);
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
},

};

</script>


<style scoped>
.containers {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-right: 18px;
  
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

.input_message{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 30px;
}

.input_message:focus {
  border: 3px solid black;
}

#block_tchat{
    overflow-y: scroll;
    width: 100%;
    height: 65%;
    
}
.background_tchat{
    background: rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 15px;
    position: relative;
}

</style>