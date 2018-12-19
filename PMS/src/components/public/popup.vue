<template>
  <transition name="fade">
    <div class="popup-box" v-show="popupShow">
      <div class="popup bg-fff" @click.stop :style="{'width': popup.width +'px','z-index':popup.z_index}">
        <div class="popup-head">
          <div class="popup-title">{{popup.title}}</div>
          <div class="el-icon-close" @click.stop.prevent="$emit('popupOp','cancel')"></div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="popup-option">
          <el-button size="mini" @click="$emit('popupOp','cancel')">{{popup.cancelText}}</el-button>
          <el-button type="primary" size="mini" @click="$emit('popupOp','confirm')">{{popup.confirmText}}</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    popup: {
      title: String,
      width: {
        type: Number,
        default: 600
      },
      z_index: {
        type: Number,
        default: 999
      },
      confirmText: String,
      cancelText: String
    }
    // popupShow:Boolean
  },
  data() {
    return {
      popupShow: false
    };
  },
  methods: {
    close() {
      this.popupShow = !this.popupShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.popup-box {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  & > * {
    box-sizing: border-box;
  }
  .popup-head {
    padding: 0 20px;
    color: #fff;
    font-size: 14px;
    background-color: #00a8ff;
    display: flex;
    align-items: center;
    .popup-title {
      width: 100%;
      height: 35px;
      line-height: 35px;
    }
    .el-icon-close {
      font-size: 18px;
    }
  }
  & > .content {
    padding: 29px 24px;
    padding-left: 40px !important;
    padding-right: 40px !important;
  }
  .popup-option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px !important;
    padding-top: 10px !important;
    & > button {
      width: 98px;
      height: 28px;
    }
    button + button {
      margin-left: 10px;
    }
  }
}
</style>
