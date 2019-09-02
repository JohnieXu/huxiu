<template>
  <div class="article">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HArticle',
  props: {}
}
</script>

<style lang="less" scoped>
@import './article.less';
</style>
