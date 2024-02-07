<template>
  <div class="user-chapter-8">
    <user-pause v-if="user.finished.includes('chapter8') ||
      (!user.showResults.includes('chapter8') &&
        !user.started.includes('chapter8')) || done
      "></user-pause>
    <div class="try" v-if="user.started.includes('chapter8') && !user.done.includes('chapter8')">
      <div class="question" v-for="(q, k) in questions.chapter8">
        <h1>{{ q.question }}</h1>
        <div class="options">
          <div class="option" v-for="(option, kk) in q.options"
            :class="{ active: user.getAnswer({ chapter: 'chapter8', k }) === kk }"
            @click="user.setAnswer({ chapter: 'chapter8', k, answer: kk })">
            {{ option }}
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done && user.started.includes('chapter8')">
      <button class="contrast" @click="user.setDone('chapter8')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from '@/content/questions.yml'
const user = useUserStore();
const input = ref("");
const error = ref("");
const loading = ref(false);
const all = ref([]);
const done = computed(() => { return user.done.includes('chapter8') })
</script>
<style lang="less" scoped>
.user-chapter-8 {
  background: var(--testbg);
  min-height: 100vh;
}

.question {
  padding: 3rem 1rem;

  h1 {
    font-size: 1.25rem;
    line-height: 1.4em;
    margin-bottom: 3rem;
  }
}

.options {
  text-align: left;

  .option {
    margin-bottom: 1rem;
    background: var(--bg);
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    font-weight: normal;
    line-height: 1.2em;
    cursor: pointer;

    &.active {
      background: var(--bluebg);
      color: var(--bluefg);
    }
  }
}
</style>
