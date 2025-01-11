<template>
  <div class="suspenso">
    <div class="overlap-2">
      <p class="ID-do-servi-o">
        <span class="span">ID do serviço em realização: </span>
        <span class="text-wrapper-4">{{ this.serviceId }}</span>
      </p>
    </div>
  </div>
  <div class="servicosAAdicionar-table-wrapper">
    <table class="servicosAAdicionar-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Duração (min)</th>
        </tr>
      </thead>
      <tbody>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <tr v-for="(entry, index) in filteredServices" :key="entry.id">
          <td>{{ entry.descricao }}</td>
          <td>{{ entry.duracao }}</td>
        </tr>
        <tr v-for="index in Math.max(0, 8 - filteredServices.length)" :key="index">
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
    <div class="servio-diana-item"></div>
    <router-link :to="'/servicos-atribuidos/' + mecanicoId">
      <b  v-on:click="concluir()" class="iniciar1">Concluir</b>
    </router-link>
    <div class="servio-item"></div>
    <div>
      <template v-if="getVehicleType(vehicleId) === 'hibrido'">
        <router-link :to="'/servicos-hib' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId">
          <b class="iniciar2">Adicionar serviço</b>
        </router-link>
      </template>
      <template v-else-if="getVehicleType(vehicleId) === 'gasolina'">
        <router-link :to="'/servicos-gasolina' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId">
          <b class="iniciar2">Adicionar serviço</b>
        </router-link>
      </template>
      <template v-else-if="getVehicleType(vehicleId) === 'gasoleo'">
        <router-link :to="'/servicos-gasoleo' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId">
          <b class="iniciar2">Adicionar serviço</b>
        </router-link>
      </template>
      <template v-else>
        <router-link :to="'/servicos-elet' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId">
          <b class="iniciar2">Adicionar serviço</b>
        </router-link>
      </template>
    </div>
  </div>

  <router-link :to="'/service/' + mecanicoId + '/' + serviceId + '/' + clientId + '/' + vehicleId " class="back-button">
        <img src="@/assets/back-button.png" alt="Back">
  </router-link>
  <div class="servio-diana-inner" id="rectangle2"></div>
<router-link :to="'/suspenso/' + mecanicoId + '/' + serviceId" class="suspender link">
    Suspender
</router-link>
</template>


<script>
import axios from 'axios';

export default {
  name: 'HistoricoVeiculoTable',
  data() {
    return {
      services: [], 
      serviceDefinitions: [], 
      clients: [],
      vehicles: {}, 
      filtroServico: '',
      mecanicoId: '',
      serviceId: '',
      clientId: '',
      sortDirection: 'asc',
      
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredServices() {
  return this.services.filter(service =>
    service.estado && service.id === this.serviceId && service.estado !== 'realizado'
  ).flatMap(service => {
    const mainService = {
      descricao: this.getServiceDescription(service['service-definitionId']),
      duracao: this.getServiceDuration(service['service-definitionId'])
    };

    const additionalServices = service['servicos_adicionais'].map(additionalServiceId => ({
      descricao: this.getServiceDescription(additionalServiceId),
      duracao: this.getServiceDuration(additionalServiceId)
    }));

    return [mainService, ...additionalServices];
  });
}

  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/services')
        .then(response => {
          this.services = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the services', error);
        });

      axios.get('http://localhost:3000/service-definitions')
        .then(response => {
          this.serviceDefinitions = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the service definitions', error);
        });

      axios.get('http://localhost:3000/clients')
        .then(response => {
          this.clients = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the clients', error);
        });

      axios.get('http://localhost:3000/vehicles')
        .then(response => {
          this.vehicles = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the vehicles', error);
        });

      this.mecanicoId = this.$route.params.mecanicoId;
      this.serviceId = this.$route.params.serviceId;
      this.vehicleId = this.$route.params.vehicleId;
      this.clientId = this.$route.params.clientId;


    },
    getServiceDescription(serviceId) {
      const service = this.serviceDefinitions.find(service => service.id === serviceId);
      return service ? service.descr : 'Unknown';
    },

    getServiceDuration(serviceId) {
      const service = this.serviceDefinitions.find(service => service.id === serviceId);
      return service ? service.duração : 'Unknown';
    },

    getClientIDFromVehicle(vehicleId) {
      const vehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId);
      return vehicle ? vehicle.clientId : 'Unknown';
    },

    getClientName(clientId) {
      const client = this.clients.find(client => client.id === clientId);
      return client ? client.nome : 'Unknown';
    },

    getClientId(clientId) {
      const client = this.clients.find(client => client.id === clientId);
      return client ? client.id : 'Unknown';
    },

    getServiceAdditionals(serviceId) {
      const service = this.services.find(service => service.id === serviceId);
      return service ? service.adicionais : 'Unknown';
    },

    getVehicleType(vehicleId) {
      if (Array.isArray(this.vehicles)) {
        let vehicle = this.vehicles.find(v => v.id === vehicleId);
        console.log('vehicle:', vehicle);
        console.log('vehicle.type:', vehicle ? vehicle['vehicle-typeId'] : null);
        return vehicle ? vehicle['vehicle-typeId'] : null;
      } else {
        console.error('this.vehicles is not an array');
        return null;
      }
    },

    concluir() {
    axios.patch(`http://localhost:3000/services/${this.serviceId}`, {
      estado: 'realizado'
    })
    .then(response => {
      console.log('Estado do serviço atualizado:', response.data);
    })
    .catch(error => {
      console.error('Erro ao atualizar o estado do serviço:', error);
    });
  },

  }
};
</script>


