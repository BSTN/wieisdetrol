<template>
  <div class="bot-slider">
    <div class="labels">
      <label><icon icon="prev"></icon> niet-constructief</label>
      <label>constructief <icon icon="next"></icon></label>
    </div>
    <div class="frame">
      <!-- {{ val }} -->
      <Slider
        class="theslider"
        v-model="val"
        :min="0"
        :max="1"
        :step="0.01"
        :tooltips="false"
        tooltipPosition="top"
        :lazy="false"
      ></Slider>
      <div class="stripes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
const user = useUserStore();

import Slider from "@vueform/slider";
const { number, data, chapter } = defineProps(["data", "number", "chapter"]);
const emit = defineEmits(["change"]);
const { getAnswer } = storeToRefs(user);

watch(
  () => data,
  () => {
    val;
    console.log(data);
  }
);

const val = computed({
  get() {
    return user.getAnswer({ chapter, k: number }) || 0;
  },
  set(val) {
    emit("change", { data: val, k: number });
  },
});
</script>
<style lang="less" scoped>
.bot-slider {
  padding: 0 1em;
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
.frame {
  position: relative;
  margin-bottom: 2rem;
}

.stripes {
  position:absolute;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  z-index:2;
  pointer-events: none;
  div {
    position:absolute;
    height: 100%;
    border-left: 2px solid var(--bg);
    top:0;
    &:nth-child(1) { left: 20%; }
    &:nth-child(2) { left: 40%; }
    &:nth-child(3) { left: 60%; }
    &:nth-child(4) { left: 80%; }
  }
}
.theslider {
  background: var(--bg2);
  border-radius: 0.25em;
  --slider-bg: var(--bg3);
  --slider-connect-bg: var(--fg);
  :deep(.slider-origin) {
    // right: 0;
    // left: auto;
    // border: 2px solid var(--fg);
  }
}
</style>
