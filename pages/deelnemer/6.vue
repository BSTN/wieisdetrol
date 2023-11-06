<template>
  <div class="user-chapter-6">
    <div class="question" v-if="user.started.includes('chapter6')">
      Welke denk jij dat de constructiviteitsbot er (ten onrechte) uit zal
      filteren?
    </div>
    <user-pause
      v-if="
        (done && !user.showResults.includes('chapter6')) ||
        !user.started.includes('chapter6')
      "
    ></user-pause>
    <div
      class="questions"
      v-if="
        !done &&
        !user.showResults.includes('chapter6') &&
        user.started.includes('chapter6')
      "
    >
      <div
        class="options"
        v-for="(item, k) in questions.chapter6"
        :class="{
          active:
            k === 0 ||
            !isNaN(user.getAnswer({ chapter: 'chapter6', k: k - 1 })),
        }"
      >
        <div class="choose">Kies 1 van de volgende 3:</div>
        <div
          class="option"
          v-for="(subitem, kk) in item.options"
          @click="user.setAnswer({ chapter: 'chapter6', k, answer: kk })"
          :class="{ active: user.getAnswer({ chapter: 'chapter6', k }) === kk }"
        >
          <div class="commentbox">{{ subitem }}</div>
        </div>
      </div>
    </div>
    <div
      class="questions done"
      v-if="done && user.showResults.includes('chapter6')"
    >
      <div class="options" v-for="(item, k) in questions.chapter6">
        <label>Kies 1 van de volgende 3:</label>
        <div
          class="option"
          v-for="(subitem, kk) in item.options"
          :class="{ active: user.getAnswer({ chapter: 'chapter6', k }) === kk }"
        >
          <div class="commentbox">
            {{ subitem }}
            <div class="result">
              {{ stemmen[k][kk].length }} stem{{
                stemmen[k][kk].length > 1 ? "men" : ""
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done && user.started.includes('chapter6')">
      <button class="contrast" @click="user.setDone('chapter6')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from "@/content/questions.yml";
const user = useUserStore();
const { getAnswer } = storeToRefs(user);
const input = ref("");
const done = computed(() =>
  user.done ? user.done.includes("chapter6") : false
);
const stemmen = computed(() => {
  let all = [];
  questions.chapter6.map((x, k) => {
    all[k] = [];
    for (let i = 0; i < x.options.length; i++) {
      all[k][i] = user.users.filter(
        (u) => u.answers && u.answers.chapter6 && u.answers.chapter6[k] == i
      );
    }
  });
  return all;
});
</script>
<style lang="less" scoped>
.user-chapter-6 {
  background: var(--testbg);
}

.questions {
  padding: 1rem;
  text-align: left;
  width: 30rem;
  max-width: 100%;
  margin: 0 auto;
}

.choose {
  margin-bottom: 1em;
  text-align: center;
  // background: var(--fg);
  // color: var(--bg);
  // border-top: 1px solid var(--bg3);
  font-weight: 500;
  padding: 0.5em;
  font-size: 0.8rem;
}

.options {
  margin-bottom: 3rem;
  // border-top: 1px solid var(--bg);
  padding-top: 1em;
  opacity: 0.25;
  pointer-events: none;
  .questions.done & {
    opacity: 1;
    pointer-events: auto;
  }
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  .option {
    cursor: pointer;
    &.active {
      .commentbox {
        background: var(--bluebg);
        color: var(--bluefg);
        &:before {
          background: var(--bluebg);
        }
      }
    }
  }
}

.commentbox .result {
  text-align: right;
}
</style>
