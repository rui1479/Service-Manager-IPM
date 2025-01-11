<template>
  <NavBar />
  <button @click="goBack" class="back-button">
    <img src="@/assets/back-button.png" alt="Back">
  </button>
  <div class="suspenso">
    <div class="div">
      <p class="p">Suspensão do tratamento do veículo</p>
      <div class="overlap-2">
        <p class="ID-do-servi-o">
          <span class="span">ID do serviço: </span>
          <span class="text-wrapper-4">{{ this.serviceId }}</span>
        </p>
      </div>
      <div class="overlap">
        <textarea v-model="suspensaoMotivo" class="reason-textarea"
          placeholder="Digite o motivo da suspensão ..."></textarea>
      </div>
      <button @click="suspenderServico" class="submit-button">Submeter</button>
    </div>
  </div>
</template>


<script scoped>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      services: [],
      serviceDefinitions: [],
      clients: [],
      vehicles: [],
      filtroServico: '',
      mecanicoId: '',
      serviceId: '',
      clientId: '',
      vehicleId: '',
      suspensaoMotivo: ''
    };
  },
  created() {
    this.fetchData();
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
    },
    suspenderServico() {
  const serviceToUpdate = this.services.find(service => service.id === this.serviceId);
  if (!serviceToUpdate) {
    console.error('Service not found.');
    return;
  }

  serviceToUpdate.estado = 'parado';
  if (serviceToUpdate.descrição) {
    serviceToUpdate.descrição += ` | ${this.suspensaoMotivo}`;
  } else {
    serviceToUpdate.descrição = this.suspensaoMotivo;
  }

  axios.put(`http://localhost:3000/services/${this.serviceId}`, serviceToUpdate)
    .then(response => {
      console.log('Service suspended successfully:', response.data);
      this.$router.push(`/servicos-atribuidos/${this.mecanicoId}`);
    })
    .catch(error => {
      console.error('Error suspending service:', error);
    });
},



    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>





<style>
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
  height: 63px;
  left: 121px;
  position: absolute;
  top: 150px;
  width: 250px;
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