<template>
  <div class="user-chapter-3">
     <!-- PAUSE -->
    <userPause v-if="!started"></userPause>

    <!-- VRAGEN -->
    <div class="questions">
      <div class="question">
        Welk label vind je het beste van toepassing bij de volgende reacties?
      </div>
      <div v-for="(q, k) in questions.chapter3" class="commentscontainer">
        <div class="commentbox">
          {{ q.text }}
        </div>
        <div class="options" v-if="!done">
          <button
            v-for="label in questions['chapter3-labels']"
            @click="user.setAnswer({ chapter: 'chapter3', k, answer: label })"
            :class="{
              active: getAnswer({ chapter: 'chapter3', k }) === label,
            }"
          >
            {{ label }}
          </button>
        </div>
        <div class="allanswers" v-if="done">
          <button v-for="label in questions['chapter3-labels']" :class="{active: getAnswer({ chapter: 'chapter3', k }) === label}">
            <span>{{ count(label,k) }}</span> {{ label }} 
          </button>
        </div>
      </div>
    </div>

    <!-- DONE -->
    <div class="done" v-if="!done">
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
function count(label:string,k:number) { 
  let count = 0
  user.users.map(userx => {
    if (user.userid !== userx.userid && userx.answers['chapter3'] && k in userx.answers['chapter3']) {
      if (userx.answers['chapter3'][k] === label) { count++ }
    }
  })
  return count
}
</script>
<style lang="less" scoped>
.user-chapter-3 {
  background: var(--testbg);
}

.questions {
  max-width: 100%;
  width: 40rem;
  margin: 0 auto;
}

.commentscontainer {
  text-align: left;
  padding: 1rem;
}

.options {
  text-align: right;
  font-size: 0.8rem;
  button {
    display: inline-block;
    // width: 100%;
    // margin: 0 0 0.5em auto;
    color: var(--fg2);
    background: var(--bg);
    border-color: var(--bg2);
    &:hover {
      color: var(--fg);
    }
  }
}
button.active {
  background: var(--gbg);
  color: var(--gfg);
  border-color: var(--gbg);
  &:hover {
    color: var(--bg);
  }
}
.allanswers {
  button {
    &:hover {
      background: var(--bg);
      color: var(--fg2);
    }
    span {
      // opacity: 0.5;
      font-weight: bold;
      margin-right: 0.25em;
    }
  }
}
</style>
