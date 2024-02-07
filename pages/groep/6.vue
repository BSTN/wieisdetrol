<template>
  <div class="group-chapter-6" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Gevaren van AI</h1>
    <div class="chapter-toelichting" v-if="group.showResults.includes('chapter6')">
      Hebben jullie alle woorden eruit gehaald die de bot als ‘toxisch’
      bestempeld?
    </div>
    <videoPlayer file="/videos/6.mp4" :class="{ started }" @next="group.startChapter('chapter6')"
      @restart="group.unStartChapter('chapter6')"></videoPlayer>
    <ChapterProgress chapter="chapter6" v-if="!group.showResults.includes('chapter6')"></ChapterProgress>
    <div class="results" v-if="group.showResults.includes('chapter6')">
      <div class="questions">
        <div class="options-container" v-for="(item, k) in questions.chapter6">
          <label>Vraag {{ k + 1 }}</label>
          <div class="options">
            <div class="option" v-for="(subitem, kk) in item.options" :class="{ active: kk === item.answer }">
              <div class="commentbox">
                {{ subitem }}
              </div>
              <!-- <div class="result">
                {{ stemmen[k][kk] ? stemmen[k][kk].length : 0 }} stemmen
              </div> -->
              <BasicBar :count="stemmen[k][kk] ? stemmen[k][kk].length : 0" :total="group.users.length">
                {{ stemmen[k][kk] ? stemmen[k][kk].length : 0 }} stem{{ stemmen[k][kk].length != '1' ? 'men' : '' }}
              </BasicBar>
              <div class="answer" v-if="kk === item.answer">
                🤖 {{ item.reason }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="group.setShowResults('chapter6')" v-if="!group.showResults.includes('chapter6')">
      vergelijk resultaten
    </button>
    <div class="next" v-if="group.showResults.includes('chapter6')">
      <button @click="group.next()">
        Volgend hoofdstuk <icon icon="next"></icon>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from "~/content/questions.yml";
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter6"));
const stemmen = computed(() => {
  let all = [];
  questions.chapter6.map((x, k) => {
    all[k] = [];
    for (let i = 0; i < x.options.length; i++) {
      all[k][i] = group.users.filter((user) =>
        user.answers && user.answers.chapter6 && user.answers.chapter6[k] === i
          ? true
          : false
      );
    }
  });
  return all;
});
</script>
<style lang="less" scoped>
.group-chapter-6 {
  padding: 2rem;
}

.questions {
  // width: 50rem;
  max-width: 100%;
  margin: 4rem auto;
  text-align: left;

  .options {
    margin-bottom: 5rem;
    // background: var(--bg2);
    // box-shadow: inset 0 0 1rem var(--bg3);
    padding: 2rem 2rem 1rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4rem;

    @media (max-width: 80rem) {
      gap: 2rem;
    }

    @media (max-width: 60rem) {
      gap: 2rem;
      grid-template-columns: 1fr 1fr;
    }

    .option {
      margin-bottom: 2rem;

      &.active {
        .commentbox {
          font-weight: bold;
        }
      }
    }
  }
}

.options-container {
  text-align: center;

  label {
    display: inline-block;
    margin: 0 auto;
    background: var(--fg2);
    color: var(--bg);
    border-radius: 0.25rem;
  }

  .options {
    text-align: left;
    border-top: 1px solid var(--bc);
    margin-top: 1rem;
  }
}

.result {
  text-align: center;
  font-weight: bold;
  background: var(--bluebg);
  color: var(--bluefg);
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  display: inline-block;
}

.answer {
  text-align: left;
  color: var(--fg);
  background: var(--gfg);
  padding: 0.75em 1em;
  margin-top: 0.5em;
  border-radius: 0.25em;
  font-size: 0.75rem;
  line-height: 1.3em;
}
</style>
