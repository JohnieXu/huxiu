<template>
  <div class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="logo">
      <img src="~/assets/logo.png" />
    </div>
    <div class="right">
      <div class="category">
        <van-icon
          name="apps-o"
          size="24"
          style="line-height: inherit;"
          @click="onCategoryClick"
        />
      </div>
      <div class="search">
        <van-icon
          name="search"
          size="24"
          style="line-height: inherit;"
          @click="onSearchClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* 公共头部组件 */
export default {
  name: 'HHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    onCategoryClick() {
      this.$emit('on-category-click')
    },
    onSearchClick() {
      this.$emit('on-search-click')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: sticky;
  top: 0;
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: center;
  // margin: 10px 0;
  padding: 0 12px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  z-index: 999;
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 600;
  }
  .logo {
    flex: 0 0 45px;
    img {
      width: 100%;
      margin-top: 5px;
    }
  }
  .right {
    flex: 1;
    text-align: right;
    .category {
      display: inline-block;
      margin-right: 5px;
    }
    .search {
      display: inline-block;
    }
  }
}
</style>
