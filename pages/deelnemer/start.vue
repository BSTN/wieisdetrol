<template>
  <div class="start">
    <div class="instructions" v-if="!user.userid">
      <h1><b>Wie is de trol?</b></h1>
      <p>
        Hieronder zie je je gegenereerde gebruikersnaam en icoon. Zo kan je gedurende het spel
        je eigen resultaten herkennen. 
      </p>
      <p class="info">
        <label>Tip:</label> Je kan (nu nog) een andere naam* en icoon genereren door op het
        icoontje te klikken.
      </p>
    </div>
    <UserCreate></UserCreate>
    <p class="footnote" v-if="!user.userid">* De namen zijn gegenereerd met hulp van de <a href="https://www.npmjs.com/package/fantasy-name-generator?activeTab=readme" target="_blank">'fantasy name generator'</a></p>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
</script>
<style lang="less" scoped>
.start {
  background: var(--testbg);
  min-height: 100vh;
  padding-bottom: 2rem;
}
.logo {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  line-height: 1.2em;
  margin: 1em 0 2em;
}

.footnote {
  margin-top: 2rem;
  font-size: 0.6rem;
  color: var(--fg2);
  max-width: calc(100% - 2rem);
  width: 20em;
  line-height: 1.3em;
  margin: 2rem auto 2rem;
  a {
    font-weight: 500;
  }
}
.instructions {
  text-align: center;
  padding: 2rem 1rem;
  width: 20rem;
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
