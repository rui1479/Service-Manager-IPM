<template>
    <NavBar />

    <div class="table">
        <servicosAAdicionar-table></servicosAAdicionar-table>
    </div>

    
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ServicosAAdicionarTable from '@/components/ServicosAAdicionarTable.vue';

export default {
    name: 'ServicosAAdicionar',
    components: {
        NavBar,
        ServicosAAdicionarTable,
    },

};

</script>

<style scoped>

</style>