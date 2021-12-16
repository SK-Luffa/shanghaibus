<template>
  <div class="login-container" :style="{ height: statusBarHeight }">
    <div class="sysintro">
      <h1>上海公交运维后台管理系统</h1>
    </div>
    <div class="login-box">
      <div class="logoNotice">
        <h1>用户登录</h1>
      </div>
      <div class="disIcon disIcon1">
        <img src="../assets/img/icon/disIcon.png" alt />
      </div>
      <div class="disIcon disIcon2">
        <img src="../assets/img/icon/disIcon.png" alt />
      </div>
      <div class="disIcon disIcon3">
        <img src="../assets/img/icon/disIcon.png" alt />
      </div>
      <div class="disIcon disIcon4">
        <img src="../assets/img/icon/disIcon.png" alt />
      </div>
      <div class="login-input-box">
        <div class="login-input">
          <el-input placeholder="请输入用户名" v-model="loginmes.loginword">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </div>
        <div class="login-input">
          <el-input placeholder="请输入密码" type="password" v-model="loginmes.password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </div>
        <div class="login-input email" v-if="isAdmin">
          <el-button v-if="logining" @click="getVerifyCode" class="email-btn" type="success">验证码</el-button>
          <el-button v-else class="email-btn" type="success" disabled>{{ showSecond }}秒重发</el-button>
          <el-input placeholder="请输入验证码" v-model="loginmes.verifyCode">
            <i slot="prefix" class="el-input__icon el-icon-s-promotion"></i>
          </el-input>
        </div>
        <!-- el-icon-s-promotion -->
        <div class="login-input rememberPassword">
          <el-checkbox v-model="loginmes.rememberPassword" @change="setPas">记住密码</el-checkbox>
        </div>
        <div class="login-input">
          <el-button type="primary" class="login-btn" @click="login">登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../assets/js/axios.js";
import MD5 from "js-md5";
export default {
  data() {
    return {
      statusBarHeight: `${document.documentElement.clientHeight}` + "px",
      logining: false,
      loginmes: {
        loginword: "",
        password: "",
        verifyCode: "",
        rememberPassword: false
      },
      isAdmin: false,
      verifyCodeInterval: null,
      showSecond: 60
    };
  },
  created() {},
  mounted() {
    let rem = JSON.parse(localStorage.getItem("remPas"));
    rem.verifyCode = "";
    if (rem.rememberPassword) {
      this.loginmes = rem;
    }
    const vm = this;
    document.onkeypress = function(e) {
      if (e.keyCode === 13) {
        vm.login();
      }
    };
  },
  methods: {
    setPas() {
      //   console.log(this.loginmes.rememberPassword);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getInfor(booleanState) {
      let vm = this;
      if (!vm.loginmes.loginword) {
        vm.$message({
          message: "请输入用户名",
          type: "error",
          duration: 1500
        });
        return false;
      }
      if (!vm.loginmes.password) {
        vm.$message({
          message: "请输入密码",
          type: "error",
          duration: 1500
        });
        return false;
      }
      let formdata = new FormData();
      formdata.append("userName", vm.loginmes.loginword);
      formdata.append("userPassMD5", MD5(vm.loginmes.password));
      if (vm.isAdmin && booleanState) {
        if (!vm.loginmes.verifyCode) {
          vm.$message({
            message: "请输入验证码",
            type: "error",
            duration: 1500
          });
          return false;
        }
        formdata.append("verifyCode", vm.loginmes.verifyCode);
      }
      return formdata;
    },
    getVerifyCode() {
      let vm = this;
      let formdata = vm.getInfor(false);
      if (!formdata) {
        return;
      }
      request({
        url: "/User/SendVerifyCode",
        param: formdata,
        method: "post",
        onError: () => {
          // removeLoading();
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.isAdmin = true;
          vm.logining = false;
          vm.showSecond = 60;
          vm.verifyCodeInterval = setInterval(function() {
            if (vm.showSecond > 1) {
              vm.showSecond--;
            } else {
              vm.logining = true;
              clearInterval(vm.verifyCodeInterval);
            }
          }, 1000);
          vm.$message({
            message: "验证码已发到您邮箱！",
            type: "success",
            duration: 1500
          });
        }
      });
    },
    login() {
      const vm = this;
      if (this.loginmes.rememberPassword) {
        localStorage.setItem("remPas", JSON.stringify(this.loginmes));
      }
      let formdata = vm.getInfor(true);
      if (!formdata) {
        return;
      }
      localStorage.removeItem("user");
      let url = "/User/UserLogin";
      request({
        url: url,
        param: formdata,
        method: "post",
        onError: () => {
          // removeLoading();
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm
      }).then(res => {
        if (res.code == 200) {
          //console.log("sdfsd")
          vm.$router.push({
            name: "Sites"
          });
          // vm.$store.commit("userLogin", res.data);
          let dataStr = JSON.stringify(res.data);
          localStorage.setItem("user", dataStr);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  background: url("~@/assets/images/login-bg.jpg") center center no-repeat;
  background-size: cover;
  filter: blur(0.1px);
  position: relative;
}

.login-input-box {
  width: 74%;
  margin: 10px auto 65px;
}
.login-box {
  .logoNotice {
    color: #fff;
    h1 {
      margin-top: 10px;
      font-size: 28px;
      font-weight: normal;
      //   le-spacing: 10px;
      letter-spacing: 5px;
      line-height: 56px;
    }
  }
  width: 400px;
  height: 360px;
  background: rgba(255, 255, 255, 0.05);
  position: absolute;
  opacity: 1;
  right: 160px;
  top: 30%;
  border-radius: 4px;
  .login-input {
    width: 100%;
    margin: 15px auto;
    color: #fff !important;
    .el-input {
      background-color: rgba(255, 255, 255, 0);
      .el-input__inner {
        color: #fff !important;
        background-color: rgba(255, 255, 255, 0);
      }
    }
  }
  .login-btn {
    background: linear-gradient(360deg, #0177e4 0%, #00b8ff 100%);
    opacity: 1;
    border-radius: 6px;
    width: 100%;
  }
  .login-btn:hover {
    opacity: 0.91;
  }
  .rememberPassword {
    text-align: left;
    .el-checkbox {
      color: #fff;
    }
  }
}

.sysintro h1 {
  position: absolute;
  left: 100px;
  top: 40px;
  color: #fff;
  font-weight: normal;
}

.disIcon {
  position: absolute;
  width: 24px;
}

.disIcon img {
  width: 100%;
  display: block;
}

.disIcon1 {
  top: 0;
  right: 0;
}

.disIcon2 {
  bottom: 0;
  right: 0;
  /* transform: 180deg; */
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  /* IE 9 */
  -moz-transform: rotate(90deg);
  /* Firefox */
  -webkit-transform: rotate(90deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(90deg);
  /* Opera */
}

.disIcon3 {
  bottom: 0;
  left: 0;
  /* transform: 180deg; */
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -moz-transform: rotate(180deg);
  /* Firefox */
  -webkit-transform: rotate(180deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
}

.disIcon4 {
  top: 0;
  left: 0;
  /* transform: 180deg; */
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  /* IE 9 */
  -moz-transform: rotate(-90deg);
  /* Firefox */
  -webkit-transform: rotate(-90deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(-90deg);
  /* Opera */
}
.email {
  position: relative;
  .email-btn {
    position: absolute;
    z-index: 100;
    right: 2px;
    padding: 10px 20px;
    bottom: 2px;
    background-color: #32b2e3 !important;
    border-color: #32b2e3 !important;
  }
}
</style>