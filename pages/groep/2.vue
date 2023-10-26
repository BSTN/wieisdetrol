<template>
  <div class="group-chapter-2" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Trollen vangen</h1>
    <!-- <div class="subtitlequestion">
      Welke accounts vertonen volgens jou trolgedrag?
    </div> -->
    <videoPlayer
      file="/videos/2.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter2')"
      @restart="group.unStartChapter('chapter2')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter2" v-if="!group.showResults.includes('chapter2')"></ChapterProgress>
    <button @click="group.setShowResults('chapter2')" v-if="!group.showResults.includes('chapter2')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter2')">
      <div class="q" v-for="(item, k) in list">
        <div class="name">{{ item.name }}</div>
        <div class="trol">
          😈 <span>{{ item.trol.length }}</span>
        </div>
        <div class="geentrol">
          😇 <span>{{ item.geentrol.length }}</span>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/2.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter2"));
function trol(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter2"][k] === true;
  });
}
function geentrol(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter2"][k] === false;
  });
}

const list = computed(() => {
  const qs = questions['chapter2']
  const qs2 = qs.map((x, k:number) => {
    return {
      name: x.name,
      trol: trol(k),
      geentrol: geentrol(k)
    }
  })
  qs2.sort((a,b) => {
    return a.trol.length - b.trol.length
  })
  qs2.reverse()
  return qs2
})
</script>
<style lang="less" scoped>
.group-chapter-2 {
}

.results {
  width: 20rem;
  margin: 0 auto;
}
.q {
  display: flex;
  margin: 0 auto 1em;
  width: 100%;
  background: var(--bg);
  padding: 1em;
  border-radius: 0.25em;
  .name {
    flex: 1;
    text-align: left;
  }
  .trol, .geentrol {
    width: 4em;
    span {
      margin-left: 0.5em;
    }
  }
}

</style>
