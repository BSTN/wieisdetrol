<template>
  <div class="group-chapter-4" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Een ‘goede’ discussie.</h1>
    <div class="chapter-toelichting">
      Welke reacties hebben een hoge score en welke reacties een lage scoren? Horen daarin ook boze en grappige reacties thuis in een goeie discussie? Zo ja, waarom wel of waarom niet?
    </div>
    <div class="subtitlequestion">
      Gesorteerd op meest geselecteerd:
    </div>
    <ChapterProgress chapter="chapter4" v-if="!group.showResults.includes('chapter4')"></ChapterProgress>
    <videoPlayer
      file="/videos/4.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter4')"
      @restart="group.unStartChapter('chapter4')"
    ></videoPlayer>
    <button @click="group.setShowResults('chapter4')" v-if="!group.showResults.includes('chapter4')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter4')">
      <div class="comments">
        <div class="q" v-for="(q, k) in list">
          <div class="commentbox"><span>reactie #{{ q.key + 1 }}</span>{{ q.text }}</div>
          <div class="result">{{ q.votes }}x geselecteerd</div>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgend hoofdstuk <icon icon="next"></icon></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/4.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter4"));

const list = computed(() => {
  const qs = questions.chapter3.map((x,k) => {
    return {
      text: x.text,
      key: k,
      votes: group.users.filter(x => x.answers['chapter4'] ? x.answers['chapter4'][0] === k : false).length,
      users: group.users.filter(x => x.answers['chapter4'] ? x.answers['chapter4'][0] === k : false)
    }
  })
  qs.sort((a,b) => a.votes - b.votes).reverse()
  return qs
})
</script>
<style lang="less" scoped>
.group-chapter-4 {
  
}

.results {
  margin: 0 auto;
  width: 30rem;
}
.comments {
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  .q {
    padding-bottom: 2rem;
  }
  .result {
    text-align: right;
  }
}
</style>
