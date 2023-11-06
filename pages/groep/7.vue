<template>
  <div class="group-chapter-7" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Beat-the-bot!</h1>
    <div class="chapter-toelichting">
      Welke reacties score het hoogst en welke het laagst? Krijgen jullie nu nog
      een beter inzicht in de manier waarop de bot een construciviteitsscore
      berekent?
    </div>
    <videoPlayer
      file="/videos/7.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter7')"
      @restart="group.unStartChapter('chapter7')"
    ></videoPlayer>
    <div class="scorebord">
      <label>Scorebord</label>
      <div class="bg"></div>
      <div class="frame">
        <div class="user" v-for="user in highscore">
          <div class="topbar">
            <div class="iconframe">
              <userIcon :user="user"></userIcon>
            </div>
            <div class="name">{{ user.name }}</div>
            <div class="result">
              {{
                user.answers && user.answers.chapter7
                  ? Math.round(user.answers.chapter7[0].score * 100)
                  : 0
              }}%
            </div>
          </div>
          <div class="text">
            <div class="commentbox">
              {{ user.answers.chapter7[0].text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next">
      <button @click="group.next()">Afronden <icon icon="next"></icon></button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter7"));
const highscore = computed(() => {
  const users = JSON.parse(JSON.stringify(group.users));
  users.sort((a, b) => {
    if (
      !a.answers ||
      !a.answers.chapter7 ||
      !b.answers ||
      !b.answers.chapter7
    ) {
      return -1;
    }
    a.answers.chapter7[0].score - b.answers.chapter7[0].score;
  });
  return users;
});
</script>
<style lang="less" scoped>
.group-chapter-7 {
}

.scorebord {
  position: relative;
  width: 34rem;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 0.5em;
  overflow: hidden;
  background: var(--testbg);
  box-shadow: inset 0 0 1rem var(--bg3);
  box-shadow: 0 0 1rem var(--bg3);
  label {
    position: relative;
    z-index: 2;
    color: var(--bg);
    text-transform: uppercase;
    background: #1a2e46;
    margin: 2em 0 4em;
    display: inline-block;
    border-radius: 0.25em;
    letter-spacing: 0.05em;
    font-weight: 500;
  }
  .bg {
    // background: url("/motherboard.jpg");

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-size: cover;
    background-position: center;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   background: #1a2e46;
    //   opacity: 0.7;
    // }
  }
  .frame {
    position: relative;
    z-index: 2;
  }
}

.user {
  width: 30rem;
  margin: 0 auto;
  .topbar {
    display: flex;
    background: var(--bg);
    padding: 0.5em 1em;
    border-radius: 0.25em;
    align-items: center;
    .iconframe {
      width: 2rem;
      height: 2rem;
    }
    .user-icon {
      width: 2rem;
      height: 2rem;
      padding: 0;
    }
    :deep(.icon) {
      background: var(--bg1);
      width: 2rem;
      height: 2rem;
      padding: 0;
      margin: 0;
    }
    .name {
      padding-left: 0.75rem;
      font-weight: 500;
      flex: 1;
      text-align: left;
    }
    .result {
      padding-right: 0.5rem;
      font-weight: 500;
    }
  }
  .text {
    padding: 0.5em 0 2em 4em;
    text-align: left;
  }
}
</style>
