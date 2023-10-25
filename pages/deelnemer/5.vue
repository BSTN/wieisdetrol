<template>
  <div class="user-chapter-5">
    <userPause v-if="!started"></userPause>
    <div class="questions">
      <div class="q" v-for="(q, k) in questions.chapter5">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider :number="k" chapter="chapter5" @change="update" v-if="!done"></botSlider>
        <div class="result">
          Jouw antwoord: {{ getAnswer({chapter: 'chapter5', k}) }}<br>
          De bot: {{ q.botresult }}
          <div class="resultslider">
            
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
  }
}
</style>
