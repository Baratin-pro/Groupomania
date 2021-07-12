<template>
  <header class="header">
    <h1 class="header__title">Groupomania</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderCpt",
};
</script>

<style  scoped>
.header {
  display: flex;
  height: 80px;
  background-color: rgba(55, 55, 156, 1);
}
.header__title {
  display: block;
  margin: auto;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 1.3em;
  background-color: rgba(55, 55, 156, 1);
}
@media only screen and (min-width: 900px) {
  .header__title {
    font-size: 1.7em;
  }
}
</style>