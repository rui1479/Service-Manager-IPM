<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue'; // Make sure to replace './components/NavBar' with the correct path to your NavBar component file

export default {
    name: 'ServicosElet',
    data() {
    return {
      selectedBoxes: [], // Variable to store the currently selected box
      services: [],
      servicesList: [], // This will hold the data from db.json
      vehicleTypes: [], // This will hold the service definitions
      listServ: [],
      operation: '', // Variable to store the selected operation
      listServ1 : [],
      listServ2 : [],
      fullServiceList: [], // Array to hold full service list
      vehicleId: '', // Filtro para o serviço
      mecanicoId: '',
      serviceId: '',
      clientId: '',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Fetch services
      axios.get('http://localhost:3000/vehicle-types') // Get all vehicle types
        .then(response => {
          this.vehicleTypes = response.data;
          this.listServ = this.findElet(this.vehicleTypes).serviços;
          
        })
        .catch(error => {
          console.error('There was an error fetching the services', error);
        });

      // Fetch service definitions
      axios.get('http://localhost:3000/service-definitions')
        .then(response => {
          this.services = response.data;
          this.getFullServiceList(this.listServ)
          this.splitList(this.fullServiceList);

        })
        .catch(error => {
          console.error('There was an error fetching the service definitions', error);
        });

        // Fetch service definitions
      axios.get('http://localhost:3000/services')
        .then(response => {
          this.servicesList = response.data;

        })
        .catch(error => {
          console.error('There was an error fetching the service definitions', error);
        });

      this.mecanicoId = this.$route.params.mecanicoId;
      this.serviceId = this.$route.params.serviceId;
      this.vehicleId = this.$route.params.vehicleId;
      this.clientId = this.$route.params.clientId;
    },

    splitList(list) {
        const halfwayThrough = Math.ceil(list.length / 2);
        this.listServ1 = list.slice(0, halfwayThrough);
        this.listServ2 = list.slice(halfwayThrough);
      },

    selectOp(boxElement, service) {
      const index = this.selectedBoxes.indexOf(service);
      if (index === -1) {
        // Add the service to selectedBoxes if not already selected
        this.selectedBoxes.push(service);
      } else {
        // Remove the service from selectedBoxes if already selected
        this.selectedBoxes.splice(index, 1);
      }
      console.log(this.selectedBoxes);

      // Toggle 'selected' class on the clicked box
      boxElement.classList.toggle('selected');
    },


    submitOp() {
    if (!this.serviceId) {
      alert('Nenhum serviço selecionado para atualizar.');
      return;
    }

    if (this.selectedBoxes.length === 0) {
      alert('Nenhum serviço selecionado para adicionar.');
      return;
    }

    // Find the service in the services list based on this.serviceId
    const serviceToUpdate = this.servicesList.find(service => service.id === this.serviceId);

    if (serviceToUpdate) {
      // Extract the IDs of the selected services
      const selectedServiceIds = this.selectedBoxes.map(service => service.id);

      // Filter out the IDs that already exist in servicos_adicionais or service-definitionId
      const newServiceIds = selectedServiceIds.filter(id => {
        return !serviceToUpdate['servicos_adicionais'].includes(id) && id !== serviceToUpdate['service-definitionId'];
      });

      // Check if there are new service IDs to add
      if (newServiceIds.length > 0) {
        // If servicos-adicionais already exists and is an array, append the selected service IDs to it
        if (Array.isArray(serviceToUpdate['servicos-adicionais'])) {
          // Append the filtered service IDs to the existing list
          serviceToUpdate['servicos_adicionais'].push(...newServiceIds);
        } else {
          // If servicos-adicionais doesn't exist or is not an array, create a new array with the selected service IDs
          serviceToUpdate['servicos_adicionais'] = newServiceIds;
        }

        // Send a request to the backend to update the servicos-adicionais attribute of the service in the database
        axios.patch(`http://localhost:3000/services/${this.serviceId}`, {
          servicos_adicionais: serviceToUpdate['servicos_adicionais']
        })
        .then(response => {
          console.log('Additional services updated for the service in the database:', response.data);
          // Optionally, you can update the UI or perform further actions here
        })
        .catch(error => {
          console.error('Error updating additional services for the service in the database:', error);
          // Handle errors accordingly
        });
      } else {
        console.log('All selected services are either already in servicos_adicionais or the main service.');
      }
    } else {
      console.error('Service not found in the services list:', this.serviceId);
    }
  },


    findElet(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === 'eletrico') {
          return array[i];
        }
      }
      return null; // Retorna null se não encontrar nenhum objeto com id 'eletrico'
    },
    findServiceById(id) {
    return this.services.find(service => service.id === id);
  },
    getFullServiceList(serviceIds) {
      serviceIds.forEach(id => {
        const service = this.findServiceById(id);
        if (service) {
          this.fullServiceList.push(service);
        }
      });
  },

  },
  components: {
    NavBar // Make sure to import NavBar correctly
  },
};

