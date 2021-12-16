<template>
  <div>
    <div class="fullImg" v-show="fullImgShow" @dblclick="fullImg('')">
      <img :src="fullImgUrl" alt />
    </div>
    <el-dialog
      title="故障点详情"
      :visible.sync="faultBreakDetailDialog"
      width="1200px"
      :before-close="handleClose"
      class="siteDetails"
    >
      <el-tabs v-model="taskActiveName" @tab-click="handleClick">
        <!-- <el-tab-pane label="任务详情" name="first"></el-tab-pane> -->
        <el-tab-pane label="故障点详情" name="first">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>故障点ID：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.id}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>任务创建时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.reportTime}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>设置开始时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.setStartTime}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>设置结束时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.setEndTime}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>-->

          <!-- <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>实际开始时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.startTime}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>实际结束时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.endTime}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>-->

          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>创建人：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.reportUser.Name}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>故障现象：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class v-if="faultBreakDetailObj.faultPhenomenonList.length">
                      <span
                        v-for="item in faultBreakDetailObj.faultPhenomenonList"
                        :key="item.name+item.code"
                      >{{item.name +" "}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点名称：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.siteDevice.SName}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点地址：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.siteDevice.Addr}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点经度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.siteDevice.BDX}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点纬度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.siteDevice.BDY}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>备注：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.remarks}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <!-- <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>id：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{faultBreakDetailObj.id}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>-->
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片/视频" name="second">
          <el-row :gutter="10" v-show="faultBreakDetailObj.photos">
            <el-col :span="24">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class>图片：</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="picbox">
                      <div
                        class="detailImg"
                        v-for="url in faultBreakDetailObj.photos"
                        :key="url.cosUrl"
                      >
                        <el-image :src="url.cosUrl" @dblclick="fullImg(url.cosUrl)"></el-image>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-show="faultBreakDetailObj.videos">
            <el-col :span="24">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class>视频：</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="picbox">
                      <div
                        class="detailImg"
                        v-for="url in faultBreakDetailObj.videos"
                        :key="url.cosUrl"
                      >
                        <video :src="url.cosUrl" controls autoplay></video>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
      </el-tabs>
      <!-- <div style="margin-top:10px" v-show="canCheck">
        <el-button
          type="success"
          class="greenBtn"
          size="mini"
          @click="ckeckResult(105,faultBreakDetailObj.taskId)"
        >关闭</el-button>
        <el-button
          type="success"
          class="redBtn"
          size="mini"
          @click="ckeckResult(104,faultBreakDetailObj.taskId)"
        >删除</el-button>
      </div>-->
    </el-dialog>
    <el-dialog
      :title="faultBreakText"
      :visible.sync="faultBreakDialog"
      width="1200px"
      :before-close="handleClose"
    >
      <div v-if="faultBreakText=='故障现象'">
        <breakdown-view></breakdown-view>
      </div>
      <div v-if="faultBreakText=='处理方式'">
        <handle-view></handle-view>
      </div>
      <div v-if="faultBreakText=='现场检查清单'">
        <check-list-view></check-list-view>
      </div>
    </el-dialog>

    <el-dialog
      title="故障点任务"
      :visible.sync="CreateTaskByFaultSiteDialog"
      width="800px"
      :before-close="handleClose"
      class="CreateTaskByFaultSiteDialog"
    >
      <el-row :gutter="40">
        <el-col :span="4">选择故障点：</el-col>
        <el-col :span="20">
          <div class="failtSelectBox">
            <div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >当前页全选</el-checkbox>
              <div class="clearfix"></div>
            </div>
            <el-checkbox-group
              v-model="CreateTaskByFaultSiteData.FaultSiteIdList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="item in tableData" :key="'faultId'+item.id" :label="item.id"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>

        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="4">选择执行人：</el-col>
        <el-col :span="20">
          <el-select
            size="mini"
            v-model="CreateTaskByFaultSiteData.executorUserId"
            placeholder="请选择执行人"
          >
            <el-option
              v-for="item in allUser"
              :key="item.value"
              :label="item.Name+item.phone"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="4">任务类型：</el-col>
        <el-col :span="20">
          <el-select
            size="mini"
            v-model="CreateTaskByFaultSiteData.taskTypeCode"
            placeholder="请选择任务类型"
          >
            <el-option
              v-for="item in allTaskType"
              :key="item.name"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="4">开始时间：</el-col>
        <el-col :span="20">
          <el-date-picker
            size="mini"
            v-model="setStartTime"
            @change="timeChange('setStartTime')"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="4">结束时间：</el-col>
        <el-col :span="20">
          <el-date-picker
            size="mini"
            v-model="setEndTime"
            type="datetime"
            placeholder="选择结束时间"
            @change="timeChange('setEndTime')"
          ></el-date-picker>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="4">备注：</el-col>
        <el-col :span="20">
          <el-input v-model="CreateTaskByFaultSiteData.remarks" placeholder="备注" size="mini"></el-input>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <div>
        <el-button type="success" class="blueBtn" size="mini" @click="CreateTaskByFaultSiteFun">确定</el-button>
      </div>
    </el-dialog>
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/FailureSite.svg" alt />
      </div>
      <div class="sitesTop">
        <div class="inputs">
          <div class="equipSearch">
            <el-select size="mini" v-model="search.isClosed" placeholder="请选择">
              <el-option label="已关闭" value="true"></el-option>
              <el-option label="未关闭" value="false"></el-option>
            </el-select>
          </div>
          <div class="equipSearchBtn">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="GetFailureSitesByClosed"
            >搜索</el-button>
          </div>
        </div>
        <div class="btns">
          <el-button
            type="success"
            class="blueBtn"
            size="mini"
            @click="SeeFaultBreak('故障点任务')"
          >故障点任务</el-button>
          <el-button type="success" class="blueBtn" size="mini" @click="SeeFaultBreak('故障现象')">故障现象</el-button>
          <el-button type="success" class="blueBtn" size="mini" @click="SeeFaultBreak('处理方式')">处理方式</el-button>
          <el-button
            type="success"
            class="blueBtn"
            size="mini"
            @click="SeeFaultBreak('现场检查清单')"
          >现场检查清单</el-button>
        </div>
      </div>
      <div class="table mainTable">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="故障点id" width="100"></el-table-column>

          <el-table-column prop="reportUser.Name" label="创建人" width="100"></el-table-column>
          <el-table-column prop="siteDevice.SName" label="站点名称"></el-table-column>
          <el-table-column prop="siteDevice.Addr" label="站点地址"></el-table-column>
          <el-table-column prop="reportTime" label="创建时间"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick('delete', scope.row)"
                class="tableRedBtn"
                size="mini"
                plain
              >删除</el-button>
              <el-button
                @click="handleClick('detail', scope.row)"
                class="tableGreenBtn"
                size="mini"
                plain
              >详情</el-button>
              <el-button
                v-show="!scope.row.isClosed"
                @click="handleClick('close', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
              >关闭</el-button>
              <!-- <el-button
              @click="handleClick('report', scope.row)"
              class="option-btn-delet"
              size="mini"
              plain
              >上报</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../assets/js/axios";
