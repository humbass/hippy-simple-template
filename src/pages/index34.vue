<template>
  <div id="shadow-demo" class="wrapper">
    <div :style="wrapperStyle">
      <ul @endReached="endReached">
        <li v-for="(item, index) in list" :key="item">
          <div class="li" :style="liStyle">
            <span>{{ index }}::{{ item }}</span>
          </div>
        </li>
        <!-- :sticky="true" -->
        <!-- <pull-footer
        ref="pullFooter"
        class="pull-footer"
        @idle="onIdle"
        @pulling="onPulling"
        @released="onEndReached"
      >
        <p class="pull-footer-text">{{ refreshText }}</p>
      </pull-footer> -->
      </ul>
    </div>
  </div>
</template>

<script>
function createArr() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.random());
  }
  return arr;
}
function timer(sec = 3) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec * 1000);
  });
}

const STYLE_LOADING = 100;
const MAX_FETCH_TIMES = 50;
const REFRESH_TEXT = "继续上拉后松手，将会加载更多";
export default {
  name: "index",
  data() {
    return {
      list: createArr(),
      refreshText: REFRESH_TEXT,
      isLoading: false
    };
  },
  computed: {
    width() {
      return this.$screenWidth;
    },
    liStyle() {
      return {
        width: this.width,
        height: 60
      };
    },
    wrapperStyle() {
      return {
        width: this.width,
        height: 500
      };
    }
  },
  methods: {
    onIdle() {
      console.log(`onIdle`);
      this.refreshText = REFRESH_TEXT;
    },
    onPulling() {
      this.refreshText = "松手即可加载更多";
      console.log(`onPulling`);
    },
    async onEndReached() {
      console.log(`onEndReached`);
      // 检查锁，如果在加载中，则直接返回，防止二次加载数据
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;

      await timer();
      const newData = createArr();
      this.list.push.apply(this.list, newData);
      console.log("this.list:::", this.list);

      this.isLoading = false;
      this.$refs.pullFooter.collapsePullFooter();
    },
    async endReached() {
      console.log("end", new Date());
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;

      // await timer();
      const newData = createArr();
      this.list= [...this.list, ...newData];
      console.log("this.list:::", this.list);

      this.isLoading = false;
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

.li {
  flex: 1;
  background-color: gray;
  margin-top: 10;
  margin-bottom: 10;
}
.pull-footer-text {
  color: red;
  text-align: center;
}
</style>
