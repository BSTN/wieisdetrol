<template>
  <div class="group-chapter-8" v-if="!group.loading">
    <div class="text">
      <h1>Bedankt voor het meedoen!</h1>
      <p>
        Je hebt nu zelf kunnen ervaren hoe complex het werk van een moderator
        is. In werkelijkheid is het nog een tandje moeilijker: bij nu.nl komen
        dagelijks zo'n 33 duizend reacties binnen, die verwerkt worden door
        momenteel 3 moderatoren. Je kunt je dus wel voorstellen dat ze AI hard
        nodig hebben.
      </p>
      <p>
        Wil je meer lezen?<br />
        <a target="_blank" href="https://www.wie-is-de-trol.nl/lees-meer"
          >www.wie-is-de-trol.nl/lees-meer</a
        >.
      </p>
      <p>
        Wil je deze les aanraden aan vrienden en/of familie?<br />
        <a target="_blank" href="https://www.wie-is-de-trol.nl"
          >www.wie-is-de-trol.nl</a
        >
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
</script>
<style lang="less" scoped>
.group-chapter-8 {
  padding: 4rem;
}
.text {
  width: 34rem;
  max-width: calc(100% - 2rem);
  margin: 0 auto;
  p {
    margin-bottom: 1em;
  }
}
</style>
