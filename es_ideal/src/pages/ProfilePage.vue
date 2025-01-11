<template>
    <NavBar />
    <div class="perfil">
        <div class="div">
            <div class="overlap-group">
                <div class="element">
                    <div class="diogo-wrapper">
                        <div class="diogo">{{ mechanic.nome }}</div>
                    </div>
                </div>
                <img class="user" src="@/assets/profile.png" />
                <div class="rectangle-2"></div>
                <router-link :to="'/profile/' + userId">
                    <img class="imagem" src="@/assets/p.png" alt="">
                </router-link>
                <div class="rectangle-4"></div>
                <router-link :to="'/servicos-realizados/' + userId">
                    <img class="imagem-2" src="@/assets/serviços.png" alt="">
                </router-link>

            </div>
            <div class="perfil">
                <div class="nome-diogo-idade-wrapper">
                    <div class="nome-diogo-idade">
                        <p>
                            <span class="span"><strong>Nome:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.nome }}</span>
                            <span class="span"><strong>Idade:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.idade }}</span>
                            <span class="span"><strong>Profissão:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.profissao }}</span>
                        </p>
                        <p>
                            <span class="span"><strong>Localização:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.localizacao }}</span>
                            <span class="span"><strong>Educação:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.educacao }}</span>
                        </p>
                        <p>
                            <span class="span"><strong>Especialização:</strong></span>
                            <span class="text-wrapper-6">{{ mechanic.especializacao }}</span>
                        </p>
                        <p>
                            <span class="span"><strong>Interesses:</strong></span>
                            <span class="text-wrapper-6">
                                <span v-for="(interesse, index) in mechanic.interesses" :key="index">
                                    {{ interesse }}
                                    <span v-if="index < mechanic.interesses.length - 1">, </span>
                                </span>
                            </span>
                        </p>
                        <p>
                            <span class="span"><strong>Objetivos:</strong></span>
                            <span class="text-wrapper-6">
                                <span v-for="(objetivos, index) in mechanic.objetivos" :key="index">
                                    {{ objetivos }}
                                    <span v-if="index < mechanic.objetivos.length - 1">, </span>
                                </span>
                            </span>
                        </p>
                        <p>
                            <span class="span"><strong>Desafios:</strong></span>
                            <span class="text-wrapper-6">
                                <span v-for="(desafios, index) in mechanic.desafios" :key="index">
                                    {{ desafios }}
                                    <span v-if="index < mechanic.desafios.length - 1">, </span>
                                </span>
                            </span>
                        </p>
                        <p>
                            <span class="span"><strong>Soluções:</strong></span>
                            <span class="text-wrapper-6">
                                <span v-for="(solucoes, index) in mechanic.solucoes" :key="index">
                                    {{ solucoes }}
                                    <span v-if="index < mechanic.solucoes.length - 1">, </span>
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>


            <div class="de-wrapper">
                <p class="de">
                    "{{ mechanic.citacao }}"
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'ProfilePage',
    components: {
        NavBar
    },

    data() {
        return {
            userId: null,
            mechanic: {
                nome: '',
                idade: '',
                profissao: '',
                localizacao: '',
                educacao: '',
                especializacao: '',
                interesses: '',
                objetivos: '',
                desafios: '',
                solucoes: '',
                citacao: ''
            }
        };
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'LogIn' });
        } else {
            let userId = JSON.parse(user).id;
            try {
                let result = await axios.get(`http://localhost:3000/mechanics/${userId}`);
                this.userId = userId;
                if (result.data) {
                    let userData = result.data;
                    if (userData.perfil) {
                        this.mechanic.nome = userData.perfil.nome;
                        this.mechanic.idade = userData.perfil.idade;
                        this.mechanic.profissao = userData.perfil.profissao;
                        this.mechanic.localizacao = userData.perfil.localizacao;
                        this.mechanic.educacao = userData.perfil.educacao;
                        this.mechanic.especializacao = userData.perfil.especializacao;
                        this.mechanic.interesses = userData.perfil.interesses;
                        this.mechanic.objetivos = userData.perfil.objetivos;
                        this.mechanic.desafios = userData.perfil.desafios;
                        this.mechanic.solucoes = userData.perfil.solucoes;
                        this.mechanic.citacao = userData.perfil.citacao;
                    } else {
                        console.error('User data does not contain perfil information.');
                    }
                } else {
                    console.error('No data found for the logged-in user.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }



};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap');
@import url('https://fonts.googleapis.com');
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Roman&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css');



.perfil {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.perfil .div {
    background-color: #ffffff;
    max-width: 1280px;
    width: 100%;
    height: auto;
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
}

.perfil .overlap {
    position: absolute;
    width: 1280px;
    height: 70px;
    top: -1px;
    left: 0;
}

.perfil .file {
    position: absolute;
    width: 34px;
    height: 34px;
    top: 18px;
    left: 976px;
    object-fit: cover;
}

.perfil .text-wrapper {
    width: 97px;
    height: 69px;
    top: 0;
    left: 104px;
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #ffffff;
    font-size: 12px;
    position: absolute;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
}

.perfil .text-wrapper-2 {
    position: absolute;
    width: 168px;
    top: 46px;
    left: 1056px;
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 19.5px;
    white-space: nowrap;
}

.perfil .text-wrapper-3 {
    width: 122px;
    height: 41px;
    top: 14px;
    left: 1094px;
    font-size: 12px;
    position: absolute;
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
}

.perfil .logo-UMEENG-sem-nome {
    position: absolute;
    width: 76px;
    height: 41px;
    top: 15px;
    left: 21px;
    object-fit: cover;
}

.perfil .rectangle {
    position: absolute;
    width: 1280px;
    height: 69px;
    top: 1px;
    left: 0;
    background-color: #001f3f;
}

.perfil .emergency-exit {
    position: absolute;
    width: 28px;
    height: 31px;
    top: 17px;
    left: 1224px;
    object-fit: cover;
}

.perfil .home {
    position: absolute;
    width: 28px;
    height: 23px;
    top: 25px;
    left: 127px;
    object-fit: cover;
}

.perfil .overlap-group {
    position: absolute;
    width: 252px;
    height: 400px;
    top: 160px;
    left: 59px;
}

.perfil .element {
    position: absolute;
    width: 252px;
    height: 400px;
    top: 0;
    left: 0;
}

.perfil .diogo-wrapper {
    position: relative;
    width: 250px;
    height: 400px;
    background-color: #001f3f80;
    border-radius: 4px;
    box-shadow: 0px 4px 4px #0000004c;
}

.perfil .diogo {
    width: 218px;
    height: 65px;
    top: 193px;
    left: 16px;
    font-size: 18px;
    position: absolute;
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
}

.perfil .user {
    position: absolute;
    width: 157px;
    height: 157px;
    top: 36px;
    left: 47px;
    object-fit: cover;
}

.perfil .rectangle-2 {
    position: absolute;
    width: 250px;
    height: 49px;
    top: 351px;
    left: 0;
    background-color: #d9d9d9;
    border: 1px solid;
    border-color: #00000080;
}

.perfil .img {
    position: absolute;
    width: 241px;
    height: 49px;
    top: 302px;
    left: 9px;
}

.perfil .imagem {
    width: 247px;
    height: 51px;
    top: 299px;
    left: 4px;
    position: absolute;
    object-fit: cover;
    cursor: pointer;
}

.perfil .imagem-2 {
    width: 250px;
    height: 49px;
    top: 351px;
    left: 0;
    position: absolute;
    object-fit: cover;
    cursor: pointer;
    outline: black;
}

.perfil .text-wrapper-4 {
    position: absolute;
    width: 62px;
    height: 18px;
    top: 314px;
    left: 28px;
    font-family: "Inter-ExtraLight", Helvetica;
    font-weight: 200;
    color: #000000;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
    cursor: pointer;
}

.perfil .text-wrapper-4:hover {
    position: absolute;
    width: 41px;
    height: 20px;
    top: 315px;
    left: 41px;
    background-color: #f7f7f7;
}

.perfil .text-wrapper-5 {
    width: 182px;
    height: 21px;
    top: 364px;
    left: 10px;
    font-family: "Inter-ExtraLight", Helvetica;
    font-weight: 200;
    color: #000000;
    font-size: 14px;
    position: absolute;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
    cursor: pointer;
}

.perfil .text-wrapper-5:hover {
    position: absolute;
    width: 152px;
    height: 23px;
    top: 366px;
    left: 34px;
    background-color: #ffffff;
}

.perfil .nome-diogo-idade-wrapper {
    position: absolute;
    width: 727px;
    height: 358px;
    top: 300px;
    left: 437px;
    background-color: #d9d9d9;
    border-radius: 15px;
}

.perfil .nome-diogo-idade {
    position: absolute;
    top: 27px;
    left: 7px;
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #000000;
    font-size: 16px;
    letter-spacing: 0;
    width: 95%;
}

.perfil .span {
    font-family: "Inter-Regular", Helvetica;
    font-weight: 400;
    color: #000000;
    font-size: 16px;
    letter-spacing: 0;
    padding-right: 10px;
}

.perfil .text-wrapper-6 {
    font-family: "Inter-ExtraLight", Helvetica;
    font-weight: 200;
    padding-right: 40px;
    padding-top: 20px;
}

.perfil .de-wrapper {
    position: absolute;
    width: 727px;
    height: 140px;
    top: 160px;
    left: 437px;
    background-color: #001f3f80;
    border-radius: 15px;
}

.perfil .de {
    position: absolute;
    width: 680px;
    top: 12px;
    left: 21px;
    font-family: "Inter-ExtraLight", Helvetica;
    font-weight: 200;
    color: #000000;
    font-size: 16px;
    letter-spacing: 0;
    line-height: normal;
}

.nome-diogo-idade-wrapper {
    font-family: "Inter-Regular", Helvetica;
    font-size: 16px;
    color: #000000;
    margin-top: 20px;
}

.nome-diogo-idade {
    margin-bottom: 10px;
}

.info {
    margin-right: 20px;
}
</style>
