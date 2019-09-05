<template>
  <div class="loadmore" @click="handleClick">
    <template v-if="!isLoading">
      <slot>{{ text }}</slot>
    </template>
    <template v-else>
      <slot name="loading">{{ loadingText }}</slot>
    </template>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  props: {
    text: {
      type: String,
      default: '点击加载更多'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    loading: {
      type: Boolean,
      default: undefined,
      required: false
    },
    loadMore: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      cloading: false
    }
  },
  computed: {
    isLoading() {
      return typeof this.loading === 'undefined' ? this.cloading : this.loading
    }
  },
  methods: {
    handleClick() {
      if (this.isLoading) {
        return
      }
      this.cloading = true
      // 受控方式-触发on-start事件
      this.$emit('on-start')
      // 存在loadMore方法-非受控方式-组件接管loading状态和执行请求数据方法
      this.$nextTick().then(async () => {
        if (typeof this.loadMore === 'function') {
          try {
            const res = await this.loadMore()
            this.$emit('on-success', res.data || [])
          } catch (e) {
            this.$emit('on-error', e)
          }
          this.cloading = false
        }
      })
    },
    closeLoading() {
      this.cloading = false
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.loadmore {
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #999;
  font-size: 15px;
}
</style>
