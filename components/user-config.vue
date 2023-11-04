<template>
  <div class="user-config" :class="status">
    <div class="topbar" @click="open = !open" v-if="user.name">
      <user-icon :user="user"></user-icon>
      <div class="flex">{{ user.name }}</div>
      <div class="burger">
        <icon icon="menu" v-if="!open"></icon>
        <icon icon="cross" v-if="open"></icon>
      </div>
    </div>
    <div class="openmenu" v-if="open">
      <div class="status" v-if="open">{{ status }}</div>
      <button class="reset" @click="user.reset()" v-if="user.userid !== ''">
        stoppen
      </button>
    </div>
    <!-- <div class="menu" v-if="open && user.userid">
      <div class="order">
        <div
          class="position"
          v-for="(item, k) in order"
          :class="{ active: k === user.position }"
        >
          {{ item.name }}
        </div>
      </div>
      
    </div> -->
    <div class="loggedoutmenu" v-if="open && !user.userid">
      Bezoek <a href="https://wie-is-de-trol.nl"> wie-is-de-trol.nl</a> voor
      meer informatie.
    </div>
  </div>
</template>
<script lang="ts" setup>
import order from "@/content/order.yml";
const user = useUserStore();
const status = ref("");
const route = useRoute();
const open = ref(false);
watch(
  () => user.connected,
  () => {
    status.value = user.connected ? "connected" : "disconnected";
  }
);
onMounted(() => {
  // if (route.path !== '/deelnemer')
  // TODO: where do you go when you have no id?

  if (route.query.id) {
    user.setGroupid(route.query.id);
  }
  if (!user.mounted) {
    user.init();
  }
});
</script>
<style lang="less" scoped>
.user-config {
  padding: 0em;
  transition: all 0.15s;
  position: sticky;
  top: 0;
  user-select: none;
  // border-bottom: 1px solid var(--fg2);
  z-index: 9;
  border-bottom: 1px solid var(--bg2);
}
.topbar {
  // border-bottom: 1px solid var(--fg);
  display: flex;
  padding: 0 0.5em;
  padding: 0.35em 1em;
  text-align: left;
  background: var(--bg);
  cursor: pointer;
  align-items: center;
  > * {
    // outline: 1px solid #ccc;
    border-radius: 0;
  }
  > .flex {
    padding: 0.75em 0.25em 0.5em 0.25em;
    font-size: 0.8em;
    font-weight: 500;
  }
  > .burger {
    margin-right: 0.5rem;
  }
  .flex {
    flex: 1;
  }
}

.openmenu {
  background: var(--bg);
}


.menu {
  // position: fixed;
  position: relative;
  z-index: 999;
  background: var(--bg);
}

.loggedoutmenu {
  position: relative;
  background: var(--bg);
  padding: 2rem;
}
.status {
  padding: 0em 0.5em;
  --fg: #222;
  color: var(--fg);
  border-radius: 0.25em;
  text-transform: uppercase;
  font-size: 0.6rem;
  // border: 1px solid var(--fg);
  display: inline-block;
  width: auto;
  margin: 0em auto 2em;
  .connected & {
    background: var(--gbg);
    color: var(--gfg);
  }
  .disconnected & {
    background: #d85434;
  }
}
.order {
  padding: 0em 1.5em;
  text-align: left;
  > div {
    border-top: 1px solid var(--bg2);
    padding: 0.75em 0;
    color: var(--fg2);
    &:last-child {
      border-bottom: 1px solid var(--bg2);
    }
    &.active {
      color: var(--fg);
    }
  }
}
button.reset {
  background: var(--rbg);
  color: var(--rfg);
  padding: 0.25em 0.5em;
  border: 0;
  margin: 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
}

:deep(.user-icon) {
  padding: 0;
  margin: 0;
  margin-right: .5em !important;
  background: transparent;
  display:flex;

  @s: 2rem;
  width: @s !important;
  min-width: @s !important;
  height: @s !important;
  min-height: @s !important;
  transform: none !important;
  padding: 0 !important;
  border-radius: 100% !important;
  .icon {
    background: var(--bg1);
    border: 5px solid var(--bg1);
  }
  .name {
    display: none;
  }
}
</style>
