<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-body">
        <div class="left">
          <span>id</span>
        </div>
        <!-- <div class="right">
          <span>SCAN</span>
        </div> -->
      </div>
    </div>
    <div class="main">
      <div class="noblue">
        <img src="mtLocal://assets/noblue.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      deviceList: []
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    async show() {
      await this.$nextTick()
      console.log("item", this.$superProps.mac);
    }
  }
};
</script>

<style scoped>
.wrapper {
  flex: 1;
}
.header {
  height: 100;
  background-color: #0099da;
  justify-content: flex-end;
}
.header-body {
  height: 60;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
}
.header-body .left span {
  font-size: 20;
  font-weight: bold;
  color: #ffffff;
}

.header-body .right span {
  color: #ffffff;
}

.main {
  flex: 1;
  background-color: #ebe7eb;
}

.main .noblue {
  position: absolute;
  align-items: center;
  justify-content: center;
}
.main .noblue img {
  width: 160;
  height: 160;
  margin-top: -150;
}
</style>
