<template>
  <div>
    <el-dialog title="用户权限" :visible.sync="rightDialog" width="40%" :before-close="handleClose">
      <el-row class="right-row">
        <el-col :span="6">
          <div class="rightTitle">用户权限组：</div>
        </el-col>
        <el-col :span="18">
          <div class="rightBox">
            <!-- rightGrounpData -->
            <el-radio
              v-model="rightGrounpRadio"
              v-for="item in rightGrounpData"
              :label="item.id"
              :key="item.groupName"
            >{{ item.groupName }}</el-radio>
            <!-- <el-radio v-model="radio" label="2">备选项</el-radio> -->
          </div>
        </el-col>
      </el-row>
      <el-row class="right-row" style="margin-top:30px;">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button
              type="success"
              class="blueBtn"
              size="mini"
              @click="BindUserToPermissionGroup()"
            >确定权限组</el-button>
            <el-button
              type="success"
              class="blueBtn"
              size="mini"
              @click="RemoveUserPermissionGroup()"
            >清空权限组</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="addDialogTitile"
      :visible.sync="addDialog"
      width="800px"
      :before-close="handleClose"
    >
      <el-form :model="addForm" ref="addForm" size="mini" id="addSite" :rules="addRules">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="用户名:" label-width="100px" prop="userName">
                <el-input v-model="addForm.userName" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="用户密码:" label-width="100px" prop="userPass">
                <el-input v-model="addForm.userPass" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="手机号:" label-width="100px" prop="phone">
                <el-input v-model="addForm.phone" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="邮箱:" label-width="100px" prop="EMail">
                <el-input v-model="addForm.EMail" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="姓名:" label-width="100px" prop="Name">
                <el-input v-model="addForm.Name" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="手机用户:" label-width="100px" prop="isMobile">
                <el-select v-model="addForm.isMobile">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="是否可用:" label-width="100px" prop="isAvailable">
                <el-select v-model="addForm.isAvailable">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="addDialog = false" size="mini">取 消</el-button>
          <el-button type="primary" class="blueBtn" @click="newUser('addForm')" size="mini">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/User.svg" alt />
      </div>
      <div class="sitesTop">
        <div class="inputs">
          <div class="equipSearch">
            <el-input size="mini" v-model="search.userId" placeholder="用户Id"></el-input>
          </div>
          <div class="equipSearchBtn">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="GetUserByUserId()"
            >搜索</el-button>
          </div>
        </div>
        <div class="btns">
          <div class style>
            <el-button type="success" class="blueBtn" size="mini" @click="AddUserView()">新增用户</el-button>
          </div>
        </div>
      </div>

      <div class="table mainTable">
        <el-table
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(256, 256, 256, 0.2)"
          style="width: 100%;margin-top:10px;"
          :data="tabledatas"
        >
          <!-- <el-table-column prop="index" label="序列"></el-table-column> -->
          <el-table-column prop="Name" label="姓名"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <!-- <el-table-column prop="userId" label="用户id"></el-table-column> -->
          <el-table-column prop="isAdmin" label="管理员">
            <template slot-scope="scope">{{scope.row.isAdmin?"√":"×"}}</template>
          </el-table-column>
          <el-table-column prop="EMail" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick('see', scope.row)" class="tableGreenBtn" size="mini">权限</el-button>
              <el-button
                @click="handleClick('edit', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
              >编辑</el-button>
              <el-button
                @click="handleClick('delete', scope.row)"
                class="tableRedBtn"
                size="mini"
                plain
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          :page-size="10"
          :pager-count="11"
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="tableLen"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../assets/js/axios";
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      // console.log("jjjjj", value)
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      // ^ [a - zA - Z0 -9_ -] +@[a - zA - Z0 -9_ -]+(\.[a - zA - Z0 -9_ -] +)+ $?
      // console.log("jhhjj", value)
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!this.isCellEmail(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的邮箱!"));
      } else {
        callback();
      }
    };
    var userNameCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (!this.isCellUserName(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("用户名长5-16位，不包含特殊字符"));
      } else {
        callback();
      }
    };
    // ^[A-Za-z0-9_]{4,16}$
    return {
      rightGrounpData: [],
      rightGrounpRadio: "",
      loading: false,
      addForm: {
        userName: "",
        userPass: "",
        name: "",
        phone: "",
        EMail: "",
        isMobile: false,
        isAvailable: "1"
      },
      addRules: {
        userName: [
          { required: true, validator: userNameCheck, trigger: "blur" }
        ],
        userPass: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        EMail: [{ required: true, validator: checkEmail, trigger: "blur" }],
        isMobile: [{ required: true, message: "请选择", trigger: "change" }]
      },
      addDialog: false,
      addDialogTitile: "新增用户",
      search: {
        userId: ""
      },
      currentPage: 1,
      tabledatas: [],
      tableLen: 0,
      addForm: {},
      rightDialog: false,
      userMessage: {},
      addRight: "",
      rightList: []
    };
  },
  methods: {
    //http://127.0.0.1:999/User/GetUserInfo
    GetUserInfo() {
      let vm = this;
      request({
        url: "/User/GetUserInfo",
        // params:"",
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          //   console.log(res.data);
          vm.GetUserInfoData = res.data.Name + res.data.EMail;
        }
      });
    },
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    isCellEmail(val) {
      const rePass = new RegExp(
        "^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$",
        ""
      );
      return rePass.test(val);
      //   console.log(isPass, val);
      //   if (isPass) {
      //     return true;
      //   } else {
      //     return false;
      //   }
    },
    isCellUserName(val) {
      const reg = new RegExp("^[a-zA-Z_0-9]{5,16}$", "");
      const isPass = reg.test(val);
      // console.log(val, isPass)
      if (isPass) {
        return true;
      } else {
        return false;
      }
    },

    // http://127.0.0.1:999/User/GetAllUser
    GetAllUser() {
      let vm = this;
      request({
        url: "/User/GetAllUser",
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          vm.tabledatas = res.data;
          vm.tableLen = res.data.length;
        }
      });
    },
    //http://127.0.0.1:999/User/AddUser
    newUser(formName) {
      let vm = this;
      if (vm.addDialogTitile == "修改用户") {
        vm.UpdateUser();
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          vm.AddUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    AddUser() {
      let vm = this;
      let data = vm.addForm;
      data.name = vm.addForm.Name || vm.addForm.name;
      data.isMobile = data.isMobile == "1" ? true : false;
      data.isAvailable = data.isAvailable == "1" ? true : false;
      console.log(JSON.stringify(data));
      request({
        url: "/User/AddUser",
        method: "post",
        param: JSON.stringify(data),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          //vm.GetAllUserData = res.data.length;
          vm.GetAllUser();
          vm.$message({
            type: "success",
            message: "添加成功！",
            duration: 1000
          });
          vm.addDialog = false;
        }
      });
    },
    //http://127.0.0.1:999/User/UpdateUser
    handleClose() {
      this.addDialog = false;
      this.rightDialog = false;
      this.addForm = {
        userName: "",
        userPass: "",
        name: "",
        phone: "",
        EMail: "",
        isMobile: "",
        isAvailable: ""
      };
    },
    AddUserView(obj) {
      this.addForm = obj || {
        userName: "",
        userPass: "",
        name: "",
        phone: "",
        EMail: "",
        isMobile: "1",
        isAvailable: "1"
      };
      this.addDialogTitile = "新增用户";
      this.addDialog = true;
    },
    UpdateUser() {
      let vm = this;
      vm.$confirm("谨慎修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = vm.addForm;
          console.log("data", data);
          //   return;
          data.Name = vm.addForm.Name || vm.addForm.name;
          let isMobile = false;
          if (data.isMobile == "1") {
            isMobile = true;
          }
          let isAvailable = false;
          if (data.isAvailable == "1") {
            isAvailable = true;
          }
          let update = {
            id: data.id,
            userId: data.userId,
            userName: data.userName,
            userPass: data.userPass || "123",
            UserIcon: data.UserIcon,
            Name: data.Name,
            phone: data.phone,
            EMail: data.EMail,
            isMobile: isMobile,
            isAvailable: isAvailable
          };
          request({
            url: "/User/UpdateUser",
            method: "post",
            param: JSON.stringify(update),
            onError: function() {},
            vm
          }).then(res => {
            if (res.code == 200) {
              //   console.log(res.data);
              vm.GetAllUser();
              vm.addDialog = false;
              vm.$message({
                message: "修改成功",
                type: "success",
                duration: 1000
              });
              //vm.GetAllUserData = res.data.length;
            }
          });
        })
        .catch(() => {
          vm.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //DeleteUser
    DeleteUser(obj) {
      let vm = this;
      // if (!vm.GetAllUserData[2]) {
      //     vm.$message({
      //         message: "无用户可删除",
      //         type: "error",
      //         duration: 1000
      //     });
      //     return;
      // }
      let data = new FormData();
      data.append("deleteUserId", obj.userId);
      request({
        url: "/User/DeleteUser",
        method: "post",
        param: data,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          //   console.log(res.data);
          vm.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          vm.GetAllUser();
          //vm.GetAllUserData = res.data.length;
        }
      });
    },

    GetUserByUserId() {
      let vm = this;
      let data = new FormData();
      data.append("queryUserId", vm.search.userId);
      request({
        url: "/User/GetUserByUserId", //http://127.0.0.1:999/User/GetUserByUserId
        method: "post",
        param: data,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          //   console.log(res.data);
          vm.$message({
            message: "查询成功",
            type: "success",
            duration: 1000
          });
          //vm.GetAllUserData = res.data.length;
        }
      });
    },
    handleClick(text, obj) {
      let vm = this;

      switch (text) {
        case "see":
          console.log("see", obj);
          vm.rightDialog = true;
          vm.userMessage = obj;
          //   console.log(obj.permissionGroup);
          vm.rightGrounpRadio = obj.permissionGroup
            ? obj.permissionGroup.id
            : "";
          break;
        case "delete":
          vm.$confirm("谨慎删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              vm.DeleteUser(obj);
            })
            .catch(() => {
              vm.$message({
                type: "info",
                message: "已取消删除"
              });
            });

          break;
        case "edit":
          vm.addForm = obj;
          console.log("obj", obj);
          obj.isMobile = obj.isMobile ? "1" : "0";
          vm.AddUserView(obj);
          // obj.
          vm.addForm.name = obj.Name;
          vm.addForm.isMobile = obj.isMobile ? "1" : "0";
          vm.addDialogTitile = "修改用户";
          break;
      }
    },
    BindUserToPermissionGroup() {
      let vm = this;
      let data = {
        queryUserId: vm.userMessage.userId,
        permissionGroupId: vm.rightGrounpRadio
      };
      request({
        url: "/User/BindUserToPermissionGroup", //http://127.0.0.1:999/User/BindUserToPermissionGroup
        param: JSON.stringify(data),
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.rightDialog = false;
          vm.GetAllUser();
          vm.$message({
            type: "success",
            message: "绑定成功"
          });
        }
      });
    },
    RemoveUserPermissionGroup() {
      let vm = this;
      let data = {
        queryUserId: vm.userMessage.userId
      };
      this.$confirm("谨慎清空, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/User/RemoveUserPermissionGroup", //http://127.0.0.1:999/User/RemoveUserPermissionGroup
            param: JSON.stringify(data),
            method: "post",
            onError: function() {},
            vm
          }).then(res => {
            if (res.code == 200) {
              vm.rightDialog = false;
              vm.GetAllUser();
              vm.$message({
                type: "success",
                message: "清空成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    GetAllPermissionGroup() {
      let vm = this;
      let data = new FormData();
      data.append("index", 100000);
      data.append("page", 1);
      request({
        url: "/PermissionGroup/GetAllPermissionGroup",
        param: data,
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.rightGrounpData = res.data;
          //   vm.tableLen = res.data.length;
        }
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      switch (this.lastOperate) {
        case "all":
          this.GetAllSiteDevice(val);
          break;
        case "isOnline": ////isOnline  byId  info
          this.GetSiteDeviceForIsOnline(val);
          break;
        default:
          ////isOnline  byId  info
          //   this.GetSiteDeviceForIsOnline(val);
          break;
      }

      this.currentPage = val;
    }
  },
  mounted() {
    this.GetAllPermissionGroup();
    this.GetAllUser();
    // this.AddUser();
  }
};
</script>
<style lang='scss'>
/* div {
        color: #fff;
    } */
.rightTitle {
  height: 16px;
  line-height: 16px;
  text-align: right;
}

.right-row {
  margin: 10px 0;
}

.rightBox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  line-height: 24px;
  .el-tag {
    display: inline-block;
    margin-right: 10px;
    line-height: 24px;
  }
  .el-radio {
    line-height: 20px;
  }
}
#addSite .el-select {
  width: 100%;
}
</style>