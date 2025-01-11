<template>
  <input type="text" v-model="filtroServico" placeholder="Filtrar serviço" class="histrico-de-um-mecanico-child1">
  <div class="tipo-de-servio-container">
    <p class="tipo-de-servio">Tipo de serviço</p>
  </div>
  <div class="historicoVeiculo-table-wrapper">
    <table class="historicoVeiculo-table">
      <thead>
        <tr>
          <th>Serviço</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <tr v-for="(entry, index) in filteredServices" :key="entry.id">
          <td>{{ getServiceDescription(entry['service-definitionId']) }}</td>
          <td>{{ getServiceDuration(entry['service-definitionId']) }}</td>
        </tr>
        <tr v-for="index in Math.max(0, 8 - filteredServices.length)" :key="index">
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
      vehicles: [], 
      filtroServico: '', 
      mecanicoId: '',
      servicoId: '',
      sortDirection: 'asc',
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredServices() {
      const vehicleId = this.$route.params.vehicleId;
      return this.services.filter(service =>
        service.estado === 'realizado' &&
        service.vehicleId === vehicleId &&
        this.getServiceDescription(service['service-definitionId']).toLowerCase().includes(this.filtroServico.toLowerCase())
      )
      .sort((a, b) => {
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

    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },

    
  }
};
</script>

<style scoped>
.historicoVeiculo-table-wrapper {
  overflow-x: auto;
  margin: 20px;
}

.historicoVeiculo-table {
  width: 80%;
  border-collapse: collapse;
  text-align: left;
  margin-left: 10%;
  margin-top: 7%;
}

.historicoVeiculo-table th,
.serviceAtri-table td {
  padding: 12px;
}

.historicoVeiculo-table thead th {
  background-color: #f2f2f2;
}

.historicoVeiculo-table tbody tr:nth-child(odd) {
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
</style>
