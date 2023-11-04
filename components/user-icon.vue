<template>
  <div class="user-icon" v-if="user && user.userid && user.userid !== ''">
    <div class="icon" v-html="tempIcon(user.userid)"></div>
  </div>
</template>
<script lang="ts" setup>
const { tempIcon } = useUserStore();
const { user } = defineProps({
  user: {
    type: [Object, Boolean],
    default: false,
  },
});
</script>
<style lang="less" scoped>
@import "@/less/ease.less";
.user-icon {
  @s: 1.5em;
  display: inline-block;
  padding: @s * 0.2;
  color: var(--fg2);
  width: @s;
  min-width: @s;
  height: @s;
  min-height: @s;
  background: var(--bg);
  margin: 0;
  border-radius: 100%;
  transition: all 0.3s @easeInOutExpo;
  vertical-align: text-top;
  transform: translateY(@s * -0.1);
  &:hover {
    transform: scale(1.05);
  }
}
.icon {
  background: var(--bg);
  border-radius: 0.25em;
  // @size: 6rem;
  // width: @size;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  :deep(svg) {
    margin: 0;
    padding: 0;
    display: block;
  }
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.25em 0;
}
</style>
