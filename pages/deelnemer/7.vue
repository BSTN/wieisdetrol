<template>
  <div class="user-chapter-7">
    <user-pause v-if="user.finished.includes('chapter7') ||
      (!user.showResults.includes('chapter7') &&
        !user.started.includes('chapter7'))
      "></user-pause>
    <div class="try" v-if="user.started.includes('chapter7')">
      <div class="question">
        Kan jij de bot verslaan? Je mag zo vaak proberen als je wilt, de beste
        reactie wordt automatisch jouw reactie en daarmee je score op het
        scorebord!
      </div>
      <div class="input">
        <div class="hidden">{{ input }}</div>
        <textarea v-model="input"></textarea>
      </div>
      <div class="loading" v-if="loading">Aan het verzenden...</div>
      <div class="buttons">
        <button @click="send()">verstuur</button>
      </div>
      <label v-if="options.length > 0"><b>Hieronder zie je al je reacties (gesorteerd op hoogste score):</b></label>
      <div class="options" v-for="item in options">
        <div class="commentbox">
          <div class="score">
            Volgens de bot: {{ Math.round(item.score * 100) }}% constructief
          </div>
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
const input = ref("");
const error = ref("");
const loading = ref(false);
const all = ref([]);
const options = computed(() => {
  const alltxt = JSON.parse(JSON.stringify(all.value));
  alltxt.sort((a, b) => b.score - a.score);
  return alltxt;
});
const URL = useRuntimeConfig().public.URL
async function send() {
  error.value = "";
  loading.value = true;
  // const url =
  //   window && window.location.href.match("localhost")
  //     ? "http://localhost/beatthebot"
  //     : "https://api.wie-is-de-trol.nl/beatthebot";
  const url = `https://${URL.replace(/^https\:\/\//,'')}/beatthebot`;
  const data = await $fetch(url, {
    method: "POST",
    body: { text: input.value, userid: user.userid, groupid: user.groupid },
  }).catch((err) => {
    console.warn(err);
    error.value =
      "Er is iets mis gegaan. Probeer nog een keer of probeer een andere tekst.";
    setTimeout(() => {
      error.value = "";
    }, 4000);
  });
  loading.value = false;
  if (data !== undefined && data !== null) {
    all.value.push({ score: data.score, text: input.value + "" });
    const alltxt = JSON.parse(JSON.stringify(all.value));
    alltxt.sort((a, b) => b.score - a.score);
    user.setAnswer({
      chapter: "chapter7",
      k: 0,
      answer: { text: alltxt[0].text, score: alltxt[0].score },
    });
    input.value = "";
  }
}
</script>
<style lang="less" scoped>
.user-chapter-7 {
  background: var(--testbg);
  min-height: 100vh;
}

.input {
  display: block;
  padding: 1rem;
  position: relative;
  margin-bottom: 1rem;

  .hidden,
  textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5em;
    min-height: 10em;
    box-shadow: inset 0 0.125rem 0.25rem #00000055;
    border: 1px solid var(--bg2);

    &:focus {
      border: 1px solid var(--bluebg);
    }
  }

  textarea {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 1rem;
    width: calc(100% - 2rem);
    height: 100%;
  }
}

.question {
  // padding: 2rem 1rem;
}

.buttons {
  margin-bottom: 2rem;
}

.options {
  padding: 1em;
}

.commentbox {
  .score {
    background: var(--bluebg);
    color: var(--bluefg);
    padding: 0.5em;
    border-radius: 0.25em;
    margin-bottom: 1em;
  }
}
</style>