<style scoped>
.servicosAAdicionar-table-wrapper {
  overflow-x: auto;
  margin: 20px;
}

.servicosAAdicionar-table {
  width: 80%;
  border-collapse: collapse;
  text-align: left;
  margin-left: 10%;
  margin-top: 13%;
}

.servicosAAdicionar-table th,
.servicosAAdicionar-table td {
  padding: 12px;
}

.servicosAAdicionar-table thead th {
  background-color: #f2f2f2;
}

.servicosAAdicionar-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.servio-diana-inner {
    position: absolute;
    top: 726px;
    left: 84%;
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
    top: 743px;
    left: 84%;
    line-height: 130%;
    display: inline-block;
    width: 149px;
    height: 36px;
}

.link {
    color: black;
    text-decoration: none;
}
.tipo-de-servio-container {
  position: absolute;
  top: 24%;
  left: 15%;
  line-height: 130%;
  font-weight: 600;
  display: inline-block;
  width: 143px;
  height: 21px;
}

.tipo-de-servio {
  margin: 0;
}

.histrico-de-um-mecanico-child1 {
  position: absolute;
  top: 27%;
  left: 15%;
  border-radius: 10px;
  background-color: #d9d9d9;
  width: 181px;
  height: 21px;
}



.router-link {
  display: inline-block;
  width: 100%;
}

.ordenadar-por {
  position: absolute;
  top: 215px;
  left: 50%;
  font-size: 18px;
  line-height: 130%;
  font-weight: 600;
  display: inline-block;
  width: 178px;
  height: 45px;
}

.rectangle-div {
  position: absolute;
  top: 217px;
  left: 60%;
  border-radius: 10px;
  background-color: #d9d9d9;
  width: 114px;
  height: 27px;
}

.durao {
  position: absolute;
  top: 218px;
  left: 60%;
  font-size: 18px;
  line-height: 130%;
  font-weight: 600;
  display: inline-block;
  width: 97px;
  height: 21px;
}

.suspenso {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.suspenso .div {
  background-color: #ffffff;
  height: 832px;
  position: relative;
  width: 1280px;
}

.suspenso .p {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 45px;
  letter-spacing: 0;
  line-height: 41.6px;
  position: absolute;
  top: 80px;
  width: 708px;
}

.suspenso .reason-textarea {
  border: 2px solid;
  border-color: #000000;
  border-radius: 4px;
  color: #00000066;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 26px;
  font-weight: 600;
  height: 410px;
  left: 121px;
  position: absolute;
  top: 250px;
  width: 1021px;
  padding: 10px;
  resize: none;
}

.suspenso .overlap-2 {
  border: 2px solid;
  border-color: #000000;
  border-radius: 4px;
  height: 83px;
  left: 121px;
  position: absolute;
  top: 150px;
  width: 280px;
}

.suspenso .ID-do-servi-o {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 26px;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

.suspenso .span {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 26px;
}

.suspenso .text-wrapper-4 {
  text-decoration: underline;
}

.suspenso .submit-button {
  background-color: #000000;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  font-family: "Inter-Bold", Helvetica;
  font-size: 15px;
  font-weight: 700;
  height: 54px;
  padding: 0 20px;
  position: absolute;
  bottom: 90px;
  right: 50px;
}

.servio-diana-item {
  position: absolute;
  top: 726px;
  left: 1253px;
  border-radius: 15px;
  background-color: #000;
  width: 150px;
  height: 53px;
}

.iniciar1 {
  position: absolute;
  top: 742px;
  left: 1253px;
  line-height: 130%;
  display: inline-block;
  color: #fff;
  width: 149px;
  height: 36px;
}

.servio-item {
  position: absolute;
  top: 200px;
  left: 1253px;
  border-radius: 15px;
  background-color: #D9D9D9;
  width: 220px;
  height: 33px;
}

.iniciar2 {
  position: absolute;
  top: 205px;
  left: 1278px;
  line-height: 130%;
  display: inline-block;
  color: black;
  width: 149px;
  height: 36px;
}

.back-button {
  position: absolute; 
  top: 0; 
  left: 0;
  width: 30px;
  height: auto;
  margin-left: 20px;
  margin-top: 80px;
}

.back-button img {
  width: 100%; 
  height: auto; 
}
</style>
