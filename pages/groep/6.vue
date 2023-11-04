<template>
  <div class="group-chapter-6" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Gevaren van AI</h1>
    <div class="chapter-toelichting" v-if="group.showResults.includes('chapter6')">
      Hebben jullie alle woorden eruit gehaald die de bot als ‘toxisch’ bestempeld?
    </div>
    <videoPlayer
      file="/videos/6.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter6')"
      @restart="group.unStartChapter('chapter6')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter6" v-if="!group.showResults.includes('chapter6')"></ChapterProgress>
    <div class="results" v-if="group.showResults.includes('chapter6')">
      <div class="questions" >
        <div class="options" v-for="(item,k) in questions.chapter6">
          <div class="option" v-for="(subitem, kk) in item.options">
            <div class="commentbox">
              {{ subitem }}
              <div class="result">
                {{ stemmen[k][kk] ? stemmen[k][kk].length : 0 }} stemmen
              </div>
              <div class="answer" v-if="kk === item.answer">
                {{item.reason}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="group.setShowResults('chapter6')" v-if="!group.showResults.includes('chapter6')">
      vergelijk resultaten
    </button>
    <div class="next" v-if="group.showResults.includes('chapter6')">
      <button @click="group.next()">Naar het volgende hoofdstuk</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from '~/content/questions.yml'
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter6"));
const stemmen = computed(() => {
  let all = []
  questions.chapter6.map((x,k) => {
    all[k] = []
    for (let i = 0; i < x.options.length; i++) {
      all[k][i] = group.users.filter(user => user.answers && user.answers.chapter6 && user.answers.chapter6[k] === i ? true : false)
    }
  })
  return all
})
</script>
<style lang="less" scoped>
.group-chapter-6 {
  padding: 2rem;
}

.questions {
  max-width: 40rem;
  margin: 2rem auto;
  text-align: left;
  .options {
    margin-bottom: 3rem;
  }
}

.result {
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
}

.answer {
  text-align: center;
  color: var(--fg);
  background: var(--gfg);
  padding: 0.5em;
  margin-top: 0.5em;
}
</style>
