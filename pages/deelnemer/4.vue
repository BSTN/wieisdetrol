<template>
  <div class="user-chapter-4">
    <userPause v-if="!started || (done && !user.showResults.includes('chapter4'))"></userPause>
    <div class="questions" v-if="started && (!done || user.showResults.includes('chapter4'))">
      <div class="question">
        In hoeverre vind je de volgende reacties een constructieve bijdrage
        leveren?
      </div>
      <div class="q" v-for="(q, k) in questions.chapter4" :class="{
      active:
        k === 0 || !isNaN(getAnswer({ chapter: 'chapter4', k: k - 1 })),
    }">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider :number="k" chapter="chapter4" @change="update" v-if="!done"></botSlider>
        <div class="result" v-if="user.showResults.includes('chapter4')">
          <label>Jouw antwoord:</label>
          <div class="labels">
            <label>
              <icon icon="prev"></icon> niet-constructief
            </label>
            <label>constructief <icon icon="next"></icon></label>
          </div>
          <div class="slid user">
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="bar" :style="{
      width:
        Math.round(
          user.answers['chapter4'][k]
            ? user.answers['chapter4'][k] * 100
            : 0
        ) + '%',
    }"></div>
          </div>
          <label>De bot:</label>
          <div class="labels">
            <label>
              <icon icon="prev"></icon> niet-constructief
            </label>
            <label>constructief <icon icon="next"></icon></label>
          </div>
          <div class="slid bot">
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="mark"></div>
            <div class="bar" :style="{ width: Math.round(q.botresult * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done">
      <button class="contrast" @click="user.setDone('chapter4')">
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
  user.setAnswer({ chapter: "chapter4", k, answer: data });
}
const started = computed(() =>
  user.started ? user.started.includes("chapter4") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter4") : false
);
</script>
<style lang="less" scoped>
.user-chapter-4 {
  background: var(--testbg);
}

.labels {
  display: flex;

  >label {
    flex: 1;
    opacity: 0.75;
    font-size: 0.6rem;
    padding: 0;

    &:nth-child(2) {
      text-align: right;
    }

    .icon {
      display: inline-block;
      transform: translateY(0.125em);
    }
  }
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
  height: 1.5em;
  position: relative;
  background: var(--bg);
  border-radius: 0.25em;
  overflow: hidden;
  margin-bottom: 1rem;

  .mark {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-left: 1px solid var(--bg2);
    opacity: 0.75;
    z-index: 9;

    &:nth-child(1) {
      left: 20%;
    }

    &:nth-child(2) {
      left: 40%;
    }

    &:nth-child(3) {
      left: 60%;
    }

    &:nth-child(4) {
      left: 80%;
    }
  }

  .bar {
    position: absolute;
    left: 0;
    background: var(--bluebg);
    height: 100%;
    border-right: 2px solid var(--bg);
  }
}
</style>
