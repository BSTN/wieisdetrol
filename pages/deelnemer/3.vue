<template>
  <div class="user-chapter-3">
    <userPause v-if="!started || (done && !user.showResults.includes('chapter3'))"></userPause>
    <div class="questions" v-if="started && (!done || user.showResults.includes('chapter3'))">
      <div class="question">
        Welke van de volgende reacties is volgens jou het meest constructief?
      </div>
      <div v-for="(q, k) in questions.chapter3" class="commentscontainer"
        :class="{ active: getAnswer({ chapter: 'chapter3', k: 0 }) === k }">
        <div class="commentbox">
          <span>Reactie #{{ k + 1 }}</span>{{ q.text }}
        </div>
        <div class="select" v-if="!done">
          <button @click="user.setAnswer({ chapter: 'chapter3', k: 0, answer: k })">
            selecteer deze reactie
          </button>
        </div>
        <div class="answers" v-if="done">{{ getVotes(k) }}x geselecteerd</div>
      </div>
    </div>
    <div class="done" v-if="!done && started">
      <button class="contrast" @click="user.setDone('chapter3')">
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
  user.started ? user.started.includes("chapter3") : false
);
const done = computed(() =>
  user.done ? user.done.includes("chapter3") : false
);
function getVotes(k: number) {
  const matches = user.users.filter((x) => {
    if ("chapter3" in x.answers) {
      return x.answers["chapter3"][0] === k;
    } else {
      return false;
    }
  });
  return matches.length;
}
</script>
<style lang="less" scoped>
.user-chapter-3 {
  background: var(--testbg);

  .questions {
    width: 40rem;
    max-width: 100%;
    margin: 0 auto;
  }
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
      background: var(--bluebg);
      color: var(--bluefg);

      &:before {
        background: var(--bluebg);
      }
    }

    .select {
      button {
        // background: var(--gfg);
        // color: var(--gbg);
      }
    }
  }
}
</style>
