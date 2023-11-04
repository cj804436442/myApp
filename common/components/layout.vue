<template>
  <div class="fly-layout" :class="{'fly-layout--padding': padding}">
    <div
      v-if="$left"
      class="fly-layout__block fly-layout__left"
      :class="{'fly-layout__left--folded': isLeftFolded}"
      :style="{'width': `${$left}px`}"
    >
      <slot name="left" />
    </div>
    <div
      class="fly-layout__block fly-layout__center"
      :style="{
        width: `calc(100% - ${
          (isLeftFolded ? 0 : $left)
          +
          (isRightFolded ? 0 : $right)
        }px)`
      }"
    >
      <span
        v-if="leftFoldable && $left"
        class="fly-layout__left-action"
        :class="{
          'fly-layout__left-action--reversed': isLeftFolded
        }"
        @click="toggleLeftFolded"
      >
        <i :class="isLeftFolded ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </span>
      <span
        v-if="rightFoldable && $right"
        class="fly-layout__right-action"
        :class="{
          'fly-layout__right-action--reversed': isRightFolded
        }"
        @click="toggleRightFolded"
      >
        <i :class="isRightFolded ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
      </span>
      <slot name="center" />
    </div>
    <div
      v-if="$right"
      class="fly-layout__block fly-layout__right"
      :class="{'fly-layout__right--folded': isRightFolded}"
      :style="{'width': `${$right}px`}"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script>
/**
 * 横向left | center | right布局
 */
export default {
  name: "fly-layout",
  props: {
    left: { type: String, default: "220" },
    right: { type: String, default: "0" },
    "left-foldable": {
      type: Boolean,
      default: true,
    },
    "right-foldable": {
      type: Boolean,
      default: false,
    },
    padding: { type: Boolean, default: false },
  },
  computed: {
    $left() {
      return Number(this.left) || 0
    },
    $right() {
      return Number(this.right) || 0
    },
  },
  data() {
    return {
      isLeftFolded: false,
      isRightFolded: false,
    }
  },
  methods: {
    toggleLeftFolded() {
      this.isLeftFolded = !this.isLeftFolded
    },
    toggleRightFolded() {
      this.isRightFolded = !this.isRightFolded
    },
  },
}
</script>

<style lang="less" scoped>
@space: 8px;
.fly-layout {
  @transition: all ease 0.3s;
  @border: 1px solid #d9d9d9;
  position: relative;
  display: flex;
  background: white;
  &__block {
    transition: @transition;
  }
  &--padding &__block {
    padding: @space * 2;
  }
  // 左右区块
  &__left,
  &__right {
    position: relative;
    align-items: stretch;
    &:after {
      content: "";
      position: absolute;
      border-right: @border;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
    }
  }
  &__right {
    &:after {
      left: 0;
    }
  }
  &__left--folded,
  &__right--folded {
    width: 0 !important;
    opacity: 0;
    visibility: hidden;
    padding: 0 !important;
    overflow: hidden;
  }
  // 中间区块
  &__center {
    position: relative;
    align-items: stretch;
    z-index: 1;
  }
  // 左右按钮
  &__left-action,
  &__right-action {
    cursor: pointer;
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 60px;
    background: #f8faff;
    &:hover {
      background: #f0f4ff;
    }
    border: 1px solid #ced5e8;
    & i {
      line-height: 60px;
      font-size: 12px;
      color: #737f9a;
      transform: translateX(-2px);
    }
  }
  &__left-action {
    left: -10px;
    z-index: 2;
    border-radius: 3px 0 0 3px;
    &--reversed {
      left: 0px;
      border-radius: 0 3px 3px 0px;
    }
  }
  &__right-action {
    right: -10px;
    z-index: 2;
    border-radius: 0 3px 3px 0px;
    &--reversed {
      right: 0px;
      border-radius: 3px 0 0 3px;
    }
  }
}
</style>