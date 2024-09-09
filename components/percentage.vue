<template>
  <div class="percentage">
    <div class="circle"
      :style="{ transform: `scale(${size})`, background: `color-mix(in srgb, var(--rbg) ${percentage}%, var(--gbg))` }">
      {{
        percentage }}%</div>
    <div class='text'>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['total', 'count'])
const size = computed(() => {
  return ((props.count / props.total) * 0.5) + 0.5
})
const percentage = computed(() => {
  return Math.round((props.count / props.total) * 100 * 10) / 10
})
</script>
<style lang="less" scoped>
.percentage {}

.circle {
  background: var(--rbg);
  color: var(--rfg);
  @s: 4rem;
  width: @s;
  height: @s;
  text-align: center;
  line-height: @s;
  border-radius: 100%;
  animation-delay: 2s;
}
</style>