<template>
  <div id="app">
    <img alt="Ethereum logo" src="./assets/ethereumLogo.png" width="205" height="342" />
    <HelloWorld msg="Welcome to Your Ethereum App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "EthereumApp",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
