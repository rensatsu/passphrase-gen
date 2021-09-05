<template>
  <header>
    <h1>
      <a href=".">
        <div class="app-icon"></div>
        Passphrase Generator
      </a>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
header {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h1 > a {
  display: inline-flex;
  align-items: center;
  margin: 0;
  font-size: 1.75rem;
}

.app-icon {
  width: 48px;
  height: 48px;
  background: url("../assets/images/icon48.png");
  background-size: 100%;
  margin: 0 1rem 0 0;
}

a, a:focus, a:hover, a:active, a:visited {
  text-decoration: none;
  color: inherit;
}
</style>
