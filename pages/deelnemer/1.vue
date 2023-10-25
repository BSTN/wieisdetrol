<template>
  <div class="user-chapter1" v-if="!user.loading">
    <!-- <userPause v-if="!started || done"></userPause> -->
    <div v-if="started" class="comments">
      <div
        v-for="(comment, k) in questions.chapter1"
        class="comment"
        :class="{ active: k <= getChapterPosition('chapter1') + 1 }"
      >

        <!-- COMMENT -->
        <div class="text commentbox">{{ comment }}</div>

        <!-- BUTTONS -->
        <div class="buttons" v-if="!done">
          <button
            @click="user.setAnswer({ chapter: 'chapter1', k, answer: true })"
            :class="{
              active: getAnswer({ chapter: 'chapter1', k }) === true,
            }"
          >
            Toestaan
          </button>
          <button
            @click="user.setAnswer({ chapter: 'chapter1', k, answer: false })"
            :class="{
              active: getAnswer({ chapter: 'chapter1', k }) === false,
            }"
          >
            Verwijderen
          </button>
        </div>

        <!-- ANSWERS -->
        <div class="answers" v-if="user.showResults.includes('chapter1')">
          jouw antwoord: {{ getAnswer({chapter: 'chapter1', k}) ? 'verwijderen' : 'toelaten'}}
        </div>
      </div>
    </div>
    <div class="done" v-if="!done">
      <button class="contrast" @click="user.setDone('chapter1')">
        Klik hier als je klaar bent!
      </button>
      <!-- <button class="contrast" @click="user.unFinish('chapter1')">
      Niet klaar!
    </button> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from "@/content/questions.yml";
const user = useUserStore();

const { getAnswer, getChapterPosition } = storeToRefs(user);

const started = computed(() =>
  user.started ? user.started.includes("chapter1") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter1") : false
);
</script>
<style lang="less" scoped>
.user-chapter1 {
  text-align: left;
  background: var(--testbg);
}
.comments {
  padding: 1rem;
}
.comment {
  margin: 0 auto 3rem;
  width: 32rem;
  max-width: 100%;
  opacity: 0.1;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .buttons {
    text-align: right;
    button {
      border: 0;
    }
    button.active {
      &:first-child {
        background: var(--gbg);
        color: var(--gfg);
        border-color: var(--gbg);
      }
      &:nth-child(2) {
        background: var(--rbg);
        color: var(--rfg);
        border-color: var(--rbg);
      }
    }
  }
}
</style>
