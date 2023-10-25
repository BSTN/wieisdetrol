<template>
  <div class="group-chapter-7" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Beat the bot</h1>
    <div class="subtitlequestion">
      Schrijf de meest constructieve bijdrage die je kunt bedenken. De bot
      plaatst alle reacties uit de klas straks in een hiërarchie van hoog naar
      laag.
    </div>
    <videoPlayer
      file="/videos/7.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter7')"
      @restart="group.unStartChapter('chapter7')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter7" v-if="!results"></ChapterProgress>
    <div class="results" v-if="results">
      Hier komen alle reacties, gesorteerd op score.
    </div>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="next" v-if="results">
      <button @click="group.next()">naar het einde</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter7"));
</script>
<style lang="less" scoped>
.group-chapter-7 {
}
</style>
