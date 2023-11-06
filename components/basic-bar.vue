<template>
  <div class="basic-bar">
    <div class="bar"><div class="content" :style="style"></div></div>
    <div class="label"><slot></slot></div>
  </div>
</template>
<script lang="ts" setup>
const { count, total } = defineProps({
  count: {
    type: Number,
    default: () => 0,
  },
  total: {
    type: Number,
    default: () => 0,
  },
});

const style = computed(() => {
  return { width: (count / total) * 100 + "%" };
});
</script>
<style lang="less" scoped>
.basic-bar {
  width: 100%;
  margin-bottom: 0.5em;
  border-radius: 0.25rem;
  .bar {
    background: var(--bg);
    border-radius: 0.25rem;
    height: 1.5rem;
    display: block;
    border-left: 0.5rem solid var(--bluebg);
    color: var(--bluefg);
    white-space: nowrap;
    overflow: hidden;
    min-width: 1rem;
    position: relative;
    .content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: var(--bluebg);
    }
  }
  .label {
    color: var(--bluebg);
    font-size: 0.7rem;
    padding: 0.5em 0;
    text-transform: uppercase;
  }
}
</style>
