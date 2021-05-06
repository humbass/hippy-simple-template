<template>
  <div id="root">
    <div id="body" :style="{ 'margin-top': barHeight }">
      <p class="pText" style="color: red">{{ bleStatus }}</p>
      <div class="btnDiv">
        <p class="btn" @click="checkBle">检查蓝牙</p>
        <p class="btn" @click="enableBle">打开蓝牙</p>
        <p class="btn" @click="disableBle">关闭蓝牙</p>
      </div>
      <div class="btnDiv">
        <p class="btn" @click="startScan">开始扫描</p>
        <p class="btn" @click="stopScan">停止扫描</p>
        <p class="btn" @click="changeLen(1)">{{len}}</p>
        <p class="btn" @click="changeLen(-1)">-</p>
      </div>
      <ul style="margin-top: 10" :numberOfRows="devicesList.length" :preloadItemNumber="2">
        <li v-for="(data, index) in devicesList" v-bind:key="index">
          <div id="itemDiv">
            <div style="flex-direction: row">
              <div style="flex-direction: column">
                <p class="pText">蓝牙名称：{{ data.name }}</p>
                <p class="pText">MAC地址：{{ data.mac }}</p>
                <p class="pText">信号强度：{{ data.rssi }}</p>
              </div>
              <div style="flex-direction: row; height: 45">
                <p class="btn" @click="connect(data)">
                  {{ data.isConnect ? "断开" : "连接" }}
                </p>
                <p class="btn" @click="notify(data)">
                  {{ data.isNotify ? "取消" : "监听" }}
                </p>
              </div>
            </div>
            <div style="height: 1; background-color: red; margin-top: 10"></div>
          </div>
        </li>
      </ul>

      <div
        style="
          margin-top: 10;
          margin-bottom: 10;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        "
        v-if="isConnect"
      >
        <input
          class="border"
          style="
            font-size: 16;
            flex: 1;
            width: 280;
            placeholder-text-color: white;
            color: blue;
          "
          placeholder="请输入发送内容"
          v-model="inputMessage"
          ref="input"
        />
        <p class="btn" @click="send(itemData)">发送</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const { window, screen } = Vue.Native.Dimensions;