</script>

<template>
    <NavBar />
    <div id="mainpage">
        <h1 id="tipo">Adicionar serviço de elétrico</h1>
        <h1 id="info">Selecione os serviços que pretende adicionar</h1>

        <main id="side">
        <ul class="categories-list">
             <li class="box" v-for="service in listServ1" :key="service.id" :class="{ 'selected': selectedBoxes === service.descr }" v-on:click="selectOp($event.target, service)">{{ service.descr }}</li>
        </ul>
        </main>

        <main id="main">
          <ul class="categories-list">
            <li class="box" v-for="service in listServ2" :key="service.id" :class="{ 'selected': selectedBoxes === service.descr }" v-on:click="selectOp($event.target, service)">{{ service.descr }}</li>
        </ul>
        </main>


        <router-link :to="'/servico-adicionar' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId" id="submit" class="box2">
        <main  v-on:click="submitOp()">
          <p>Submeter</p>
        </main>
        </router-link>
    </div>

    <router-link  :to="'/servico-adicionar' + '/' + mecanicoId + '/' + serviceId + '/' + vehicleId + '/' + clientId" class="back-button">
        <img src="@/assets/back-button.png" alt="Back">
    </router-link>
</template>





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
        "tipo   tipo     tipo    .           ."
        "info  info     info   info       ."
        "  .   side     .    main        ."
        "  .   .        .           .    submit";
    grid-template-rows: 50px 65px 50px 20% 20%;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
    gap: 0px;
}

#main {
    grid-area: main;
}

#submit {
    grid-area: submit;
}

#tipo {
    grid-area: tipo;
}

#info {
    grid-area: info;
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

#tipo {
    display: flex;
    flex-direction:row;
    align-items: center;
    color: black;
    font-weight: bold;
    margin-left: 90px;
    font-family: Montserrat;
}

#info {
    display: flex;
    flex-direction: row;
    color: black;
    font-family: Montserrat;
    font-weight: 200;
    margin-top: 60px;
    margin-left: 80px;
}


#side {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-top: 30%;
}

#submit {
    display: flex;
    flex-direction: column;
    padding: 0;
    color: white;
    font-size: 15px;
    font-family: Montserrat;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 20px;
    word-wrap: break-word;
    align-items: center;
    margin-right: 100px;
    margin-left: 80px;
}

#submit p {
    margin-top: 15px;
  }

.box {
    width: 500px;
    height: 50px;
    background-color: lightslategray;
    border-radius: 7px;
    margin-bottom: 20px;
    cursor: pointer;
}


.box2 {
    width: 300px;
    height: 50px;
    background-color: #000;
    border-radius: 7px;
    margin-bottom: 20px;
}

.selected {
    background-color: #001F3F; /* Change to desired color */
}



.categories-list {
    list-style: none;
    padding: 0;
    color: white;
    font-size: 15px;
    font-family: Montserrat;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 20px;
    word-wrap: break-word
}

.categories-list li {
    padding-top: 0.5rem;
    margin-bottom: 50px; 
    padding-bottom: 0.5rem;
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
    margin-left: 10px;
    margin-top: 30%;
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

.back-button {
  position: absolute; /* Position the link absolutely within .servio-diana */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  width: 30px; /* Set the width to something smaller */
  height: auto; /* Keep the aspect ratio of the image */
  margin-left: 20px;
  margin-top: 80px;
}

.back-button img {
  width: 100%; /* Make the image follow the size of its container */
  height: auto; /* Maintain aspect ratio */
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
            "tipo"
            "info"
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

