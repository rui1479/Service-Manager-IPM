<template>
    <div class="content">
      <div class="text">AUTENTICAÇÃO</div>
      <form @submit.prevent="login">
        <div class="fields">
          <div class="field">
            <input type="text" v-model="username" required>
            <label>Nrº funcionário</label>
          </div>
          <div class="field">
            <input type="password" v-model="password" required>
            <label>Password</label>
          </div>
        </div>
        <button type="submit" @click="logIn">LOGIN</button>
      </form>
      <div v-if="showError" class="popup">
        <p>Falha ao fazer Login. Por favor verifique o seu username e a sua password.</p>
        <button @click="closePopup">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LogIn',
    data() {
      return {
        username: '',
        password: '',
        showError: false,
      };
    },
    methods: {
      async logIn() {
        if (!this.username || !this.password) {
          console.error('Please enter both username and password');
          return;
        }
        try {
          let result = await axios.get(
            `http://localhost:3000/mechanics?username=${this.username}&password=${this.password}`
          );
          console.warn('result', result);
          if (result.status === 200 && result.data.length > 0) {
            localStorage.setItem('user-info', JSON.stringify(result.data[0]));
            this.$router.push({ name: 'HomePage' });
          } else {
            this.showError = true; 
          }
        } catch (error) {
          console.error('Error during login:', error);
          this.showError = true; 
        }
      },
      closePopup() {
        this.showError = false;
      },
      mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
          this.$router.push({ name: 'HomePage' });
        }
      },
    },
  };
  </script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

html,
body {
    height: 100%;
    width : 100%;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 10;
}
.popup button {
  margin-top: 10px;
}

.content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 30px;
    background: #001F3F;
}
.content .text {
    width: 100;
    font-size: 47px;
    font-weight: 600;
    margin-bottom: 35px;
    color: #ffffff;
    font-family: Montserrat;
    text-transform: uppercase;
    word-wrap: break-word;
}

.field {
    height: 50px;
    width: 85%;
    display: flex;
    position: relative;
    margin: 15px 0;
}

.field:nth-child(2) {
    margin-top: 20px;
}

.field input {
    height: 100%;
    width: 100%;
    padding-left: 45px;
    outline: none;
    border: none;
    font-size: 18px;
    background: #dde1e7;
    color: #595959;
    border-radius: 7px;
    box-shadow: inset 2px 2px 5px #BABECC,
        inset -5px -5px 10px #ffffff73;
}

.field input:focus {
    box-shadow: inset 1px 1px 2px #BABECC,
        inset -1px -1px 2px #ffffff73;
}

.field span {
    position: absolute;
    color: #595959;
    width: 50px;
    line-height: 50px;
}

.field label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 45px;
    pointer-events: none;
    color: #666666;
}

.field input:valid~label {
    opacity: 0;
}

.forgot-pass a {
    font-size: 16px;
    color: #3498db;
    text-decoration: none;
}

.forgot-pass:hover a {
    text-decoration: underline;
}

button {
    margin: 15px 0;
    width: 85%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 600;
    background: #dde1e7;
    border-radius: 7px;
    border: none;
    outline: none;
    cursor: pointer;
    color: #595959;
}

button:focus {
    color: #3498db;
    box-shadow: inset 2px 2px 5px #BABECC,
        inset -5px -5px 10px #ffffff73;
}

.sign-up a {
    color: #3498db;
    text-decoration: none;
}

.sign-up a:hover {
    text-decoration: underline;
}

.fields {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
