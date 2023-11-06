<template>
  <div class="group-chapter-2" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Trollen vangen</h1>
    <!-- <div class="subtitlequestion">
      Welke accounts vertonen volgens jou trolgedrag?
    </div> -->
    <div class="chapter-toelichting">
      Hoe bepaal jij wat een trolaccount is? Speelt de naam van het account een
      rol? Zijn er bepaalde woorden in de reacties die meespelen in jouw keuze?
      In hoeverre speelt de argumentatie een rol?
    </div>
    <videoPlayer
      file="/videos/2.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter2')"
      @restart="group.unStartChapter('chapter2')"
    ></videoPlayer>
    <ChapterProgress
      chapter="chapter2"
      v-if="!group.showResults.includes('chapter2')"
    ></ChapterProgress>
    <button
      @click="group.setShowResults('chapter2')"
      v-if="!group.showResults.includes('chapter2')"
    >
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter2')">
      <div class="q" v-for="(item, k) in list">
        <div class="user">
          <div class="icon">
            <icon icon="user"></icon>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="bars">
          <BasicBar
            :count="item.trol.length"
            :total="item.trol.length + item.geentrol.length"
            >{{ item.trol.length }}x trol</BasicBar
          >
          <!-- <div class="trol">
            😈 <span>{{ item.trol.length }}</span>
          </div>
          <div class="geentrol">
            😇 <span>{{ item.geentrol.length }}</span>
          </div> -->
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">
          volgend hoofdstuk <icon icon="next"></icon>
        </button>
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
    if (!x.answers || !x.answers["chapter2"]) {
      return false;
    }
    return x.answers["chapter2"][k] === true;
  });
}
function geentrol(k: Number) {
  return group.users.filter((x) => {
    if (!x.answers || !x.answers["chapter2"]) {
      return false;
    }
    return x.answers["chapter2"][k] === false;
  });
}

const list = computed(() => {
  const qs = questions["chapter2"];
  const qs2 = qs.map((x, k: number) => {
    return {
      name: x.name,
      trol: trol(k),
      geentrol: geentrol(k),
    };
  });
  qs2.sort((a, b) => {
    return a.trol.length - b.trol.length;
  });
  qs2.reverse();
  return qs2;
});
</script>
<style lang="less" scoped>
.group-chapter-2 {
  padding-bottom: 12rem;
}

.results {
  width: 60rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  > div {
    flex: 1;
  }
}
.q .user {
  margin: 0 auto 1em;
  width: 100%;
  background: var(--bg);
  padding: 3em 1em;
  border-radius: 0.25em;
  align-items: center;
  .icon {
    background: var(--bg1);
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
    text-align: center;
    display: inline-block;
    margin-bottom: 1rem;
    :deep(.icon) {
      width: 3rem;
      height: 3rem;
      display: inline-block;
      margin-top: 1.3rem;
    }
  }
  .name {
    flex: 1;
    text-align: center;
    padding-left: 0.75em;
    font-weight: 500;
  }
  .trol,
  .geentrol {
    width: 4em;
    font-weight: 500;
    span {
      margin-left: 0.5em;
    }
  }
}
</style>
