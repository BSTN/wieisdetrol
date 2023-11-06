<template>
  <div class="group-config" :class="status">
    <div class="menubutton" @click="open = !open">
      <icon icon="menu" v-if="!open"></icon>
      <icon icon="cross" v-else></icon>
    </div>
    <div class="menu" :class="{ open }">
      <div class="status"></div>
      <div class="chapters">
        <div class="chapter" v-for="item in order">
          <nuxt-link
            :to="item.group == '/' ? '' : '/groep/' + String(item.group)"
            :class="{
              active: group.started.includes(item.ref) || item.ref === 'intro',
            }"
            >{{ item.name }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import order from "@/content/order.yml";
const group = useGroupStore();
const status = ref("");
const route = useRoute();
const open = ref(false);
watch(
  () => route.path,
  (to, from) => {
    const newto = to.replace("/groep/", "");
    // const oldfrom = from ? from.replace('/groep/', '') : false
    // if (oldfrom && newto !== '/' && oldfrom !== '/' && !isNaN(newto) && !isNaN(oldfrom) && newto > oldfrom) { return false }
    if ((newto === "/" && from !== "/") || !from) {
      return false;
    }
    let index = 0;
    if (newto === "/") {
      index = 0;
    } else {
      index = order.findIndex((x) => x.group == newto);
    }
    group.next(index);
  },
  { deep: true, immediate: true }
);

watch(
  () => group.connected,
  () => {
    status.value = group.connected ? "connected" : "disconnected";
  }
);
onMounted(async () => {
  if (!group.mounted) {
    await group.init();
  }
});
</script>
<style lang="less" scoped>
.group-config {
  padding: 0em;
  transition: all 0.15s;
  position: relative;
  z-index: 99;
}
.status {
  float: right;
  padding: 0.25em 0.5em;
  background: #e1de9b;
  --fg: #222;
  color: var(--fg);
  border-radius: 0.25em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 1em;
  position: fixed;
  right: 0;
  top: 0;
  border: 1px solid var(--fg);
  .connected & {
    background: #a5de93;
  }
  .disconnected & {
    background: #d85434;
  }
}

.menubutton {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1.5em;
  z-index: 99;
}

.menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 24rem;
  height: 100vh;
  background: var(--bg);
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 0.5rem var(--shadow);
  transition: all 0.3s;
  transform: translateX(3rem);
  &.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0rem);
  }
}
.chapters {
  margin: 4rem 2rem;
  .chapter {
    padding: 0.5em 0;
    border-top: 1px solid var(--bc);
    text-align: left;
    a {
      text-decoration: none;
      opacity: 0.25;
      pointer-events: none;
      &:hover {
        color: var(--bluebg);
      }
      &.active {
        opacity: 1;
        pointer-events: none;
        .open & {
          pointer-events: auto;
        }
      }
    }
  }
}

// button.reset {
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   background: #f00;
//   padding: 0.25em 0.5em;
//   border: 1px solid var(--fg);
//   margin: 1rem;
//   text-transform: uppercase;
//   font-size: 0.8rem;
// }
</style>
