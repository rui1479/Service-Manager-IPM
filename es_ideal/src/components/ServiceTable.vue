<template>
  <input type="text" v-model="filtroServico" placeholder="Filtrar serviço" class="histrico-de-um-mecanico-child1">
  <div class="tipo-de-servio-container">
    <p class="tipo-de-servio">Tipo de serviço</p>
  </div>
  <div class="service-table-wrapper">
    <table class="service-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th>Veículo</th>
          <th>Serviço</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <tr v-for="(entry, index) in filteredServices" :key="entry.id">
          <td>{{ entry.id }}</td>
          <!-- Replace entry.nome with the name of the client -->
          <td>{{ getClientName(getClientIDFromVehicle(entry.vehicleId)) }}</td>
          <td>{{ entry.vehicleId }}</td>
          <!-- Replace service-definitionId with the corresponding description -->
          <td>{{ getServiceDescription(entry['service-definitionId']) }}</td>
          <td>{{ entry.estado }}</td>
        </tr>
        <tr v-for="index in Math.max(0, 8 - filteredServices.length)" :key="index">
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ServiceTable',
  data() {
    return {
      services: [], 
      serviceDefinitions: [],
      clients: [], 
      vehicles: [],
      filtroServico: '', 
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredServices() {
      return this.services.filter(service => 
        service.estado === 'realizado' && service.mechanic === this.mecanicoId
        && 
        this.getServiceDescription(service['service-definitionId']).toLowerCase().includes(this.filtroServico.toLowerCase())
      );
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

    getClientIDFromVehicle(vehicleId) {
      const vehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId);
      return vehicle ? vehicle.clientId : 'Unknown';
    },

    getClientName(clientId) {
      const client = this.clients.find(client => client.id === clientId);
      return client ? client.nome : 'Unknown';
    }
  }
};
</script>

<style scoped>
.service-table-wrapper {
  overflow-x: auto;
  margin: 20px;
}

.service-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.service-table th,
.service-table td {
  border: 1px solid #ccc;
  padding: 12px;
  min-width: 120px;
}


.service-table thead th {
  background-color: #f2f2f2;
}

.service-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.tipo-de-servio-container {
  position: absolute;
  top: 197px;
  left: 600px;
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
  top: 220px;
  left: 600px;
  border-radius: 10px;
  background-color: #d9d9d9;
  width: 181px;
  height: 21px;
}
</style>
