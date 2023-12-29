<script>
import { getRandomColor } from '@/utils'
// const defaultImage = require(`@/assets/images/avatar.png`)
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    textSize: {
      type: Number,
      default: 14,
    },
    size: {
      type: [Number, String],
      default: 50,
    },
    shape: {
      type: String,
      default: 'circle',
    },
    textColor: String,
    defaultImg: {
      type: String,
      default: '@/assets/images/avatar.png',
    },
    thumbnail: {
      type: Boolean,
      default: true,
    },
    nameLetters: {
      type: Number,
      default: 2,
    },
    trimText: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    _color() {
      return this.color || this.getRandomColor()
    },
    _src() {
      if (this.thumbnail) {
        if (!this.src) return this.src
        const hasQuery = /\?/.test(this.src)
        return this.src + (hasQuery ? '&thumbnail' : '?thumbnail')
      }
      return this.src
    },
  },
  methods: {
    getRandomColor() {
      return getRandomColor()
    },

    getFirstCharacterOfEachWordInString(str = '', length = 2) {
      if (!this.trimText) return str
      const regex =
        /^[A-Za-z0-9àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/i
      if (str.length <= length) return str.toUpperCase()
      const matches = str
        .split(' ')
        .map((e) => e[0]?.toUpperCase())
        .filter((e) => regex.test(e))
      const acronym = matches.join('')
      return acronym.length > length ? acronym.slice(0, length) : acronym
    },
  },
}
</script>

<template>
  <span
    :style="{
      width: size + 'px',
      height: size + 'px',
      lineHeight: size + 'px',
      '--color': _color,
    }"
    class="inline-flex app-avatar"
  >
    <el-avatar
      v-if="_src"
      class="break-clear"
      :src="_src"
      :size="size"
      :shape="shape"
    ></el-avatar>

    <el-avatar
      v-else-if="text"
      class="break-clear flex justify-center items-center"
      :size="size"
      :shape="shape"
      :style="{
        backgroundColor: _color,
      }"
    >
      <span :style="{ color: textColor, fontSize: textSize + 'px' }">
        {{ getFirstCharacterOfEachWordInString(text, nameLetters) }}
      </span>
    </el-avatar>

    <el-avatar
      v-else
      class="break-clear"
      :src="defaultImg"
      :size="size"
      :style="{ backgroundColor: '#C0C4CC' }"
      :shape="shape"
    ></el-avatar>
  </span>
</template>

<style lang="scss">
.app-avatar {
  .el-avatar {
    img {
      width: 100%;
    }
  }
}
</style>
