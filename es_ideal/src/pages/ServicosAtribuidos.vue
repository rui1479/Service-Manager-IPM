<template>
    <NavBar />
    <div class="servios-atribudos">Serviços atribuídos</div>

    <div class="table">
        <serviceAtri-table></serviceAtri-table>
    </div>

    <router-link :to="'/home'" class="back-button">
        <img src="@/assets/back-button.png" alt="Back">
    </router-link>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ServiceAtriTable from '@/components/ServiceAtriTable.vue';

export default {
    name: 'ServicosAtribuidos',
    components: {
        NavBar,
        ServiceAtriTable,
    },

};

</script>

<style scoped>
.servios-atribudos {
    position: relative;
    font-size: 40px;
    line-height: 130%;
    font-family: Inter;
    color: #000;
    text-align: left;
    height: 68px;
    padding-top: 2%;
    padding-left: 10%;

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