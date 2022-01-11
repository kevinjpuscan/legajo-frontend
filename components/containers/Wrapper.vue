<template>
  <div :class="`wrapper-${type}`">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => "md",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.wrapper-sm {
  padding: 0 1rem;
  @media screen and (min-width: $breakpoint-mobile) {
    padding: 0 3rem;
  }
}
.wrapper-md {
  padding: 0 1rem;
  @media screen and (min-width: $breakpoint-mobile) {
    padding: 0 8rem;
  }
}
.wrapper-lg {
  padding: 0 13rem;
}
</style>
