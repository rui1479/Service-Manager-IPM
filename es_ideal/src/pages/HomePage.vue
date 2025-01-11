<template>
    <NavBar />
    <div id="mainpage">
        <name id="name">
            <h1>E.S.Ideal</h1>
        </name>
        <main id="side">
            <ul class="categories-list">
                <router-link :to="/servicos-atribuidos/ + userId" class="link">
                    <li class="box">Serviços atribuídos</li>
                </router-link>
                <router-link :to="'/servicos-realizados/' + userId" class="link">
                    <li class="box">Histórico de Serviços realizados</li>
                </router-link>
            </ul>
        </main>

        <main id="main">
            <div class="card">
                <div class="imagem">
                    <img src="@/assets/profile.png" alt="">
                </div>
                <div class="text">
                    <h4><strong>Nome</strong>: {{ mechanic.nome }}</h4>
                    <h4><strong>Idade</strong>: {{ mechanic.idade }}</h4>
                    <h4><strong>Profissão</strong>: {{ mechanic.profissao }}</h4>
                    <h4><strong>Localização</strong>: {{ mechanic.localizacao }}</h4>
                    <h4><strong>Especialização</strong>: {{ mechanic.especializacao }}</h4>
                </div>
                <router-link :to="'/profile/' + userId" class="ver">
                    <h4>Ver mais</h4>
                </router-link>

            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';


export default {
    computed: {
        name: 'HomePage',
    },

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
                let response = await axios.get(`http://localhost:3000/mechanics/${userId}`);
                if (response.data) {
                    let userData = response.data;
                    this.userId = userId;
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
}
</script>
<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    color: white;
}

body {
    background: white;
}


#mainpage {
    display: grid;
    background-color: var(--background-color);
    grid-template-areas:
        "nav   nav    nav   nav   nav"
        "  .   .      name   main   ."
        "  .   side     .    main   ."
        "  .   side     .    main   ."
        "  .    .       .    main   .";
    grid-template-rows: 50px 5% auto auto auto;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
    gap: 20px;
}

#main {
    grid-area: main;
}

#name {
    grid-area: name;
}

#side {
    grid-area: side;
}

#nav {
    grid-area: nav;
    display: flex;
    background-color: #001F3F;
    flex-direction: row;
    justify-content: space-between;
}

#nav img {
    margin: 10px 10px;
}

.logos {
    display: flex;
    align-items: center;
}

.logos p {
    font-weight: bold;
    margin-left: 15px;
}

.exit {
    display: flex;
    align-items: center;
}

#name {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    font-style: italic;
    font-family: Luxurious Roman;
}

.link {
    color: white;
    text-decoration: none;
}

#name h1 {
    font-size: 80px;
    font-weight: 400;
    word-wrap: break-word;
    align-items: center;
    justify-content: center;
}

#side {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 40%;
    margin-top: 30%;
}

.box {
    width: 300px;
    background-color: #001F3F;
    border-radius: 7px;
    margin-bottom: 20px;
}

.categories-list {
    list-style: none;
    padding: 0;
    color: white;
    font-size: 12px;
    font-family: Montserrat;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 20px;
    word-wrap: break-word
}

.categories-list li {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    transition: color 0.3s;
    text-align: center;
}

.categories-list li:hover {
    color: var(--accent-color-dark);
}

#main {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #001F3F;
    opacity: 0.6;
    margin-top: 30%;
    width: 90%;
    height: 90%;
}

.card {
    width: 80%;
    padding: auto;
    border-radius: 7px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.imagem {
    text-align: center;
}

.card img {
    width: 35%;
    height: 30%;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 1em;
    border-radius: 50%;
    object-fit: cover;
}

.card img:hover {
    transform: scale(1.1);
}

.card h4 {
    color: white;
    font-size: 14px;
    font-family: Inter;
    font-weight: 400;
    word-wrap: break-word;
    margin-left: 1em;
}

.container {
    padding: 2px 16px;
}

.ver {
    cursor: pointer;
    color: white;
    font-size: 20px;
    font-family: Inter;
    font-style: italic;
    font-weight: 400;
    text-decoration: underline;
    word-wrap: break-word;
    text-align: center;
}

#menu {
    width: 50px;
    height: 50px;
    background-color: var(--accent-color);
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

@media only screen and (max-width: 850px) {
    #app {
        display: grid;
        background-color: var(--background-color);
        grid-template-areas:
            "nav"
            "main"
            "side"
            "section"
            "footer";
        grid-template-rows: 50px auto auto auto 100px;
        grid-template-columns: 1fr;
    }

    #main {
        margin-left: 20px;
        margin-right: 20px;
    }

    .section {
        margin-left: 20px;
        margin-right: 20px;
    }

    .side {
        margin-left: 20px;
        margin-right: 20px;
    }

    #footer {
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>