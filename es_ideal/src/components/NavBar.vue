<template>
    <nav id="nav">
        <div class="logos">
            <img src="@/assets/uminho.jpg" alt="" style="width: 80px">
            <router-link to="/home">
                <img src="@/assets/home.png" alt="" style="width: 30px; margin-left: 10px;">
            </router-link>
        </div>
        <router-link to="login" class="exit">
            <img v-on:click="exit" src="@/assets/exit.png" alt="" style="width: 30px; border-radius: 30%">
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    methods: {
        exit() {
            localStorage.removeItem('user-info');
            this.$router.push({ name: 'LogIn' });
        }

    }
}
</script>

<style scoped>
#nav {
    grid-area: nav;
    display: flex;
    background-color: #001F3F;
    flex-direction: row;
    justify-content: space-between;
}

#nav img {
    margin: 10px 10px;
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
</style>
