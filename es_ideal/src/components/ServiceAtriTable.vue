<template>
  <input type="text" v-model="filtroServico" placeholder="Filtrar serviço" class="histrico-de-um-mecanico-child1">
  <div class="tipo-de-servio-container">
    <p class="tipo-de-servio">Tipo de serviço</p>
  </div>
  <div class="serviceAtri-table-wrapper">
    <table class="serviceAtri-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th>Veículo</th>
          <th>Serviço</th>
          <th>Duração</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <tr v-for="(entry, index) in filteredServices" :key="entry.id">
          <router-link
            :to="'/service/' + mecanicoId + '/' + entry.id + '/' + getClientId(getClientIDFromVehicle(entry.vehicleId)) + '/' + entry.vehicleId"
            class="router-link">
            <td>{{ entry.id }}</td>
          </router-link>
          <!-- Replace entry.nome with the name of the client -->
          <td>{{ getClientName(getClientIDFromVehicle(entry.vehicleId)) }}</td>
          <router-link
            :to="'/historico-veiculo/' + mecanicoId + '/' + getClientId(getClientIDFromVehicle(entry.vehicleId)) + '/' + entry.vehicleId"
            class="router-link">
            <td>{{ entry.vehicleId }}</td>
          </router-link>
          <!-- Replace service-definitionId with the corresponding description -->
          <td>{{ getServiceDescription(entry['service-definitionId']) }}</td>
          <td>{{ getServiceDuration(entry['service-definitionId']) }}</td>
          <td @click.prevent="showAble(entry)">{{ entry.estado }}</td>
          
        </tr>
        <tr v-for="index in Math.max(0, 8 - filteredServices.length)" :key="index">
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
    <div class="ordenadar-por">Ordenadar por: </div>
    <div class="rectangle-div">
    </div>
    <div class="durao" @click="toggleSortDirection">
      Duração {{ sortDirection === 'asc' ? '↑' : '↓' }}
    </div>
  </div>

  <div v-if="showError" class="popup">
            <h3>Serviço: {{ service.id }}</h3>
            <p>{{ service.descrição }}</p>
            <button @click="closePopup">Fechar</button>
          </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'ServiceAtriTable',
  data() {
    return {
      services: [], 
      serviceDefinitions: [], 
      clients: [], 
      vehicles: [], 
      filtroServico: '',
      mecanicoId: '',
      servicoId: '',
      sortDirection: 'asc',
      showError: false,
      service: '',

    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredServices() {
      return this.services.filter(service =>
        service.estado && service.mechanic === this.mecanicoId && service.estado !== 'realizado' &&
        this.getServiceDescription(service['service-definitionId']).toLowerCase().includes(this.filtroServico.toLowerCase())
      ).sort((a, b) => {
        const durationA = this.getServiceDuration(a['service-definitionId']);
        const durationB = this.getServiceDuration(b['service-definitionId']);
        return this.sortDirection === 'asc' ? durationA - durationB : durationB - durationA;
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
      this.servicoId = this.$route.params.servicoId;

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

    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },

    showAble(service) {
      this.showError = true;
      this.service = service;
    },

    closePopup() {
      this.showError = false;
    },


  }
};
</script>

<style scoped>
.serviceAtri-table-wrapper {
  overflow-x: auto;
  margin: 20px;
}

.serviceAtri-table {
  width: 80%;
  border-collapse: collapse;
  text-align: left;
  margin-left: 10%;
  margin-top: 7%;
}

.serviceAtri-table th,
.serviceAtri-table td {
  padding: 8px;
}

.serviceAtri-table thead th {
  background-color: #f2f2f2;
}

.serviceAtri-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
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

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 10; 
}
.popup button {
  margin-top: 10px;
}
</style>
