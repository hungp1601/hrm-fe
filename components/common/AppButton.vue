<script>
import { ElButton } from 'element-plus'

export default {
  name: 'AppButton',
  extends: ElButton,
  props: {
    iconSize: [Number, String],
    color: String,
    text: String,
    border: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    background: {
      type: String,
    },
    template: {
      type: String,
    },
    placementTooltip: {
      type: String,
    },
    tabindex: [Number, String],
    iconStyle: [String, Object],
    iconClass: [String, Object],
    buttonSize: String,
    disabled: Boolean,
  },

  computed: {
    buttonTemplates() {
      return {
        create: {
          type: 'primary',
          text: 'Thêm mới',
          icon: 'el-icon-plus',
        },
        delete: {
          type: 'danger',
          text: 'Xóa',
          icon: 'el-icon-delete',
        },
        edit: {
          type: 'primary',
          text: 'Chỉnh sửa',
          icon: 'el-icon-edit',
        },
        save: {
          type: 'success',
          text: 'Lưu',
          icon: 'el-icon-finished',
        },
        view: {
          type: 'primary',
          text: 'xem chi tiết',
          icon: 'el-icon-view',
        },
        cancel: {
          type: 'info',
          text: 'Hủy',
        },
        more: {
          type: 'info',
          icon: 'el-icon-more-outline',
        },
      }
    },

    slots() {
      const slots = { ...this.$slots }
      delete slots.default
      return slots
    },
    props() {
      const props = { ...this.$props }
      if (this.template && buttonTemplates[this.template]) {
        const template = buttonTemplates[this.template]
        Object.keys(template).forEach((key) => {
          if ([undefined, null, ''].includes(this.$options.propsData[key])) {
            props[key] = template[key]
          }
        })
      }
      if (this.iconOnly) {
        props.text = ''
      }

      return props
    },
    elButtonProps() {
      const { icon, border, plain, ...props } = this.props
      return props
    },
    theme() {
      return {
        color: this.color,
      }
    },
  },
}
</script>

<template>
  <el-tooltip
    v-if="tooltip"
    effect="dark"
    :content="tooltip"
    :placement="placementTooltip"
  >
    <app-button v-bind="$props" :tooltip="null" v-on="$listeners"></app-button>
  </el-tooltip>
  <ElButton
    v-else
    class="el-button app-button"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + props.type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-border': border,
        'icon-only': iconOnly,
      },
    ]"
    :style="{
      '--button-color': theme.color,
      '--background-color': background,
      color,
    }"
    @click="handleClick"
  >
    <div v-if="loading" class="element-to-rotate">
      <app-icon name="bi-arrow-repeat"></app-icon>
    </div>

    <div class="mr-1">
      <app-icon
        v-if="props.icon && !loading"
        :name="props.icon"
        :style="iconStyle"
        :class="iconClass"
        :size="iconSize || 16"
        :color="plain ? theme.color : undefined"
      ></app-icon>
    </div>

    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <span v-else-if="props.text">{{ props.text }}</span>
    <span v-else style="margin: 0 !important"></span>
  </ElButton>
</template>

<style lang="scss">
.app-button {
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .element-to-rotate {
    animation: rotate infinite 1s linear; /* Adjust the duration and timing function as needed */
  }
}
</style>
