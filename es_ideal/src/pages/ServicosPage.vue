<template>
    <div>
        <NavBar />
        <div class="servio-diana">
            <router-link :to="'/servicos-atribuidos/' + mecanicoId" class="back-button">
                <img src="@/assets/back-button.png" alt="Back">
            </router-link>
            <div class="servio-diana-item"></div>
            <router-link :to="'/servico-adicionar/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId">
                <b class="iniciar1">Iniciar</b>
            </router-link>

            <div class="rectangle-div"></div>
            <b class="nome-jos-pereira-container">
                <p class="nome-jos-pereira">Nome: {{ client.nome || 'Nome não disponível' }} </p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">Contacto: {{ client.telefone || 'Telefone não disponível' }} </p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">Email: {{ client.email || 'Email não disponível' }}</p>
            </b>
            <div class="servio-diana-child1"></div>
            <div class="servio-diana-child2"></div>
            <router-link :to="'/historico-veiculo/' + mecanicoId + '/' + clientId + '/' + vehicleId"
                class="marca-opel-modelo-container link">
                <p class="nome-jos-pereira">Matricula: {{ vehicle.id || 'Matrícula não disponível' }} </p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">Tipo de Veículo: {{ vehicle['vehicle-typeId'] }}</p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">
                    <template v-if="vehicle['vehicle-typeId'] === 'eletrico'">
                        Potência: {{ vehicle.potencia }} kW
                    </template>
                    <template
                        v-else-if="vehicle['vehicle-typeId'] === 'gasolina' || vehicle['vehicle-typeId'] === 'gasoleo'">
                        Cilindrada: {{ vehicle.cilindrada }} cc
                    </template>
                    <template v-else>
                        Cilindrada: {{ vehicle.cilindrada }} cc<br>
                        <p class="nome-jos-pereira">&nbsp;</p>
                        Potência: {{ vehicle.potencia }} kW
                    </template>
                </p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">kms: {{ vehicle.kms || 'Kms não disponíveis' }} </p>
            </router-link>
            <b class="servios-substituir-container">
                <p class="nome-jos-pereira">Serviço:</p>
                <p class="blank-line">&nbsp;</p>
                <p class="nome-jos-pereira">- {{ serviceDefinitions.descr }}</p>

            </b>
            <b class="durao-dos-servios">Duração total do serviço: {{ serviceDefinitions.duração }} min</b>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'ServicosPage',
    components: {
        NavBar
    },
    data() {
        return {
            name: 'ServicosPage',
            client: {},
            vehicle: {},
            services: {},
            serviceDefinitions: {},
            mecanicoId: '',
            serviceId: '',
            clientId: '',
            vehicleId: '',
            description: '',
            duration: '',
            servicetype: '',
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`http://localhost:3000/clients/${this.$route.params.clientId}`)
                .then(response => {
                    this.client = response.data;
                })
                .catch(error => {
                    console.error('Error fetching client data', error);
                });

            axios.get(`http://localhost:3000/vehicles/${this.$route.params.vehicleId}`)
                .then(response => {
                    this.vehicle = response.data;
                })
                .catch(error => {
                    console.error('Error fetching vehicle data', error);
                });

                axios.get(`http://localhost:3000/services/${this.$route.params.serviceId}`)
                .then(response => {
                    this.services = response.data;
                    this.servicetype = this.services['service-definitionId'];

                    axios.get(`http://localhost:3000/service-definitions/${this.servicetype}`)
                        .then(response => {
                            this.serviceDefinitions = response.data;
                        })
                        .catch(error => {
                            console.error('Error fetching service definitions', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching services data', error);
                });



            this.mecanicoId = this.$route.params.mecanicoId;
            this.serviceId = this.$route.params.serviceId;
            this.clientId = this.$route.params.clientId;
            this.vehicleId = this.$route.params.vehicleId;
        },

    },
};
</script>

<style>
.link {
    color: black;
    text-decoration: none;
}

.servio-diana-child {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #001f3f;
    width: 1280px;
    height: 69px;
}

.back-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: auto;
    margin-left: 20px;
    margin-top: 20px;
}

