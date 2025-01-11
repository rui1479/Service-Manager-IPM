<template>
    <button @click="addService">Submeter</button>
</template>
  
  <script scoped>
  export default {
    methods: {
      addService() {
        const newService = { id: 'new-service-id', descr: 'New Service', duração: 60 };
        
        this.$router.push({ name: 'Table', query: { newService: JSON.stringify(newService) } });
      }
    }
  };
  </script>