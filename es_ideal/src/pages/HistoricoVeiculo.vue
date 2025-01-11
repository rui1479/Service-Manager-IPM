<template>
    <NavBar />
    <div class="servios-atribudos">Historico do Veiculo</div>

    <div class="table">
        <historicoVeiculo-table></historicoVeiculo-table>
    </div>

    <button @click="goBack" class="back-button">
        <img src="@/assets/back-button.png" alt="Back">
    </button>
</template>

<script>
import HistoricoVeiculoTable from '@/components/HistoricoVeiculoTable.vue';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'HistoricoVeiculo',
    components: {
        NavBar,
        HistoricoVeiculoTable,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
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