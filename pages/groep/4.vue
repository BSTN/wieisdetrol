<template>
  <div class="group-chapter-4" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Een ‘goede’ discussie.</h1>
    <div class="chapter-toelichting">
      Welke reacties hebben een hoge score en welke reacties een lage score?
      Horen er ook boze en grappige reacties thuis in een goeie discussie?
      Zo ja, waarom wel of waarom niet?
    </div>
    <!-- <div class="subtitlequestion">
      Gesorteerd op meest geselecteerd:
    </div> -->
    <ChapterProgress chapter="chapter4" v-if="!group.showResults.includes('chapter4')"></ChapterProgress>
    <videoPlayer file="/videos/4.mp4" :class="{ started }" @next="group.startChapter('chapter4')"
      @restart="group.unStartChapter('chapter4')"></videoPlayer>
    <button @click="group.setShowResults('chapter4')" v-if="!group.showResults.includes('chapter4')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter4')">
      <div class="comments">
        <div class="q" v-for="(q, k) in list">
          <div class="commentbox">
            <span>reactie #{{ q.key + 1 }}</span>{{ q.text }}
          </div>
          <basicBar :count="q.votes" :total="total">
            <b>{{ q.votes }}x</b> geselecteerd
          </basicBar>
          <label>Labels uit vorig hoofdstuk:</label>
          <div class="answers labels">
            <div v-for="(users, label) in labelCountPerComment[k]" v-show="users.length > 0" class="label">
              {{ label }} <sup>{{ users.length }}</sup>
            </div>
          </div>
          <!-- <div class="result">{{ q.votes }}x geselecteerd</div> -->
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
import chapterlogo from "@/assets/chapters/4.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter4"));

const total = computed(() => {
  return group.users.length > 0
    ? group.users.filter(
      (x) => x.answers["chapter4"] && !isNaN(x.answers["chapter4"][0])
    ).length
    : 0;
});

const list = computed(() => {
  const qs = questions.chapter3.map((x, k) => {
    return {
      text: x.text,
      key: k,
      votes: group.users.filter((x) =>
        x.answers["chapter4"] ? x.answers["chapter4"][0] === k : false
      ).length,
      users: group.users.filter((x) =>
        x.answers["chapter4"] ? x.answers["chapter4"][0] === k : false
      ),
    };
  });
  // qs.sort((a,b) => a.votes - b.votes).reverse()
  return qs;
});

const labelCountPerComment = computed(() => {
  return questions["chapter3"].map((x, k) => {
    const values = {};
    const labels = questions["chapter3-labels"];
    labels.map((label) => {
      values[label] = [];
    });
    for (let u in group.users) {
      if (
        group.users[u].answers["chapter3"] &&
        group.users[u].answers["chapter3"][k]
      ) {
        values[group.users[u].answers["chapter3"][k]].push({
          userid: group.users[u].userid,
          name: group.users[u].name,
        });
      }
    }
    return values;
  });
});
</script>
<style lang="less" scoped>
.group-chapter-4 {
  padding: 0 0 2em;
}

.results {
  margin: 0 auto;
  width: 100%;
  padding: 0;
}

.comments {
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4rem;
  padding: 4rem;

  .q.commentsplit {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  .result {
    text-align: right;
  }
}

label {
  padding: 0;
}

.labels {
  .label {
    font-size: 0.8rem;
    background: var(--bluebg);
    color: var(--bluefg);
    display: inline-block;
    padding: 0 1em;
    border-radius: 0.25em;
  }
}
</style>
