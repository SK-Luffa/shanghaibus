<template>
  <div>
    <el-dialog
      title="新增任务类型"
      :visible.sync="addBrokenDailog"
      width="800px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="12">
          <div class>
            <el-row :gutter="20">
              <el-col :span="8">
                <label for="addBrokenCode" class="addLabel">任务类型码：</label>
              </el-col>
              <el-col :span="16">
                <el-input size="mini" v-model="addBrokenData.code" id="addBrokenCode"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class>
            <el-row :gutter="20">
              <el-col :span="8">
                <label for="addBrokenName" class="addLabel">任务类型名称：</label>
              </el-col>
              <el-col :span="16">
                <el-input size="mini" v-model="addBrokenData.name" id="addBrokenName"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-button
          size="mini"
          class="blueBtn"
          type="success"
          style="margin-top:20px"
          @click="AddTaskType"
        >确定</el-button>
      </div>
    </el-dialog>
    <div class="sitesTop">
      <div class="inputs">
        <div class="equipSearch">
          <el-input size="mini" v-model="search.code" placeholder="任务类型code"></el-input>
        </div>
        <div class="equipSearchBtn">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="GetTaskTypeByCode"
          >搜索</el-button>
        </div>
      </div>
      <div class="btns">
        <div class style>
          <el-button type="success" class="blueBtn" size="mini" @click="addBroken">新增任务类型</el-button>
        </div>
      </div>
    </div>
    <div class="table secondTable">
      <el-table :data="brokenData" style="width: 100%">
        <el-table-column prop="Id" label="任务类型id" width="120px"></el-table-column>
        <el-table-column prop="code" label="任务类型code"></el-table-column>
        <el-table-column prop="name" label="任务类型名称"></el-table-column>
        <el-table-column prop="option" label="操作" width="80px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick('delete', scope.row)"
              class="option-btn-delet"
              size="mini"
              plain
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script>
import request from "../../assets/js/axios";
export default {
  data() {
    return {
      brokenData: [],
      search: {
        code: ""
      },
      addBrokenDailog: false,
      addBrokenData: { code: "", name: "" }
    };
  },
  mounted() {
    this.GetAllTaskType();
  },
  methods: {
    handleClick(text, obj) {
      let vm = this;
      switch (text) {
        case "see":
          break;
        case "delete":
          vm.$confirm("谨慎删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              vm.DelTaskTypeByCode(obj);
            })
            .catch(() => {
              vm.$message({
                type: "info",
                message: "已取消删除"
              });
            });
          break;
      }
    },
    addBroken() {
      this.addBrokenDailog = true;
    },
    handleClose() {
      this.addBrokenDailog = false;
    },
    GetAllTaskType() {
      //http://127.0.0.1:999/TaskType/GetAllTaskType
      let vm = this;
      request({
        url: "/TaskType/GetAllTaskType",
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          vm.brokenData = res.data;
        }
      });
    },
    GetTaskTypeByCode() {
      //http://127.0.0.1:999/TaskType/GetTaskTypeByCode
      let vm = this;
      let form = new FormData();
      form.append("code", parseInt(vm.search.code));
      request({
        url: "/TaskType/GetTaskTypeByCode",
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          vm.brokenData = [];
          vm.brokenData.push(res.data);
        }
      });
    },
    DelTaskTypeByCode(obj) {
      //http://127.0.0.1:999/TaskType/DelTaskTypeByCode
      let vm = this;
      let form = new FormData();
      form.append("code", parseInt(obj.code));
      request({
        url: "/TaskType/DelTaskTypeByCode",
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.$message({
            type: "success",
            message: "已删除"
          });
          vm.GetAllTaskType();
        }
      });
    },
    AddTaskType() {
      let vm = this;
      if (!vm.addBrokenData.code) {
        vm.$message({
          type: "warning",
          message: "请输入状态码！",
          duration: 1000
        });
        return;
      }
      if (!vm.addBrokenData.name) {
        vm.$message({
          type: "warning",
          message: "请输入状态名称！",
          duration: 1000
        });
        return;
      }
      vm.addBrokenData.code = parseInt(vm.addBrokenData.code);
      request({
        //http://127.0.0.1:999/TaskType/AddTaskType
        url: "/TaskType/AddTaskType",
        method: "post",
        param: JSON.stringify(vm.addBrokenData),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.addBrokenDailog = false;
          vm.$message({
            type: "success",
            message: "添加成功",
            duration: 1000
          });
          vm.GetAllTaskType();
        }
      });
    }
  }
};
</script>
<style>
.addLabel {
  display: inline-block;
  height: 28px;
  line-height: 28px;
}
</style>