<template>
  <div :class="compStyle">
    <div v-if="title" class="tag-list__title">
      <h3 class="tag-list__title__text">{{ title }}</h3>
    </div>
    <div class="tag-list__body">
      <ul>
        <li
          v-for="label in listData"
          :key="label"
          @click="handleTagItemClick(label)"
        >
          {{ label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'default'
    },
    onItemClick: Function
  },
  computed: {
    compStyle() {
      return `tag-list tag-list__${this.type}`
    }
  },
  methods: {
    handleTagItemClick(label) {
      typeof this.onItemClick === 'function' && this.onItemClick(label)
    }
  }
}
</script>

<style lang="less" scoped>
.tag-list {
  &__title {
    margin: 25px 15px 0 15px;
    font-size: 14px;
    color: #bbb;
    border-bottom: 1px solid #f0f0f0;
  }
  &__body {
    & > ul {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    & > li {
      margin: 0;
      padding: 0;
      list-style: none;
      float: left;
      margin: 15px 15px 0 0;
      padding: 0 10px;
      font-size: 30px;
      line-height: 30px;
      border: 1px solid #f0f0f0;
      border-radius: 30px;
      text-align: center;
      cursor: pointer;
    }
  }
  &.tag-list__default {
    &__body {
      & > li {
        color: #303030;
      }
    }
  }
  &.tag-list__primary {
    &__body {
      & > li {
        color: #f97752;
      }
    }
  }
}
</style>
