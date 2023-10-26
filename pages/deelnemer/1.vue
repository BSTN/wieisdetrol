<template>
  <div class="user-chapter1" v-if="!user.loading">
    <userPause v-if="!started"></userPause>
    <div v-if="started" class="comments">
      <div v-if="done" class="info">
      Dank voor je antwoorden! Zodra de resultaten worden weergegeven kan je hieronder je resultaten vergelijken met die van andere deelnemers:
      </div>
      <div
        v-for="(comment, k) in questions.chapter1"
        class="comment"
        :class="{ active: k <= getChapterPosition('chapter1') + 1 }"
      >

        <!-- COMMENT -->
        <div class="text commentbox"><span>reactie #{{k + 1}}</span>{{ comment }}</div>

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
          <div class="ownanswer">jouw antwoord: {{ getAnswer({chapter: 'chapter1', k}) ? 'verwijderen' : 'toelaten'}}</div>
          <div class="verwijderd">{{ allAnswers ? allAnswers.verwijderden[k].length : 0 }}x verwijderd</div>
          <div class="toegestaan">{{ allAnswers ? allAnswers.toegestanen[k].length : 0 }}x toegestaan</div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done && started">
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
const allAnswers = computed(() => {
  if (!user.showResults.includes('chapter1')) { return false }
  const verwijderden = [];
  const toegestanen = [];
  for (let i = 0; i < questions['chapter1'].length; i++) {
    verwijderden[i] = user.users.filter(x => x.answers && x.answers.chapter1 && x.answers.chapter1[i] === false ? true : false)
    toegestanen[i] = user.users.filter(x => x.answers && x.answers.chapter1 && x.answers.chapter1[i] === true ? true : false)
  }
  return {verwijderden, toegestanen}
})
</script>
<style lang="less" scoped>
.user-chapter1 {
  text-align: left;
  background: var(--testbg);
  min-height: 100vh;
}
.comments {
  padding: 1rem;
}
.comment {
  margin: 0 auto 4rem;
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

.answers {
  .ownanswer {
    margin-bottom: 0.5em;
    font-size: 0.8rem;
    text-align: center;
  }
  .verwijderd, .toegestaan {
    padding: 0.25em 0.5em;
    font-size: 0.8rem;
    border-radius: 0.5em;
    margin-bottom: 0.25em;
  }
  .verwijderd {
    color: var(--rbg);
    background: var(--rfg);
    border: 1px solid var(--rbg);
  }
  .toegestaan {
    color: var(--gbg);
    background: var(--gfg);
    border: 1px solid var(--gbg);
  }
}
.info {
  margin-bottom: 2rem;
}
</style>
