<template>
  <div>
    <h-header title="资讯" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HHeader from '@/components/header'
export default {
  components: {
    HHeader
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
  }
}
</script>

<style lang="less" scoped></style>
