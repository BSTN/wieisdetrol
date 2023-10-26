<template>
  <div class="group-chapter-7" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Beat-the-bot!</h1>
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
    <h1>Scorebord</h1>
    <div class="scorebord">
      <div class="user" v-for="user in highscore">
        {{ user.name }}: {{ user.answers && user.answers.chapter7 ? Math.round(user.answers.chapter7[0].score * 100) / 100 : 0 }}
      </div>

    </div>
    
    <div class="results" v-if="results">
      Hier komen alle reacties, gesorteerd op score.
    </div>
    <div class="next">
      <button @click="group.next()">Ga naar de laatste pagina</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter7"));
const highscore = computed(() => {
  const users = JSON.parse(JSON.stringify(group.users))
  users.sort((a,b)=> {
    if (!a.answers || !a.answers.chapter7 || !b.answers || !b.answers.chapter7) { return -1 }
    a.answers.chapter7[0].score - b.answers.chapter7[0].score
  })
  return users
})
</script>
<style lang="less" scoped>
.group-chapter-7 {
}
</style>