export default {
  name: "App",
  props: ["jsParams", "msgFromNative"],
  data() {
    return {
      len: 180,
      bleStatus: "蓝牙状态",
      inputMessage: "", //输入的消息
      devicesList: [], //扫描后的数据列表
      itemData: null, //操作的数据
      isConnect: false, //是否显示发送框
      barHeight: screen.statusBarHeight //状态栏高度
    };
  },
  mounted() {
    this.$nextTick(() => {
      //回调监听
      this.$app.$on("onBleEvent", res => {
        switch (res.eventName) {
          case "onScanning": //扫描中
            this.bleStatus = "正在扫描...";
            //const data = res.data;
            if (res.data.name) {
              res.data.isConnect = false; //是否连接
              this.isConnect = false;
              res.data.isNotify = false; //是否打开了通知
              res.data.inputMsg = ""; //需要发送的内容
              this.devicesList.push(res.data);
              console.log("数据打印:" + JSON.stringify(this.devicesList));
            }
            break;
          case "onScanFinished": //扫描完成
            this.bleStatus = "扫描完成";
            break;
          case "onNotify": //通知回调
            this.bleStatus = "收到的数据:" + res.data;
            break;
          case "onConnectSuccess": //连接成功
            this.bleStatus = "连接成功";
            console.log("连接成功:" + JSON.stringify(res.data));
            break;
          case "onConnectFail": //连接失败
            this.bleStatus = "连接失败";
            break;
          case "onDisConnected": //连接断开
            this.bleStatus = "连接断开";
            break;
          case "onState": //蓝牙状态
            switch (res.data) {
              case 1: //开启
                this.bleStatus = "蓝牙已开启";
                break;
              case 2: //关闭
                this.bleStatus = "蓝牙关闭";
                break;
            }
            break;
          case "onError": //出错
            this.bleStatus = res.data;
            console.log("出错了:" + JSON.stringify(res.data));
            break;
        }
      });
    });
  },
  computed: {
    isIos() {
      return this.$platform === 'ios'
    },
    serviceUuid() {
      return this.isIos ? 'FFA0' : '0000ffa0-0000-1000-8000-00805f9b34fb'
    },
    notifyUuid() {
      return this.isIos ? 'FFA1' : '0000ffa1-0000-1000-8000-00805f9b34fb'
    }
  },
  methods: {
    changeLen(n) {
      this.inputMessage = ''
      this.len += n
      for (let i = 0; i < this.len; i ++) {
        if (i == this.len - 1) {
          this.inputMessage += 'c'
        } else {
          this.inputMessage += 'a'
        }
      } 
    },
    checkBle() {
      //检查蓝牙
      Vue.Native.callNativeWithPromise("BluetoothModule", "check").then(result => {
        switch (result) {
          case 0: //蓝牙已打开
            this.bleStatus = "蓝牙已打开";
            break;
          case 1: //不支持蓝牙
            this.bleStatus = "不支持蓝牙";
            break;
          case 2: //蓝牙没打开
            this.bleStatus = "蓝牙没打开";
            break;
        }
      });
    },
    enableBle() {
      //打开蓝牙
      Vue.Native.callNative("BluetoothModule", "enable");
    },
    disableBle() {
      //关闭蓝牙
      Vue.Native.callNative("BluetoothModule", "disable");
    },
    startScan() {
      this.devicesList.length = 0;
      //开始扫描
      Vue.Native.callNative("BluetoothModule", "startScan");
    },
    stopScan() {
      //停止扫描
      Vue.Native.callNative("BluetoothModule", "stopScan");
    },
    connect(data) {
      this.itemData = data;
      if (!data.isConnect) {
        //连接操作
        Vue.Native.callNative("BluetoothModule", "connect", data.mac);
        data.isConnect = true;
        this.isConnect = true;
      } else {
        //断开操作
        Vue.Native.callNative("BluetoothModule", "disConnect", data.mac);
        data.isConnect = false;
        this.isConnect = false;
      }
    },
    notify(data) {
      const serviceUuid = this.serviceUuid
      const notifyUuid = this.notifyUuid
      if (data.isNotify) {
        //取消消息通知
        Vue.Native.callNative("BluetoothModule", "unNotify", {
          mac: data.mac,
          serviceUuid,
          notifyUuid,
        });
        data.isNotify = false;
        this.bleStatus = "已关闭通知";
      } else {
        //打开消息通知
        Vue.Native.callNativeWithPromise("BluetoothModule", "notify", {
          mac: data.mac, //MAC地址
          serviceUuid,
          notifyUuid,
        })
          .then(() => {
            data.isNotify = true;
            this.bleStatus = "订阅消息成功";
          })
          .catch(e => {
            this.bleStatus = "订阅消息失败," + e.msg;
          });
      }
    },
    send(data) {
      const serviceUuid = this.serviceUuid
      const writeUuid = this.notifyUuid
      data.inputMsg = this.inputMessage;
      console.log(`this.inputMessage `, this.inputMessage)
      //发送内容
      Vue.Native.callNativeWithPromise("BluetoothModule", "write", {
        mac: data.mac, //MAC地址
        serviceUuid,
        writeUuid, //写入特征值
        data: data.inputMsg //写入的内容
      })
        .then(() => {
          this.bleStatus = "写入成功";
          data.inputMsg = "";
        })
        .catch(e => {
          this.bleStatus = "写入失败," + e.msg;
        });
    }
  }
};
</script>

<style scoped>
#root {
  flex: 1; /*0=包裹内容 1=占满屏幕 LinearLayout权重*/
  flex-direction: column; /*指定方向*/
  /*justify-content: center; 定义了项目在主轴上的对齐方式*/
  position: relative;
  /*align-items: center; 定义项目在交叉轴上如何对齐*/
}
#body {
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #999999;
}
.border {
  border-color: red;
  border-style: solid;
  border-width: 1;
}
.btnDiv {
  flex-direction: row;
}
#itemDiv {
  flex-direction: column;
}
.btn {
  border-color: blue;
  border-style: solid;
  border-width: 1;
  font-size: 16;
  color: #ffffff;
  padding: 5;
  margin: 5;
}
.pText {
  font-size: 16;
  color: #ffffff;
}
</style>
