<template>
  <div class="newspaper">
     <h1>Door klimaatverandering wordt Nederland heter, natter én droger</h1>
     <label>Samenvatting</label>
     <p>
       De wereld is nu 1,1 graden warmer dan vóór 1900 en die opwarming kan nog fors oplopen, blijkt uit het maandag verschenen rapport van VN-klimaatpanel IPCC. Daarin is er ook veel aandacht voor regionale verschillen. Zo gaat de temperatuurstijging in Nederland bijna twee keer zo hard als wereldgemiddeld. Blijft dat zo? En wat kan de rest van Europa verwachten voor de toekomst?
     </p>
  </div>
</template>
<script lang="ts" setup>


</script>
<style lang="less" scoped>
.newspaper {

  background: var(--bg);
  padding: 1.5rem 1.5rem 2rem;
  margin: 0 auto;
  // box-shadow: 0 0 0.25rem rgba(#000,0.1);
  border: 2px solid var(--fg);
  width: 32rem;
  max-width: 100%;
  border-radius: 0.25em;
  h1 {
    font-size: 1.5rem; 
    font-family: 'Times New Roman', Times, serif;
    font-family: 'Helvetica-neue', Helvetica, sans-serif;
    font-weight: bold;
    width: 100%;
    max-width: auto;
    padding: 0;
    margin: .5em 0 1em;
    text-align: center;
    line-height: 1.2em;
  }
  label {
    text-align: center;
    text-transform: uppercase;
    font-size:0.6rem;
    opacity: 0.5;
  }
  p {
    font-size: 0.8rem;
    line-height: 1.4em;
    span {
      font-size: 0.6em;
      vertical-align: super;
      opacity: 0.5;
    }
  }
} 
</style>