import handleView from "./Handle.vue";
import breakdownView from "./Breakdown.vue";
import checkListView from "./Checklist.vue";
import timer from "../../assets/js/time";
export default {
  data() {
    return {
      tableData: [],
      search: { isClosed: "false" },
      addBrokenDailog: false,
      addBrokenData: { code: "", name: "" },
      faultBreakText: "",
      faultBreakDialog: false,
      CreateTaskByFaultSiteDialog: false,
      isIndeterminate: false,
      checkAll: false,
      CreateTaskByFaultSiteData: {
        executorUserId: "",
        FaultSiteIdList: [],
        taskTypeCode: "",
        setStartTime: "",
        setEndTime: "",
        remarks: ""
      },
      allUser: [],
      allTaskType: [],
      setStartTime: "",
      setEndTime: "",
      faultBreakDetailDialog: false,
      faultBreakDetailObj: {
        reportUser: {},
        executorUser: {},
        taskStatus: {},
        taskType: {},
        siteDevice: {},
        photos: [],
        faultPhenomenonList: []
      },
      taskActiveName: "first",
      fullImgShow: false,
      fullImgUrl: ""
    };
  },
  components: { handleView, breakdownView, checkListView },
  mounted() {
    //http://127.0.0.1:999/FailureSite/GetFailureSitesByClosed
    this.GetFailureSitesByClosed();
    let vm = this;
    request({
      url: "/User/GetAllUser",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.allUser = res.data.filter(function(item) {
          //   return item.isMobile;
          return item;
        });
      }
    });
    request({
      url: "/TaskType/GetAllTaskType",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.allTaskType = res.data;
      }
    });
  },
  methods: {
    timeChange(state) {
      this.CreateTaskByFaultSiteData[state] = timer.dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        this[state]
      );
    },
    handleCheckAllChange(val) {
      //   this.addTasksData.siteDeviceList = val ? cityOptions : [];
      if ((this.CreateTaskByFaultSiteData.FaultSiteIdList = val)) {
        this.CreateTaskByFaultSiteData.FaultSiteIdList = this.tableData.map(
          function(item) {
            return item.id;
          }
        );
      } else {
        this.CreateTaskByFaultSiteData.FaultSiteIdList = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableData.length;
    },
    GetFailureSitesByClosed() {
      let vm = this;
      let isClosed = vm.search.isClosed == "false" ? false : true;
      let form = new FormData();
      form.append("index", 10);
      form.append("page", 1);
      form.append("isClosed", isClosed);
      request({
        url: "/FailureSite/GetFailureSitesByClosed",
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          vm.tableData = res.data;
        }
      });
    },
    handleClick(text, obj) {
      console.log(text, obj);
      switch (text) {
        case "delete":
          //http://127.0.0.1:999/FailureSite/DeleteFailureSitesForId
          this.DeleteFailureSitesForId(obj);
          break;
        case "close":
          this.CloseFailureSites(obj);
          break;
        case "report":
          this.GetReportFailureSitesForId(obj);
          break;
        case "detail":
          console.log("handleClickdetail", obj);
          this.faultBreakDetailObj = obj;
          this.faultBreakDetailDialog = true;
          break;
      }
    },
    CreateTaskByFaultSiteFun() {
      let vm = this;
      request({
        url: "/Task/CreateTaskByFaultSite", //http://127.0.0.1:999/Task/CreateTaskByFaultSite
        method: "post",
        param: JSON.stringify(vm.CreateTaskByFaultSiteData),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.CreateTaskByFaultSiteDialog = false;
          vm.$message({
            message: "创建成功！",
            type: "success"
          });
        }
      });
    },

    DeleteFailureSitesForId(obj) {
      let vm = this;
      let form = new FormData();
      form.append("id", obj.id);
      request({
        url: "/FailureSite/DeleteFailureSitesForId", //http://127.0.0.1:999/FailureSite/DeleteFailureSitesForId
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.GetFailureSitesByClosed();
          vm.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    GetReportFailureSitesForId(obj) {
      let vm = this;
      let form = new FormData();
      form.append("id", obj.id);
      request({
        url: "/FailureSite/GetReportFailureSitesForId", //http://127.0.0.1:999/FailureSite/GetReportFailureSitesForId
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.GetFailureSitesByClosed();
          vm.$message({
            message: "上报成功",
            type: "success"
          });
        }
      });
    },
    CloseFailureSites(obj) {
      let vm = this;
      let form = new FormData();
      form.append("id", obj.id);
      request({
        url: "/FailureSite/CloseFailureSites", //http://127.0.0.1:999/FailureSite/CloseFailureSites
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.GetFailureSitesByClosed();
          vm.$message({
            message: "关闭成功",
            type: "success"
          });
        }
      });
    },
    handleClose() {
      this.faultBreakDialog = false;
      this.CreateTaskByFaultSiteDialog = false;
      this.faultBreakDetailDialog = false;
    },
    AddFaultHandling() {},
    // GetFaultHandlingByCode() {},
    addBroken() {},
    fullImg(url) {
      //   consoel.log("url", url);
      this.fullImgUrl = url;
      this.fullImgShow = !this.fullImgShow;
    },
    SeeFaultBreak(text) {
      if (text == "故障点任务") {
        this.CreateTaskByFaultSiteDialog = true;
      } else {
        this.faultBreakText = text;
        this.faultBreakDialog = true;
      }
    }
  }
};
</script>
<style lang="scss">
.el-checkbox {
  float: left;
  margin-right: 25px;
}
.taskByid {
  .equipSearch {
    width: 140px;
    .el-col {
      .el-select {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
.failtSelectBox {
  max-height: 200px;
  overflow-y: auto;
  //   border: 1px solid #ccc;
  //   padding: 4px;
  .el-checkbox {
    width: 16%;
    margin: 0;
    text-align: left;
  }
  .el-col .el-select {
    width: 100%;
  }
}
.el-col .el-select {
  width: 100%;
}

.tasksSelectBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.tasksSelectBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: #ddd;
}

.tasksSelectBox::-webkit-scrollbar-track {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #eee;
}
.CreateTaskByFaultSiteDialog {
  .el-row {
    margin-bottom: 5px;
    .el-col-4 {
      line-height: 28px;
    }
  }
}
</style>