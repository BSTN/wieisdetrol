<template>
  <div class="user-chapter-5">
    <userPause v-if="!started || (done && !user.showResults.includes('chapter5'))"></userPause>
    <div class="questions" v-if="started && (!done || user.showResults.includes('chapter5'))">
      <div class="q" v-for="(q, k) in questions.chapter5" :class="{active: k === 0 || !isNaN(getAnswer({chapter: 'chapter5', k: k - 1}))}">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider :number="k" chapter="chapter5" @change="update" v-if="!done"></botSlider>
        <div class="result" v-if="user.showResults.includes('chapter5')">
          Jouw antwoord:
          <div class="slid user">
              <div class="bar" :style="{width: Math.round(user.answers['chapter5'][k] ? user.answers['chapter5'][k] * 100 : 0) + '%'}"></div>
            </div>
          De bot:
          <div class="slid bot">
            <div class="bar" :style="{width: Math.round(q.botresult * 100) + '%'}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done">
      <button class="contrast" @click="user.setDone('chapter5')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from "@/content/questions.yml";
const user = useUserStore();
const value = 0;
const { getAnswer } = storeToRefs(user);

function update({ data, k }: { data: any; k: number }) {
  user.setAnswer({ chapter: "chapter5", k, answer: data });
}
const started = computed(() =>
  user.started ? user.started.includes("chapter5") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter5") : false
);
</script>
<style lang="less" scoped>
.user-chapter-5 {
  background: var(--testbg);
}
.questions {
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  text-align: left;
  .q {
    margin-bottom: 5rem;
    opacity: 0.25;
    pointer-events: none;
    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

.slid {
    flex: 1;
    width: 100%;
    height: 0.5em;
    position: relative;
    background: var(--rbg);
    border-radius: 0.25em;
    overflow: hidden;;
    margin-bottom: 0.5rem;
    .bar {
      position:absolute;
      left:0;
      background: var(--gbg);
      height: 100%;
      border-right: 2px solid var(--bg);
    }
  }
</style>
