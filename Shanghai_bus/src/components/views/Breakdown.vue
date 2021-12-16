<template>
  <div>
    <el-dialog
      title="新增故障现象"
      :visible.sync="addBrokenDailog"
      width="800px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="12">
          <div class>
            <el-row :gutter="20">
              <el-col :span="8">
                <label for="addBrokenCode" class="addLabel">故障码：</label>
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
                <label for="addBrokenName" class="addLabel">故障名称：</label>
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
          @click="AddFaultPhenomenon"
        >确定</el-button>
      </div>
    </el-dialog>
    <div class="sitesTop">
      <div class="inputs">
        <div class="equipSearch">
          <el-input size="mini" v-model="search.code" placeholder="故障code"></el-input>
        </div>
        <div class="equipSearchBtn">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="GetFaultPhenomenonByCode"
          >搜索</el-button>
        </div>
      </div>
      <div class="btns">
        <div class style>
          <el-button type="success" class="blueBtn" size="mini" @click="addBroken">新增故障</el-button>
        </div>
      </div>
    </div>
    <div class="table secondTable">
      <el-table :data="brokenData" style="width: 100%">
        <el-table-column prop="id" label="故障id"></el-table-column>
        <el-table-column prop="code" label="故障code"></el-table-column>
        <el-table-column prop="name" label="故障名称"></el-table-column>
        <el-table-column prop="option" label="操作" width="240px">
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
    this.GetAllFaultPhenomenon();
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
              vm.DelFaultPhenomenonByCode(obj);
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
    GetAllFaultPhenomenon() {
      //http://127.0.0.1:999/FaultPhenomenon/GetAllFaultPhenomenon
      let vm = this;
      request({
        url: "/FaultPhenomenon/GetAllFaultPhenomenon",
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
    GetFaultPhenomenonByCode() {
      let vm = this;
      let form = new FormData();
      form.append("code", parseInt(vm.search.code));
      request({
        url: "/FaultPhenomenon/GetFaultPhenomenonByCode", //http://127.0.0.1:999/FaultPhenomenon/GetFaultPhenomenonByCode
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
    DelFaultPhenomenonByCode(obj) {
      let vm = this;
      let form = new FormData();
      form.append("code", parseInt(obj.code));
      request({
        url: "/FaultPhenomenon/DelFaultPhenomenonByCode",
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
          vm.GetAllFaultPhenomenon();
        }
      });
    },
    AddFaultPhenomenon() {
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
        //http://127.0.0.1:999/FaultPhenomenon/AddFaultPhenomenon
        url: "/FaultPhenomenon/AddFaultPhenomenon",
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
          vm.GetAllFaultPhenomenon();
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