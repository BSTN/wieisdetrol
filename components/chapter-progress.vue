<template>
  <div class="chapter-progress">
    <div class="users">
      <div class="user" v-for="user in group.users">
        <UserAvatar class="small" :user="user"></UserAvatar>
        <div class="name">{{ user.name }}</div>
        <div class="ready" v-if="user.done && user.done.includes(chapter)">
          klaar
        </div>
        <div class="busy" v-else>bezig</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
import questions from "@/content/questions.yml";
import { USER } from "types/types";
const { chapter } = defineProps({
  chapter: {
    type: String,
    default: () => "",
  },
});
// function done(user:USER) {
//   if (chapter === "chapter4") {
//     return user.answers && user.answers[chapter] && user.answers[chapter][0];
//   }
//   return (
//     user.answers &&
//     user.answers[chapter] &&
//     user.answers[chapter].length === questions[chapter].length
//   );
// }
</script>
<style lang="less" scoped>
.chapter-progress {
  margin-bottom: 2rem;
  // border: 1px solid var(--bg);
  // border-width: 1px 0;
  width: 20rem;
  max-width: calc(100% - 2rem);
  margin: 0 auto 2rem;
}

.users {
  // width: 20rem;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 0.25em;
  padding: 1rem 0;
  text-align: center;
  .user {
    // display:inline-block;
    // width: 8rem;
    border-radius: 0.25em;
    margin-bottom: 2px;
    align-items: center;
    position: relative;
    padding: 0.5rem .75rem;
    border: 2px solid var(--bg);
    background:var(--bg);
    display:flex;
    .name {
      padding: 0 0.5em 0 1em;
      font-size: 0.75em;
      flex:1;
      text-align: left;
    }
    :deep(.user-avatar.small) {
      width: 2rem;
      height: 2rem;
      .icon {
        background: var(--bg2);
        border: 0.25em solid var(--bg2);
        width: 2rem;
        height: 2rem;
        border-radius: 0.25rem;
      }
    }
    .ready, .busy {
      // font-size: 0.6rem;
      padding: 0.25em 1em;
      // border: 1px solid var(--fg);
      background: var(--bg1);
      border-radius: 100%;
      border-radius: 0.25rem;
    }
    .busy {
      background: var(--fg);
      color: var(--bg);
    }
  }
}
</style>
