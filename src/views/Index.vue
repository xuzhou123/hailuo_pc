<template>
  <div>
    <section class="index">
      <div class="w1280 content-container">
        <ul>
          <li v-for="item in lists" :key="item.id" @click="goDetail(item)">
            <a class="link">
              <!-- <img
                class="avatar"
                :src="item.img_url"
                alt
              />-->
              <img
                class="avatar"
                src="http://qiniu.hailuolive.com/20200531/users_5ed37bb1a2647.jpeg"
                alt
              />
            </a>
            <a class="title">{{item.title}}</a>
          </li>
          <div class="clear-both"></div>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      lists: [] // 数据
    };
  },
  methods: {
    // 获取验证码
    getLists() {
      let params = {
        search_type: "all"
      };
      this.$axios
        .fetchPost("/home_video_list", params)
        .then(data => {
          if (data.data.state === 0) {
            this.lists = data.data.data;
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳到详情页
    goDetail(item) {
      this.$router.push({
        path: "/Detail",
        query: { id: item.id, title: item.title, videoUrl: item.video_url }
      });
    }
  },
  mounted() {
    this.getLists();
  }
};
</script>

<style lang="less" scoped>
.index {
  min-height: 700px;
  padding: 16px 0;
  .content-container {
    background: #fff;
    padding: 16px;
    ul {
      li {
        float: left;
        width: 20%;
        padding: 0 5px;
        margin-bottom: 16px;
        box-sizing: border-box;
        cursor: pointer;
        .link {
          display: block;
          font-size: 0;
          .avatar {
            height: 220px;
            width: 100%;
            object-fit: cover;
          }
        }
        .title {
          font-size: 14px;
          height: 40px;
          margin: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: pointer;
          &:hover {
            color: #0162f4;
          }
        }
      }
    }
  }
}
</style>
