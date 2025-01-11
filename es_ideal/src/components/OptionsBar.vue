<template>
    <div class="options-bar">
      <button v-if="specialty === 'Motores a combustão' || specialty === 'Geral'"
              @click="onOptionSelected('combustão')">Adicionar Serviço de Motor a Combustão</button>
      <button v-if="specialty === 'Motores elétricos' || specialty === 'Geral'"
              @click="onOptionSelected('electrico')">Adicionar Serviço de Motor Elétrico</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      specialty: String
    },
    methods: {
      onOptionSelected(serviceType) {
        this.$emit('service-selected', serviceType);
      }
    }
  }
  </script>
  
  <style scoped>
  .options-bar {
    background-color: #f4f4f4;
    padding: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .options-bar button {
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  