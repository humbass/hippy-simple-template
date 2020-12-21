<template>
  <div id="shadow-demo" class="wrapper">
    <div class="ddd">
      <p>阴影样式</p>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "index",
  methods: {
    save() {
      console.log(123);
      this.$measureInWindow(this.$refs.img1).then(res => console.log("res  ", res));
      // Vue.Native.callUIFunction(this.$refs.img1, "save");
      // this.$refs['img1'].save()
    },
    saveResult({ nativeEventParams }) {
      console.log(nativeEventParams);
    },
    go2(e) {
      this.$navigator.push({
        pageName: "four",
        pageData: { ddd: 11 },
        // animationMode: 'none',
      });
    }
  }
};
</script>
<style scoped>
.wrapper {
  flex: 1;
  justify-content: center;
  align-items: center;
}
.ddd {
  /* box-shadow-offset: 200 100; */
  /* shadow-offset-y: 100; */
  /* box-shadow-opacity: 1;
   */
  shadow-offset-x: 200;
  shadow-offset-y: 200;
  /* box-shadow-offset: 200 100; */
  box-shadow-radius: 20;
  box-shadow-opacity: 1;
  box-shadow-spread: 50;
  box-shadow-color: #dd3434;


  height: 200;
  width: 200;
  /* border-width: 2;
  border-style: solid; */
  /* border-color: rebeccapurple; */
  background-color: rebeccapurple;
}

</style>
