<template>
  <div class="group-chapter-8" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Wat denk jij?</h1>
    <div class="chapter-toelichting" v-if="!group.showResults.includes('chapter8')">
      Hoe ziet de toekomst van AI eruit in relatie tot online reageren?
    </div>
    <ChapterProgress chapter="chapter8" v-if="!group.showResults.includes('chapter8')"></ChapterProgress>
    <button @click="group.setShowResults('chapter8')" v-if="!group.showResults.includes('chapter8')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter8')">
      <div class="questions">
        <div class="a-question" v-for="(q, k) in questions.chapter8">
          <div class='q'>{{ q.question }}</div>
          <div class="options">
            <div class="option" v-for="(option, kk) in q.options">
              <div class="text">{{ option }}</div>
              <percentage :count="results[k].options[kk]" :total="results[k].total"></percentage>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next">
      <button @click="group.next()" v-if="group.showResults.includes('chapter8')">Afronden <icon icon="next"></icon>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/8.svg?component";
import questions from '@/content/questions.yml'
const group = useGroupStore();
const results = computed(() => {
  return questions.chapter8.map((x, k) => {
    let total = 0
    const options = [0, 0, 0]
    group.users.map(user => {
      if (user.answers?.chapter8 && k in user.answers.chapter8 && !isNaN(user.answers.chapter8[k])) {
        total++
        options[user.answers.chapter8[k]]++
      }
    })
    return { total, options }
  })
})
onMounted(() => {
  group.startChapter('chapter8')
})
</script>
<style lang="less" scoped>
.group-chapter-8 {}

.questions {
  .a-question {

    padding-bottom: 4rem;

    .q {
      font-weight: bold;
      font-size: 1.25rem;
    }

    .options {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4rem;
      text-align: center;
      padding: 4rem;

      .text {
        background: var(--bg);
        padding: 0.75rem 1rem;
        border-radius: 0.5em;
        margin-bottom: 1rem;
      }

      :deep(.percentage) {
        margin: 0 auto;
        display: inline-block;

        .circle {
          background: var(--bluebg);
        }
      }
    }
  }
}
</style>
