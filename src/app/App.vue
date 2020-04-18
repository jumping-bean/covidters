<template>
  <div id="app">
    <b-navbar type="light">
      <b-navbar-brand href="index.html">App</b-navbar-brand>  
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="../index.html">Home</b-nav-item>
            <b-nav-item href="../login.html">Login</b-nav-item>
            <b-nav-item href="../terms.html">Terms of Use</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar> 
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>