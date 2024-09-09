<template>
  <div class="group-chapter-4" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Mens vs. bot</h1>
    <div class="chapter-toelichting">
      Waar zitten de grootste verschillen tussen jouw score en de bot? Ben jij het eens met de criteria die de bot lijkt
      te gebruiken? Tip: de bot lijkt een voorkeur te hebben voor lange reacties. Ook lijkt hij te selecteren op
      bepaalde woorden die voorkomen in de reactie.
      <div class="subtoelichting" v-if="group.showResults.includes('chapter4')"
        style="font-size: 1rem; font-weight: 600; line-height: 1.4em; margin-top: 2rem">
        Als de aangegeven constructiviteitsscore hoger is dan 0.8, dan is het advies aan de moderatoren om de reactie
        vast
        te pinnen.
      </div>
    </div>
    <ChapterProgress chapter="chapter4" v-if="!group.showResults.includes('chapter4')"></ChapterProgress>
    <videoPlayer file="/videos/2—5.mp4" :class="{ started }" @next="group.startChapter('chapter4')"
      @restart="group.unStartChapter('chapter4')"></videoPlayer>
    <button @click="group.setShowResults('chapter4')" v-if="!group.showResults.includes('chapter4')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter4')">
      <div class="comments" v-if="list">
        <div class="q" v-for="(q, k) in list" @click="open(k)">
          <div class="commentbox">{{ q.text }}</div>
          <div class="pincontainer" :class="{ pin: q.botresult >= 0.8 }">
            <icon icon="pin" v-if="q.botresult >= 0.8"></icon>
            <div>Score van de bot: <b>{{ q.botresult }}</b></div>
          </div>
          <div class="pincontainer klas" :class="{ pin: q.pinned / q.total >= 0.5 }">
            <icon icon="pin" v-if="(q.pinned / q.total) >= 0.5"></icon>
            <b>{{ Math.round((q.pinned / q.total) * 1000) / 10 }}%</b> van de deelnemers zal dit bericht vastpinnen
          </div>
          <label>Klik op het bericht om in te zoomen.</label>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">
          volgend hoofdstuk <icon icon="next"></icon>
        </button>
      </div>
    </div>
    <div class="active" v-if="active !== false">
      <button class="close" @click="active = false">
        <icon icon="cross"></icon>
      </button>
      <div class="active-frame">
        <div class="commentbox">{{ activeContent.text }}</div>
        <div class="bot">
          <div class="iconwrap">
            <div class="boticon">🤖</div>
          </div>
          <div class="name">Bot</div>
          <div class="score">{{ activeContent.botresult }}</div>
        </div>
        <div class="users">
          <div class="user" v-for="user in activeContent.users">
            <div class="iconwrap">
              <UserIcon :user="user"></UserIcon>
            </div>
            <div class='name'>{{ user.name }}</div>
            <div class="score">{{ user.answers?.chapter4[active] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onKeyStroke } from "@vueuse/core";
import chapterlogo from "@/assets/chapters/4.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter4"));
const total = ref([])
const list = computed(() => {
  return questions.chapter4.map((x, k) => {
    total.value[k] = 0
    x.users = [];
    x.total = 0
    x.pinned = 0
    for (let i in group.users) {
      const user = group.users[i];
      const answers = user.answers.chapter4 || false;
      if (answers && !isNaN(answers[k])) {
        x.users.push(user);
        if (!isNaN(answers[k])) {
          x.total++
          if (answers[k] >= 0.8) {
            x.pinned++
          }
        }
      }
    }
    return x;
  });
});

const active = ref<number | false>(false)
const activeContent = computed(() => {
  if (active.value === false || !list.value[active.value]) return
  list.value[active.value].users.sort((a, b) => {
    if (active.value === false || !a.answers.chapter4[active.value]) return -1
    return a.answers.chapter4[active.value] - b.answers.chapter4[active.value]
  })
  return list.value[active.value]
})
function open(k) {
  active.value = k
}
onKeyStroke('Escape', () => {
  active.value = false
})
</script>
<style lang="less" scoped>
.group-chapter-4 {
  padding-bottom: 4rem;
}

.pincontainer {
  font-size: 1rem;
  background: var(--bc);
  color: var(--bg);
  line-height: 1;
  padding: .75rem;
  border-radius: .5rem;
  margin-bottom: .5rem;
  line-height: 1.2em;


  .icon {
    display: block;
    border-radius: 100%;
    float: right;
  }

  &.klas {
    // background: var(--fg);
  }

  &.pin {
    background: var(--gbg);

    &.klas {
      background: var(--bluebg);
    }
  }
}

.comments {
  // width: 60rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  padding: 0rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 80rem) {
    grid-template-columns: 1fr 1fr;

  }

  @media (max-width: 50rem) {
    grid-template-columns: 1fr;

  }

  span {
    font-weight: 500;
  }

  label {
    text-align: center;
  }

  .q {
    cursor: pointer;
    transition: all 0.5s @easeInOutExpo;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.results {
  padding: 1rem 0;

}

.active {
  position: fixed;
  z-index: 9999;
  background: var(--testbg);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  overflow: auto;

  .fadein(0.2s);

  button.close {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1rem;

    @media (min-width: 90rem) {
      margin: 2rem;
    }
  }

  .active-frame {
    .commentbox {
      width: 50rem;
      max-width: calc(100% - 4rem);
      margin: 0 auto 2rem;
      font-size: 1.5rem;
      box-shadow: 0 0 1rem var(--fg2);
      text-align: left;
    }
  }

  .user,
  .bot {
    display: flex;
    width: 14em;
    margin: 0 auto;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--fg2);
    padding: 0.5em 0;
    align-items: center;
    gap: 0.5em;

    .iconwrap {
      width: 2em;

      :deep(.user-icon) {
        transform: none;
      }
    }

    .name {
      flex: 1;
      text-align: left;
    }
  }
}
</style>
