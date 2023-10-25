<template>
  <div class="user-chapter-4">
    <userPause v-if="!started || done"></userPause>
    <div class="questions">
      <div class="question">
        Welke van de vorige berichten zou jij uitlichten? Je mag er 1 kiezen.
      </div>
      <div
        v-for="(q, k) in questions.chapter3"
        class="commentscontainer"
        :class="{ active: getAnswer({ chapter: 'chapter4', k: 0 }) === k }"
      >
        <div class="commentbox">
          {{ q.text }}
        </div>
        <div class="select" v-if="!done">
          <button @click="user.setAnswer({chapter: 'chapter4', k:0, answer: k})">selecteer deze reactie</button>
        </div>
        <div class="answers" v-if="done">
          {{getVotes(k)}}x geselecteerd
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
const user = useUserStore();
import questions from "@/content/questions.yml";
const { getAnswer } = storeToRefs(user);
const started = computed(() =>
  user.started ? user.started.includes("chapter4") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter4") : false
);
function getVotes(k:number){
  const matches = user.users.filter(x => {
    if('chapter4' in x.answers) {
      return x.answers['chapter4'][0] === k
    } else {
      return false
    }
  })
  return matches.length 
}
</script>
<style lang="less" scoped>
.user-chapter-4 {
  background: var(--testbg);
}

.select {
  text-align: right;
}

.answers {
  text-align: right;
}

.commentscontainer {
  text-align: left;
  padding: 1rem;
  cursor: pointer;
  &.active {
    .commentbox {
      background: var(--fg);
      color: var(--bg);
      &:before {
        background: var(--fg);
      }
    }
    .select {
      button {
        background: var(--fg);
        color: var(--bg);
      }
    }
  }
}
</style>
