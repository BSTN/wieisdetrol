<template>
  <div class="group-chapter-5" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Ben je bot?</h1>
    <div
      class="chapter-toelichting"
      v-if="group.showResults.includes('chapter5')"
    >
      Waar zitten de grootste verschillen tussen het klassengemiddelde en de
      bot? Ben jij het eens met de criteria die de bot lijkt te gebruiken? Tip:
      de bot lijkt een voorkeur te hebben voor lange reacties. Ook lijkt hij te
      selecteren op bepaalde woorden die voorkomen in de reactie.
    </div>
    <ChapterProgress
      chapter="chapter5"
      v-if="!group.showResults.includes('chapter5')"
    ></ChapterProgress>
    <videoPlayer
      file="/videos/5.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter5')"
      @restart="group.unStartChapter('chapter5')"
    ></videoPlayer>
    <button
      @click="group.setShowResults('chapter5')"
      v-if="!group.showResults.includes('chapter5')"
    >
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter5')">
      <div class="comments" v-if="list">
        <div class="q commentsplit" v-for="(q, k) in list">
          <div class="left">
            <div class="commentbox">{{ q.text }}</div>
          </div>
          <div class="right">
            <div class="user bot">
              <!-- <div class="userdetails">🤖</div> -->
              <div class="labels">
                <label><icon icon="prev"></icon> niet-constructief</label>
                <label>constructief <icon icon="next"></icon></label>
              </div>
              <div class="slid">
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="threshold"></div>
                <!-- <div
                  class="userline"
                  v-for="user in q.users"
                  :style="{ left: user.answers['chapter5'][k] * 100 + '%' }"
                ></div> -->
                <div
                  class="bar"
                  :style="{ width: Math.round(q.botresult * 100) + '%' }"
                ></div>
              </div>
              Bot: <b>{{ q.botresult * 100 }}%</b> ({{
                q.botresult < 0.8 ? "niet" : ""
              }}
              constructief)<br />
              <!-- Eens met de bot:
            <span>{{ q.matching ? q.matching.length : 0 }}</span
            >, Oneens:
            <span>{{ q.other ? q.other.length : 0 }}</span> -->
              <!-- <div class="user" v-for="user in group.users">
            <div class="userdetails"><UserIcon :user="user" class="small" /> {{ user.name }}:</div>
            <div class="slid" v-if="user.answers['chapter5'] && !isNaN(user.answers['chapter5'][k])">
              <div class="bar" :style="{width: Math.round(user.answers['chapter5'] && user.answers['chapter5'][k] ? user.answers['chapter5'][k] * 100 : 0) + '%'}"></div>
            {{ user.answers["chapter5"] ? Math.round(user.answers["chapter5"][k] * 100) + '%' : '-' }}
            </div>
          </div> -->
              <label>All deelnemers:</label>
              <div class="slid">
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="mark"></div>
                <div class="threshold"></div>
                <div
                  class="userline"
                  v-for="user in q.users"
                  :style="{ left: user.answers['chapter5'][k] * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
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
import chapterlogo from "@/assets/chapters/5.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter5"));
const precision = 0.2;
const list = computed(() => {
  const qs = questions.chapter5.map((x, k) => {
    x.matching = [];
    x.other = [];
    x.users = [];
    for (let i in group.users) {
      const user = group.users[i];
      const answers = user.answers.chapter5 || false;
      if (answers && !isNaN(answers[k])) {
        x.users.push(user);
        if (
          answers[k] > x.botresult - precision / 2 &&
          answers[k] < x.botresult + precision / 2
        ) {
          x.matching.push(user);
        } else {
          x.other.push(user);
        }
      }
    }
    return x;
  });
  return qs;
});
</script>
<style lang="less" scoped>
.group-chapter-5 {
  padding-bottom: 4rem;
}
.comments {
  width: 60rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  padding: 0rem 4rem;
  span {
    font-weight: 500;
  }
}
.results {
  padding: 1rem 0;
  .user {
    margin-bottom: 0.5em;
    align-items: center;
    label {
      margin-top: 1em;
    }
    .userline {
      position: Absolute;
      left: 0;
      top: 0%;
      height: 100%;
      border-left: 3px solid var(--bluebg);
    }
    .userdetails {
      // flex: 1;
      font-size: 4rem;
      height: 4rem;
      line-height: 3rem;
      text-align: center;
    }
    .slid {
      flex: 1;
      width: 100%;
      height: 1.5em;
      position: relative;
      background: var(--bg);
      border-radius: 0.25em;
      overflow: visible;
      margin-bottom: 0.5em;
      .mark {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        border-left: 1px solid var(--bg2);
        opacity: 0.75;
        z-index: 9;
        &:nth-child(1) {
          left: 20%;
        }
        &:nth-child(2) {
          left: 40%;
        }
        &:nth-child(3) {
          left: 60%;
        }
        &:nth-child(4) {
          left: 80%;
        }
      }
      .bar {
        position: absolute;
        left: 0;
        background: var(--bluebg);
        background: transparent;
        height: 100%;
        border-right: 2px solid var(--bluebg);
      }
      .irrelevant {
      }
      .threshold {
        position: absolute;
        left: 80%;
        height: 140%;
        top: -20%;
        border-left: 2px dotted var(--fg2);
        z-index: 9;
      }
    }
  }
}

.labels {
  display: flex;
  > label {
    flex: 1;
    opacity: 0.75;
    font-size: 0.6rem;
    padding: 0;
    &:nth-child(2) {
      text-align: right;
    }
    .icon {
      display: inline-block;
      transform: translateY(0.125em);
    }
  }
}
</style>
