<template>
  <div class="user-chapter-2">
    <user-pause v-if="!started || (done && !user.showResults.includes('chapter2'))"></user-pause>
    <div class="questions" v-if="started && (!done || user.showResults.includes('chapter2'))">
      <div class="item" v-for="(q, k) in questions.chapter2">
        <div class="name"><icon icon="user"></icon>{{ q.name }}</div>
        <div class="comments">
          <div class="comment commentbox" v-for="comment in q.comments">
            {{ comment }}
          </div>
        </div>
        <div class="answer" v-if="!done">
          <button
            @click="user.setAnswer({ chapter: 'chapter2', k, answer: true })"
            :class="{
              active: getAnswer({ chapter: 'chapter2', k }) === true,
            }"
          >
            😈 Trol
          </button>
          <button
            @click="user.setAnswer({ chapter: 'chapter2', k, answer: false })"
            :class="{
              active: getAnswer({ chapter: 'chapter2', k }) === false,
            }"
          >
            😇 Geen Trol
          </button>
        </div>
        <div class="answers" v-if="user.showResults.includes('chapter2')">
          <div><label>Jouw antwoord:</label> {{ getAnswer({ chapter: 'chapter2', k }) === false ? '😈': '😇' }}</div>
          <div><label>Alle antwoorden:</label> 😈 {{allAnswers ? allAnswers.trol[k].length : 0}}
          😇 {{allAnswers ? allAnswers.geentrol[k].length : 0}}</div>
        </div>
      </div>
      <div class="done" v-if="!done">
        <button class="contrast" @click="user.setDone('chapter2')">
          Klik hier als je klaar bent!
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from "@/content/questions.yml";
import { storeToRefs } from "pinia";
const user = useUserStore();
const { getAnswer } = storeToRefs(user);
const started = computed(() =>
  user.started ? user.started.includes("chapter2") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter2") : false
);

const allAnswers = computed(() => {
  if (!user.showResults.includes('chapter2')) { return false }
  const trol = [];
  const geentrol = [];
  for (let i = 0; i < questions['chapter2'].length; i++) {
    trol[i] = user.users.filter(x => x.answers && x.answers.chapter1 && x.answers.chapter1[i] === false ? true : false)
    geentrol[i] = user.users.filter(x => x.answers && x.answers.chapter1 && x.answers.chapter1[i] === true ? true : false)
  }
  return {trol, geentrol}
})
</script>
<style lang="less" scoped>
.user-chapter-2 {
  text-align: left;
  background: var(--testbg);
  min-height: 100vh;
}
.questions {
  max-width: 30rem;
  margin: 0 auto;
  padding: 1em 0;
}
.item {
  padding: 1em;
  background: var(--bg);
  margin: 0 .5em 1em;
  border-radius: 0.25em;
  .name {
    background: var(--bg);
    border-radius: 0.25em;
    text-align: left;
    margin-bottom: 0.5em;
    padding: 0;
    margin-bottom: 1em;
    .icon {
      display: inline-block;
      margin-right: 0.5em;
      margin-left: 0.5em;
      background: var(--bg1);
      width: 2rem;
      height: 2rem;
      border: 0.25rem solid var(--bg1);
      border-radius: 100%;
      vertical-align: middle;
      margin-right: 1em;
      :deep(svg) {
        transform: scale(0.7);
      }
    }
  }
}

.answer {
  text-align: right;
  button {
    background: var(--bg1);
    border: 2px solid var(--bg);
  }
  button.active {
    background: var(--fg);
    color: var(--bg);
    // border: 2px solid var(--fg);
  }
}

.answers {
  text-align: center;
}

</style>