.back-button img {
    width: 100%;
    height: auto;
}

.logo-umeeng-sem-nome-1-icon {
    position: absolute;
    top: 14px;
    left: 21px;
    width: 76px;
    height: 41px;
    object-fit: cover;
}

.iniciar {
    position: absolute;
    top: 746px;
    left: 1059px;
    line-height: 130%;
    display: inline-block;
    color: #fff;
    width: 149px;
    height: 36px;
}

.servio-diana-item {
    position: absolute;
    top: 746px;
    left: 85%;
    border-radius: 15px;
    background-color: #000;
    width: 150px;
    height: 53px;
}

.iniciar1 {
    position: absolute;
    top: 763px;
    left: 85%;
    line-height: 130%;
    display: inline-block;
    color: #fff;
    width: 149px;
    height: 36px;
}

.iniciar2 {
    position: absolute;
    top: 746px;
    left: 890px;
    line-height: 130%;
    display: inline-block;
    color: #fff;
    width: 149px;
    height: 36px;
}

.servio-diana-inner {
    position: absolute;
    top: 746px;
    left: 75%;
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 150px;
    height: 53px;
    cursor: pointer;
}

.suspender {
    position: absolute;
    top: 763px;
    left: 75%;
    line-height: 130%;
    display: inline-block;
    width: 149px;
    height: 36px;
}

.wall-clock-icon {
    position: absolute;
    top: 79px;
    left: 1226px;
    width: 38px;
    height: 36px;
    object-fit: cover;
}

.back-button-icon {
    position: absolute;
    top: 83px;
    left: 21px;
    width: 24px;
    height: 25px;
    object-fit: cover;
    cursor: pointer;
}

.rectangle-div {
    position: absolute;
    top: 115px;
    left: 104px;
    border-radius: 15px;
    background-color: #d9d9d9;
    width: 90%;
    height: 148px;
}

.nome-jos-pereira {
    margin: 0;
    white-space: pre-wrap;
    font-weight: bold;
}

.blank-line {
    margin: 0;
}

.nome-jos-pereira-container {
    position: absolute;
    top: 129px;
    left: 127px;
    font-size: 16px;
    display: inline-block;
    text-align: left;
    width: 1033px;
    height: 120px;
}

.servio-diana-child1 {
    position: absolute;
    top: 309px;
    left: 104px;
    border-radius: 15px;
    background-color: #d9d9d9;
    width: 45%;
    height: 437px;
}

.servio-diana-child2 {
    position: absolute;
    top: 309px;
    left: 55%;
    border-radius: 15px;
    background-color: #d9d9d9;
    width: 40%;
    height: 252px;
}

.marca-opel-modelo-container {
    position: absolute;
    top: 324px;
    left: 137px;
    font-size: 16px;
    display: inline-block;
    text-align: left;
    width: 459px;
    height: 399px;
}

.servios-substituir-container {
    position: absolute;
    top: 324px;
    left: 60%;
    font-size: 16px;
    display: inline-block;
    text-align: left;
    width: 408px;
    height: 208px;
}

.durao-dos-servios {
    position: absolute;
    top: 577px;
    left: 60%;
    font-size: 16px;
    display: inline-block;
    text-align: left;
    width: 390px;
    height: 113px;
}

.home-icon {
    position: absolute;
    top: 20px;
    left: 113px;
    width: 28px;
    height: 23px;
    object-fit: cover;
}

.user-icon {
    position: absolute;
    top: 20px;
    left: 1160px;
    width: 26px;
    height: 27px;
    object-fit: cover;
}

.diana {
    position: absolute;
    top: 14px;
    left: 1158px;
    font-size: 12px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 122px;
    height: 41px;
}

.file-icon {
    position: absolute;
    top: 14px;
    left: 1102px;
    width: 34px;
    height: 34px;
    object-fit: cover;
}

.servio-diana {
    width: 100%;
    position: relative;
    background-color: #fff;
    height: 832px;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    color: #000;
    font-family: Inter;
}

.link {
    color: black;
    text-decoration: none;
}
</style>