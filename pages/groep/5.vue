<template>
  <div class="group-chapter-5" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Ben je bot?</h1>
    <div class="chapter-toelichting">
      Waar zitten de grootste verschillen tussen het klassengemiddelde en de
      bot? Ben jij het eens met de criteria die de bot lijkt te gebruiken? Tip:
      de bot lijkt een voorkeur te hebben voor lange reacties. Ook lijkt hij te
      selecteren op bepaalde woorden die voorkomen in de reactie.
      <div class="subtoelichting" v-if="group.showResults.includes('chapter5')"
        style="font-size: 1rem; font-weight: 600; line-height: 1.4em; margin-top: 2rem">
        Als de aangegeven constructiviteitsscore hoger is dan 0.8, dan is het advies aan de moderatoren om de reactie
        vast
        te pinnen.
      </div>
    </div>
    <ChapterProgress chapter="chapter5" v-if="!group.showResults.includes('chapter5')"></ChapterProgress>
    <videoPlayer file="/videos/5.mp4" :class="{ started }" @next="group.startChapter('chapter5')"
      @restart="group.unStartChapter('chapter5')"></videoPlayer>
    <button @click="group.setShowResults('chapter5')" v-if="!group.showResults.includes('chapter5')">
      vergelijk resultaten
    </button>
    <div class="results" v-if="group.showResults.includes('chapter5')">
      <div class="comments" v-if="list">
        <div class="q" v-for="(q, k) in list" @click="open(k)">
          <div class="commentbox">{{ q.text }}</div>
          <div class="pincontainer" :class="{ pin: q.botresult >= 0.8 }">
            <icon icon="pin" v-if="q.botresult >= 0.8"></icon>
            <div>Score van de bot: <b>{{ q.botresult }}</b></div>
          </div>
          <div class="pincontainer klas" :class="{ pin: isPinned(q) }">
            <icon icon="pin" v-if="isPinned(q)"></icon>
            <b>{{ percentageVastpinnen(q) }}</b> van de klas zal dit bericht vastpinnen
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
            <div class="score">{{ user.answers?.chapter5[active] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter5"));
const list = computed(() => {
  return questions.chapter5.map((x, k) => {
    x.users = [];
    x.total = 0
    x.pinned = 0
    for (let i in group.users) {
      const user = group.users[i];
      const answers = user.answers.chapter5 || false;
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
    if (active.value === false || !a.answers.chapter5[active.value]) return -1
    return a.answers.chapter5[active.value] - b.answers.chapter5[active.value]
  })
  return list.value[active.value]
})
function open(k) {
  active.value = k
}

function percentageVastpinnen(q) {
  if (q.pinned === 0) return 'Geen'
  if (q.total === 0) return 'Geen'
  return Math.round((q.pinned / q.total) * 1000) / 10 + '%'
}

function isPinned(q) {
  if (q.pinned === 0 || q.total === 0) return false
  return q.pinned / q.total >= 0.5
}
onKeyStroke('Escape', () => {
  active.value = false
})
</script>
<style lang="less" scoped>
.group-chapter-9 {
  padding: 4rem;
}

.text {
  width: 34rem;
  max-width: calc(100% - 2rem);
  margin: 0 auto;

  p {
    margin-bottom: 1em;
  }

  a {
    font-weight: 600;

    &:hover {
      color: var(--bluebg);
    }
  }
}
</style>
