<template>
  <div class="user-chapter-6">
    <div class="question">Welke denk jij dat de constructiviteitsbot er (ten onrechte) uit zal filteren?</div>
    <div class="questions" v-if="!done">
      <div class="options" v-for="(item,k) in questions.chapter6">
        <div class="choose">Kies 1 van de volgende 3:</div>
        <div class="option" v-for="(subitem, kk) in item.options" @click="user.setAnswer({chapter: 'chapter6', k, answer: kk})" :class="{active: user.getAnswer({chapter: 'chapter6', k}) === kk}">
          <div class="commentbox">{{ subitem }}</div>
        </div>
      </div>
    </div>
    <div class="questions" v-if="done">
      <div class="options" v-for="(item,k) in questions.chapter6">
        <div class="choose">Kies 1 van de volgende 3:</div>
        <div class="option" v-for="(subitem, kk) in item.options" :class="{active: user.getAnswer({chapter: 'chapter6', k}) === kk}">
          <div class="commentbox">
            {{ subitem }}
            <div class="result">
              {{ stemmen }} stemmen
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="done" v-if="!done">
      <button class="contrast" @click="user.setDone('chapter6')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from '@/content/questions.yml'
const user = useUserStore();
const { getAnswer } = storeToRefs(user);
const input = ref("");
const done = computed(() =>
  user.done ? user.done.includes("chapter6") : false
);
async function send() {
  const data = await $fetch("/socketapi/beatthebot", {
    method: "POST",
    body: { text: input.value, userid: user.userid, groupid: user.groupid },
  });
  console.log(data);
}
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
  background: var(--fg);
  color: var(--bg);
  border-radius: 0.25em;
  padding: 0.5em;
}

.options {
  margin-bottom: 3rem;
  // border-top: 1px solid var(--bg);
  padding-top: 1em;
  .option {
    cursor: pointer;
    &.active {
      .commentbox {
        background: var(--gfg);
        &:before {
          background: var(--gfg);
        }
      }
    }
  }
}

.commentbox .result {
  text-align: right;
}

</style>
