<template>
  <div class="group-chapter-5" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Ben je bot?</h1>
    <ChapterProgress chapter="chapter5" v-if="!group.showResults.includes('chapter5')"></ChapterProgress>
    <videoPlayer
      file="/videos/5.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter5')"
      @restart="group.unStartChapter('chapter5')"
    ></videoPlayer>
    <button @click="group.setShowResults('chapter5')" v-if="!group.showResults.includes('chapter5')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter5')">
      <div class="comments" v-if="questions.chapter5">
        <div class="q" v-for="(q, k) in questions.chapter5">
          <div class="commentbox">{{ q.text }}</div>
          <div class="user bot">
            <div class="userdetails">🤖 Bot:</div>
            <div class="slid">
              <div class="bar" :style="{width: Math.round(q.botresult * 100) + '%'}"></div>
            </div>
          </div>
          <div class="user" v-for="user in group.users">
            <div class="userdetails"><UserIcon :user="user" class="small" /> {{ user.name }}:</div>
            <div class="slid">
              <div class="bar" :style="{width: Math.round(user.answers['chapter5'][k] ? user.answers['chapter5'][k] * 100 : 0) + '%'}"></div>
            {{ user.answers["chapter5"] ? Math.round(user.answers["chapter5"][k] * 100) + '%' : '-' }}
            </div>
          </div>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/5.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter5"));
</script>
<style lang="less" scoped>
.group-chapter-5 {
}
.comments {
  // width: 40rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  display: grid;
  gap: 2rem;
  padding: 0rem 4rem;
  grid-template-columns: repeat(3, 1fr);
}
.results {
  .user {
    margin-bottom: 0.5em;
    display:flex;
    align-items: center;
    .userdetails {
      flex: 1;
    }
    .slid {
      flex: 1;
      width: 50%;
      height: 0.5em;
      position: relative;
      background: var(--rbg);
      border-radius: 0.25em;
      overflow: hidden;
      .bar {
        position:absolute;
        left:0;
        background: var(--gbg);
        height: 100%;
        border-right: 2px solid var(--bg);
      }
    }
  }
}
</style>
