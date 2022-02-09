<template>
  <Wrapper>
    <div style="padding-top: 3rem">
      <b-skeleton width="100%" :animated="animated"></b-skeleton>
      <b-skeleton width="100%" :animated="animated"></b-skeleton>
      <b-skeleton width="100%" :animated="animated"></b-skeleton>
      <b-skeleton width="100%" :animated="animated"></b-skeleton>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from '~/components/containers/Wrapper.vue'
export default {
  components: { Wrapper },
}
</script>
