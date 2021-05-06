<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-body">
        <div class="left">
          <span>Devices</span>
        </div>
        <div class="right">
          <span v-if="isScaning" @click="stopScan">SCANING</span>
          <span v-else @click="startScan">SCAN</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="!deviceList.length" class="noblue">
        <img src="mtLocal://assets/noblue.png" alt="" />
      </div>
      <ul v-else :numberOfRows="deviceList.length" :preloadItemNumber="2">
        <li class="li" v-for="(item, index) in deviceList" :key="index">
          <div class="libg">
            <div class="logo">
              <img src="mtLocal://assets/bluetooth2.png" alt="" />
            </div>
            <div class="content">
              <span class="name">{{ item.name || "N/A" }}</span>
              <span class="mac" ellipsizeMode="tail" numberOfLines="1">{{ item.mac }}</span>
              <div class="signal">
                <img src="mtLocal://assets/signal.png" alt="" />
                <span class="rssi">{{ item.rssi }}</span>
              </div>
            </div>
            <div class="connect">
              <span @click="connectDevice(item.mac)">connect</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mac from "./mac.js";
export default {
  name: "App",
  data() {
    return {
      isNotify: false,
      isScaning: false,
      isConnect: false,
      deviceList: [],
      device: {},
    };
  },
  mounted() {},
  computed: {
    isIos() {
      return this.$platform === "ios";
    },
    serviceUuid() {
      return this.isIos ? "FFA0" : "0000ffa0-0000-1000-8000-00805f9b34fb";
    },
    notifyUuid() {
      return this.isIos ? "FFA1" : "0000ffa1-0000-1000-8000-00805f9b34fb";
    }
  },
  methods: {
    connectDevice(item) {
      try {
        const data = {
          pageName: "device", //需要跳转的页面
          pageData: { mac: mac.android }, //需要传递的参数
          statusBarStyle: "LightContent", //状态栏文字颜色为黑色
          backgroundColor: "#0099da", //状态栏的背景颜色为红色
          transparent: true, //不穿透
          animationMode: "slide_b2t", //页面切换的模式为从上往下
          translucent: false //是否使用透明页面
          // loadingViewBackgroundColor: "#0099da" //页面默认的背景颜色
        };
        this.$navigator.push(data);
      } catch (error) {
        console.log("error", error);
      }
    },
    onBleEvent(event) {
      console.log("onBleEvent", event);
      const { eventName, data } = event;
      switch (eventName) {
        case "onScanning":
          this.deviceList.push(data);
          this.isScaning = true;
          break;
        case "onScanFinished":
          this.isScaning = false;
          break;
        case "onConnectSuccess": //连接断开
          this.bleStatus = "连接断开";
          break;
      }
    },
    async checkBluetooth() {
      try {
        if (this.isNotify) {
          return;
        }
        const check = await this.$bluetooth.check();
        if (check) return false;
        this.$bluetooth.onBleEvent(this.onBleEvent);
        return true;
      } catch (error) {
        console.log("error", error);
      }
    },
    async startScan() {
      try {
        const result = await this.checkBluetooth()
        if (!result) {
          return this.$dialog.toast('Bluetooth status fail')
        }
        this.$bluetooth.startScan();
      } catch (error) {
        console.log("error", error);
      }
    },
    async stopScan() {
      try {
        const check = await this.$bluetooth.check();
        if (check) return;
        console.log('check', check)
        this.$bluetooth.stopScan();
      } catch (error) {
        console.log("error", error);
      }
    },
    async connect() {
      try {
        const check = await this.$bluetooth.connect();
        if (check) return;
        console.log('check', check)
        this.$bluetooth.stopScan();
      } catch (error) {
        console.log("error", error);
      }
    },
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
  flex: 1;
  align-items: center;
  justify-content: center;
}
.main .noblue img {
  width: 100;
  height: 100;
  margin-top: -150;
}

.main ul li {
  height: 102;
  background-color: #ccc;
  justify-content: center;
}

.main ul li .libg {
  height: 100;
  padding: 10;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
}

.main ul li .libg .logo {
  width: 36;
  height: 36;
  border-radius: 20;
  background-color: #0099da;
  align-items: center;
  justify-content: center;
}
.main ul li .libg .logo img {
  width: 24;
  height: 24;
}

.main ul li .libg .content {
  flex: 1;
  padding-left: 10;
  padding-right: 10;
  justify-content: space-between;
}
.main ul li .libg .content .name {
  font-weight: bold;
  font-size: 18;
}

.main ul li .libg .content .signal {
  flex-direction: row;
}

.main ul li .libg .content .signal img {
  width: 18;
  height: 18;
  margin-right: 10;
}

.main ul li .libg .connect {
  height: 28;
  border-radius: 4;
  background-color: black;
  justify-content: center;
  align-items: center;
}

.main ul li .libg .connect span {
  padding: 8;
  color: white;
}
</style>
