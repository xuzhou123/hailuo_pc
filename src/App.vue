<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
* {
  padding: 0 0;
  margin: 0 0;
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a:link,
a:visited {
  text-decoration: none;
  color: #333;
}
a:hover,
a:active {
  text-decoration: none;
}
body {
  background: #f5f5f5;
}
input {
  outline: none;
}
.clear-both {
  clear: both;
}
.w1280 {
  width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
