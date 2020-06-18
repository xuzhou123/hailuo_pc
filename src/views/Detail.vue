<template>
  <div>
    <section class="detail">
      <div class="w1280 detail-container">
        <div class="video-container">
          <video controls autoplay="autoplay">
            <source :src="videoUrl" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
            <!-- <source src="../assets/movie.mp4" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。 -->
          </video>
        </div>
        <div class="title">{{title}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      id: "",
      title: "",
      videoUrl: ""
    };
  },
  methods: {},
  mounted() {
    let query = this.$route.query;
    this.id = query.id;
    this.title = query.title;
    this.videoUrl = query.videoUrl;
  }
};
</script>

<style lang="less" scoped>
.detail {
  min-height: 700px;
  padding: 16px 0;
  .detail-container {
    background: #232325;
    text-align: center;
    .video-container {
      height: 500px;
      padding-top: 20px;
      video {
        height: 100%;
        object-fit: cover;
        margin: 0 auto;
      }
    }
    .title {
      height:100px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 100px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>
