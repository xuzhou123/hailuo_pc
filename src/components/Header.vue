<template>
  <div>
    <section id="header">
      <div class="w1280 header-container">
        <div class="logo-container">
          <a class="logo" href></a>
        </div>
        <ul class="nav-lists">
          <li v-for="item in navLists" :key="item.id" :class="{'active':activeNavCode==item.code}" @click="changeNav(item)">{{item.label}}</li>
        </ul>
        <div class="operate-container" @click="dialogVisible=true" v-if="!userInfo.id">登录/注册</div>
        <div class="operate-container" v-if="userInfo.id">
          <el-dropdown @command="more">
            <span class="el-dropdown-link">
              {{userInfo.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="outlogin">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="clear-both"></div>
      </div>
    </section>

    <!-- 注册、登录弹窗 -->
    <el-dialog
      :title="dialogType===0?'注册':'登录'"
      :visible.sync="dialogVisible"
      width="20%"
      center
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item>
          <el-input placeholder="输入手机号码" prefix-icon="el-icon-mobile-phone" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType===0">
          <el-input placeholder="手机验证码" v-model="form.phone_code">
            <template slot="append">
              <el-button @click="getPhoneCode" :disabled="sendPhoneCode">
                <span v-if="!sendPhoneCode">获取验证码</span>
                <span v-if="sendPhoneCode">倒计时 {{count}} 秒</span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入密码" prefix-icon="el-icon-view" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType===0">
          <el-input placeholder="确认密码" prefix-icon="el-icon-view" v-model="form.re_password"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType===0">
          <el-input placeholder="输入真实姓名" prefix-icon="el-icon-view" v-model="form.real_name"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType===0">
          <el-input placeholder="输入身份证号" prefix-icon="el-icon-view" v-model="form.id_card"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="text" v-if="dialogType===0" @click="dialogType=1">登录</el-button>
        <el-button type="text" v-if="dialogType===1" @click="dialogType=0">注册</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      dialogVisible: false,
      dialogType: 1, // 0为注册 1为登录
      title: "注册",
      form: {
        phone: "", // 手机号-11位
        phone_code: "", //手机验证码-6位
        password: "", // 密码-6-20位
        re_password: "", //确认密码-6-20位
        real_name: "", //真实姓名-10位以内
        id_card: "" //身份证号-20位以内
      },
      sendPhoneCode: false, // 是否发送手机验证码
      count: 60, // 倒计时
      userInfo: {}, // 用户信息
      navLists: [
        {
          id: 1,
          label: '全部',
          code: 'all'
        },
        {
          id: 2,
          label: '首页',
          code: 'shouye'
        },
        {
          id: 3,
          label: '京剧',
          code: 'jingju'
        }
      ]
    };
  },
  computed: {
    // ...mapState({
    //   activeNavCode: state => state.activeNavCode
    // }),
    ...mapGetters(['activeNavCode'])
  },
  methods: {
    // 获取验证码
    getPhoneCode() {
      let params = {
        phone: this.form.phone
      };
      this.$axios
        .fetchPost("/homevideo_send_phone_code", params)
        .then(data => {
          if (data.data.state === 0) {
            console.logo(data.data.content.code);
            this.countDown();
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 倒计时
    countDown() {
      this.sendPhoneCode = true;
      this.count = 60;
      let timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          this.sendPhoneCode = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 确认
    ok() {
      if (this.dialogType === 0) {
        this.registerFun();
      } else {
        this.loginFun();
      }
    },
    // 登录操作
    loginFun() {
      let params = {
        phone: this.form.phone,
        password: this.form.password
      };
      this.$axios
        .fetchPost("/homevideo_login", params)
        .then(data => {
          if (data.data.state === 0) {
            this.$message.success(data.data.msg);
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(data.data.data)
            );
            this.getUserInfo();
            this.handleClose();
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册操作
    registerFun() {
      let params = {
        phone: this.form.phone,
        phone_code: this.form.phone_code,
        password: this.form.password,
        re_password: this.form.re_password,
        real_name: this.form.real_name,
        id_card: this.form.id_card
      };
      this.$axios
        .fetchPost("/homevideo_register", params)
        .then(data => {
          if (data.data.state === 0) {
            this.$message.success(data.data.msg);
            this.dialogType = 1;
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 弹窗关闭
    handleClose() {
      this.dialogVisible = false;
    },
    // 更多操作
    more(command) {
      if (command === "outlogin") {
        window.localStorage.removeItem("userInfo");
        this.getUserInfo();
      }
    },
    // 获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};
    },
    // 切换导航
    changeNav(item) {
      this.$store.dispatch('setActiveNavCode',item.code)
      this.$router.push({
        path: "/"
      });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style scoped lang="less">
#header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  .header-container {
    height: 60px;
    .logo-container {
      float: left;
      .logo {
        background-position: 0 -23px;
        background-repeat: no-repeat;
        overflow: hidden;
        display: block;
        width: 160px;
        height: 29px;
        margin-top: 15px;
        background-image: url(../assets/logos.png);
      }
    }
    .nav-lists {
      float: left;
      height:100%;
      margin-left: 50px;
      display: flex;
      align-items: center;
      li {
        padding: 10px 16px;
        font-size: 16px;
        cursor: pointer;
        &.active {
          background:#f90;
          color: #fff;
        }
      }
    }
    .operate-container {
      float: right;
      line-height: 60px;
      cursor: pointer;
    }
  }
}
</style>
