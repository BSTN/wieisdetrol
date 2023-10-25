<template>
  <div class="start">
    <div class="instructions" v-if="!user.userid">
      <h1>Welkom bij<Br />Wie is de trol?</h1>
      <p>
        Hieronder zie je je gegenereerde gebruikersnaam en icoon. Zo kan je
        je resultaten herkennen gedurende het spel.
      </p>
      <p class="info">
        <label>Tip:</label> Je kan (nu nog) een andere naam en icoon genereren door op het
        icoontje te klikken.
      </p>
    </div>
    <UserCreate></UserCreate>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
</script>
<style lang="less" scoped>
.start {
  background: var(--testbg);
  min-height: 100vh;
}

.instructions {
  
  width: 20rem;
  max-width: 100%;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  line-height: 1.2em;
  margin: 1em 0;
}
.instructions {
  text-align: center;
  padding: 1rem 1rem;
  // width: 30rem;
  max-width: 100%;
  margin: 0 auto;
  :deep(p) {
    margin-bottom: 1em;
    text-align: left;
    // font-size: 0.8rem;
  }
}
.info {
  font-size:0.8rem;
  label {
    padding: 0;
  }
}
</style>
