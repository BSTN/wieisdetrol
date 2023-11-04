<template>
  <div class="group-chapter-1" v-if="!group.loading">
    
    <!-- TITLES -->
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Goed en Kwaad</h1>
    <!-- <div class="subtitlequestion">
      Welke reacties vind jij toelaatbaar en welke niet?
    </div> -->
    <div class="chapter-toelichting">
      Moderatoren zijn getraind om toxische berichten te verwijderen. Het gaat dan bijvoorbeeld om berichten waarin mensen beledigd of gediscrimineerd worden. Wat verstaan jullie onder toxiciteit? Zijn er misschien bepaalde woorden in de berichten die bepalen of je een bericht toelaatbaar vindt?
    </div>

    <!-- VIDEO -->
    <videoPlayer
      file="/videos/1.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter1')"
      @restart="group.unStartChapter('chapter1')"
    ></videoPlayer>

    <!-- PROGRESS -->
    <ChapterProgress chapter="chapter1" v-if="!group.showResults.includes('chapter1')"></ChapterProgress>
    <button @click="group.setShowResults('chapter1')" v-if="!group.showResults.includes('chapter1')">
      vergelijk resultaten
    </button>
    <!-- <button @click="group.setUnShowResults('chapter1')" v-if="group.showResults.includes('chapter1')">
      verberg resultaten
    </button> -->
    <!-- RESULTS -->
    <div class="results" v-if="group.showResults.includes('chapter1')">
      <div class="toelichting">
        Hieronder zie je de reacties met de meest verwijderde bovenaan:
      </div>
      <div class="qcontainer">
        <div class="q" v-for="(q, k) in list" :key="q.key">
          <div class="text commentbox"><span>reactie #{{q.key + 1}}</span>{{ q.comment }}</div>
          <div class="splitbox">
            <div class="toegestaan" v-if="q.toegestaan > 0" :style="{width: (q.toegestaan / (q.toegestaan + q.verwijderd)) * 100 + '%'}">
              {{ q.toegestaan }}x toestaan
            </div>
            <div class="verwijderd" v-if="q.verwijderd > 0" :style="{width: (q.verwijderd / (q.toegestaan + q.verwijderd)) * 100 + '%'}">
              {{ q.verwijderd }}x verwijderen
            </div>
          </div>
        </div>
      </div>
      <div class="next" v-if="group.showResults.includes('chapter1')">
        <button @click="group.next()">volgend hoofdstuk <icon icon="next"></icon></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/1.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const started = computed(() => group.started.includes("chapter1"));
const results = ref(false);
function toegestaan(k: Number) {
  return group.users.filter((x) => {
    if (!x.answers || !x.answers["chapter1"]) { return false }
    return x.answers["chapter1"][k] === true;
  });
}
function verwijderd(k: Number) {
  return group.users.filter((x) => {
    if (!x.answers || !x.answers["chapter1"]) { return false }
    return x.answers["chapter1"][k] === false;
  });
}
const list = computed(() => {
  const qs = questions['chapter1']
  const qs2 = qs.map((x,k) => {
    return {
      key: k,
      comment: x,
      verwijderd: verwijderd(k).length,
      toegestaan: toegestaan(k).length
    }
  })
  qs2.sort((a, b) => {
    return a.verwijderd - b.verwijderd
  })
  qs2.reverse()
  return qs2
})
</script>
<style lang="less" scoped>
.group-chapter-1 {
}

.qcontainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  max-width: 30rem;
  margin: 0 auto;
}

.q {
  display:inline-block;
  flex:1;
  line-height: 1em;
  // display: flex;
  min-width: 16rem;
  max-width: 100%;
  margin: 0 auto 0;
  .text {
    width: 100%;
    text-align: left;
  }
}

.commentbox {
  margin-bottom: 0;
}

.splitbox {
  display:flex;
  margin-bottom: 0.25rem;
  border-radius: 0.5em;
  overflow: hidden;
  border: 1px solid var(--bg2);
  .toegestaan {
    font-size: 0.6rem;
    padding: 0.5em;
    background:var(--gfg);
    color:var(--gbg);
  }
  .verwijderd {
    font-size: 0.6rem;
    padding: 0.5em;
    background:var(--rfg);
    color:var(--rbg);
  }
}

.circle {
  padding: 0;
  line-height: 1.5rem;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--gbg);
  color: var(--gfg);
  .verwijderd & {
    background: var(--rbg);
    color: var(--rfg);
  }
}
.toegestaan,
.verwijderd {
  padding: 0 0 0 0.5em;
}
</style>
