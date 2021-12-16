<template>
  <div>
    <!-- UpdateTaskStatusDialog  UpdateTaskTypeDialog-->
    <div class="fullImg" v-show="fullImgShow">
      <div class="full-img-icon el-icon-closeicon" @click="closeFullImg()">
        <i class="el-icon-close"></i>
      </div>
      <div class="full-img-icon el-icon-arrows">
        <i class="el-icon-arrow-left" @click="nextPic(0)"></i>
        <i class="el-icon-arrow-right" @click="nextPic(1)"></i>
      </div>

      <img :src="fullImgUrl" alt />
    </div>
    <el-dialog
      title="任务审核"
      :visible.sync="allCheckDialog"
      width="960px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="4">选择任务：</el-col>
        <el-col :span="20">
          <div class="tasksSelectBox">
            <div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >当前页全选</el-checkbox>
              <div class="clearfix"></div>
            </div>
            <el-checkbox-group
              v-model="UpdateTaskStatus.taskIdList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="item in tabledatas" :key="item.taskId" :label="item.taskId"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <!-- <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">任务状态：</el-col>
        <el-col :span="20">
          <el-select size="mini" v-model="UpdateTaskStatus.taskStatusCode" placeholder="请选择">
            <el-option
              v-for="item in allTaskStatus"
              :key="item.name"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-col>
        <div class="clearfix"></div>
      </el-row>-->
      <div style="margin-top:10px">
        <el-button class="blueBtn" type="success" size="mini" @click="ckeckResult(105)">全部通过</el-button>
        <el-button class="blueBtn" type="success" size="mini" @click="ckeckResult(104)">全部不通过</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="seeTaskText"
      :visible.sync="seeTaskDialog"
      width="960px"
      :before-close="handleClose"
      class="siteDetails seeTaskDialog"
    >
      <div v-if="seeTaskText=='任务状态'">
        <task-status-view></task-status-view>
      </div>
      <div v-else>
        <task-type-view></task-type-view>
      </div>
    </el-dialog>
    <el-dialog
      title="任务详情"
      :visible.sync="taskDetailDialog"
      width="960px"
      :before-close="handleClose"
      class="siteDetails"
    >
      <el-tabs v-model="taskActiveName" @tab-click="handleClick">
        <!-- <el-tab-pane label="任务详情" name="first"></el-tab-pane> -->
        <el-tab-pane label="任务详情" name="first">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>任务ID：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.taskId}}</div>
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
                    <div class>{{taskDetailObj.createTime}}</div>
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
                    <div class>设置开始时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.setStartTime}}</div>
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
                    <div class>{{taskDetailObj.setEndTime}}</div>
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
                    <div class>实际开始时间：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.startTime}}</div>
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
                    <div class>{{taskDetailObj.endTime}}</div>
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
                    <div class>创建人：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.createUser.Name}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>执行人：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.executorUser.Name}}</div>
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
                    <div class>任务类型：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.taskType.name}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>任务状态：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.taskStatus.name}}</div>
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
                    <div class>{{taskDetailObj.siteDevice.SName}}</div>
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
                    <div class>{{taskDetailObj.taskStatus.Addr}}</div>
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
                    <div class>{{taskDetailObj.siteDevice.BDX}}</div>
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
                    <div class>{{taskDetailObj.taskStatus.BDY}}</div>
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
                    <div class>{{taskDetailObj.remarks}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>id：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{taskDetailObj.id}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片/视频" name="second">
          <el-row :gutter="10" v-show="taskDetailObj.photos">
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
                        v-for="(urldata,index) in taskDetailObj.photos"
                        :key="urldata.cosUrl"
                      >
                        <el-image :src="urldata.cosUrl" @dblclick="fullImg(index)"></el-image>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-show="taskDetailObj.videos">
            <el-col :span="24">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class>视频：</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="picbox">
                      <div class="detailImg" v-for="url in taskDetailObj.videos" :key="url.cosUrl">
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
      <div style="margin-top:10px" v-show="btnShow.canCheck">
        <el-button
          type="success"
          class="greenBtn"
          size="mini"
          @click="ckeckResult(105,checkTaskId)"
        >通过</el-button>
        <el-button
          type="success"
          class="redBtn"
          size="mini"
          @click="ckeckResult(104,checkTaskId)"
        >不通过</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改任务状态"
      :visible.sync="UpdateTaskStatusDialog"
      width="960px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="4">选择任务：</el-col>
        <el-col :span="20">
          <div class="tasksSelectBox">
            <div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >当前页全选</el-checkbox>
              <div class="clearfix"></div>
            </div>
            <el-checkbox-group
              v-model="UpdateTaskStatus.taskIdList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="item in tabledatas" :key="item.taskId" :label="item.taskId"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">任务状态：</el-col>
        <el-col :span="20">
          <el-select size="mini" v-model="UpdateTaskStatus.taskStatusCode" placeholder="请选择">
            <el-option
              v-for="item in allTaskStatus"
              :key="item.name"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <div style="margin-top:10px">
        <el-button type="success" class="blueBtn" size="mini" @click="UpdateTaskStatusFun()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改任务类型"
      :visible.sync="UpdateTaskTypeDialog"
      width="960px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="4">选择任务：</el-col>
        <el-col :span="20">
          <div class="tasksSelectBox">
            <div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >当前页全选</el-checkbox>
              <div class="clearfix"></div>
            </div>
            <el-checkbox-group
              v-model="UpdateTaskStatus.taskIdList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="item in tabledatas" :key="item.taskId" :label="item.taskId"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">任务类型：</el-col>
        <el-col :span="20">
          <el-select size="mini" v-model="UpdateTaskStatus.taskStatusCode" placeholder="请选择">
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
      <div style="margin-top:10px">
        <el-button type="success" class="blueBtn" size="mini" @click="UpdateTaskTypeFun()">确定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="图片列表" :visible.sync="photosDialog" width="40%" :before-close="handleClose">
      <div class="taskPhoto">
        <div v-for="url in photoList" :key="url.cosUrl">
          <el-image :src="url.cosUrl" lazy></el-image>
        </div>
      </div>
      <div style="margin-top:10px" v-show="btnShow.canCheck">
        <el-button type="success" size="mini" @click="ckeckResult(105,checkTaskId)">通过</el-button>
        <el-button type="success" size="mini" @click="ckeckResult(104,checkTaskId)">不通过</el-button>
      </div>
    </el-dialog>-->
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/Task.svg" alt />
      </div>
      <div class="sitesTop taskByid">
        <div class="inputs">
          <div class="equipSearch">
            <el-select size="mini" v-model="search.ExecutorUserId" placeholder="请选择执行人">
              <el-option
                v-for="item in allUser"
                :key="item.value"
                :label="item.Name+item.phone"
                :value="item.userId"
              ></el-option>
            </el-select>
          </div>
          <div class="equipSearch">
            <el-select size="mini" v-model="search.TaskTypeCode" placeholder="请选择任务类型">
              <el-option
                v-for="item in allTaskType"
                :key="item.name"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="equipSearch">
            <el-select
              size="mini"
              v-model="search.TaskStatusCode"
              placeholder="请选择任务状态"
              @change="TaskStatusChoose"
            >
              <el-option
                v-for="item in allTaskStatus"
                :key="item.name"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="equipSearch" style="width:80px">
            <el-button type="success" class="blueBtn" size="mini" @click="getUserData()">查询</el-button>
          </div>
        </div>
        <div class="btns">
          <el-button
            type="success"
            class="blueBtn"
            size="mini"
            v-show="btnShow.canCheck"
            @click="allCheck()"
          >全部审核</el-button>
          <el-button type="success" class="blueBtn" size="mini" @click="seeTask('任务状态')">查看状态</el-button>
          <el-button type="success" class="blueBtn" size="mini" @click="seeTask('任务类型')">查看类型</el-button>
          <el-button
            type="success"
            size="mini"
            @click="updataDialogShow('UpdateTaskStatusDialog')"
            class="blueBtn"
          >修改状态</el-button>
          <el-button
            type="success"
            size="mini"
            class="blueBtn"
            @click="updataDialogShow('UpdateTaskTypeDialog')"
          >修改类型</el-button>
        </div>

        <!-- http://127.0.0.1:999/Task/UpdateTaskType  http://127.0.0.1:999/Task/UpdateTaskStatus -->
      </div>
      <div class="table mainTable">
        <el-table
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(256, 256, 256, 0.2)"
          style="width: 100%;margin-top:10px;"
          :data="tabledatas"
        >
          <!-- <el-table-column width="300px" prop="taskId" label="任务Id"></el-table-column> -->
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="executorUser.Name" label="执行人"></el-table-column>
          <el-table-column prop="createUser.Name" label="创建人"></el-table-column>
          <el-table-column prop="siteDevice.SName" label="站点名称"></el-table-column>
          <el-table-column prop="taskType.name" label="任务类型"></el-table-column>
          <el-table-column prop="taskStatus.name" label="任务类型"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick('start', scope.row)"
                class="tableGreenBtn"
                size="mini"
                plain
                v-show="isUnStart"
              >开始任务</el-button>
              <el-button
                @click="handleClick('detail', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
              >详情</el-button>
              <!-- <el-button
                @click="handleClick('photos', scope.row)"
                class="option-btn-oprate"
                size="mini"
                plain
                v-show="scope.row.photos"
              >照片</el-button>-->
              <!-- <el-button
              @click="handleClick('delete', scope.row)"
              class="option-btn-delet"
              size="mini"
              plain
              >删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :pager-count="11"
          layout="sizes,prev, pager, next"
          :current-page="currentPage"
          :total="tableLen"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../assets/js/axios";
import taskOperate from "../js/taskOperate.js";
import taskStatusView from "./TaskStatus.vue";
import taskTypeView from "./TaskType.vue";
export default {
  data() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      taskActiveName: "first",
      search: {
        ExecutorUserId: "",
        TaskTypeCode: "",
        TaskStatusCode: ""
      },
      allUser: [],
      urlStr: "",
      tabledatas: [],
      tableLen: 0,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      allTaskType: [],
      allTaskStatus: [],
      UpdateTaskTypeDialog: false,
      UpdateTaskStatusDialog: false,
      isIndeterminate: false,
      checkAll: false,
      isUnStart: false,
      UpdateTaskStatus: {
        taskIdList: [],
        taskStatusCode: ""
      },
      taskDetailDialog: false,
      taskDetailObj: {
        createUser: {},
        executorUser: {},
        taskStatus: {},
        taskType: {},
        siteDevice: {},
        photos: []
      },
      seeTaskText: "",
      seeTaskDialog: false,
      allCheckDialog: false,
      btnShow: {
        type: false,
        status: false,
        canCheck: false
      },
      photosDialog: false,
      photoList: [],
      checkTaskId: "",
      fullImgShow: false,
      fullImgUrl: "",
      fullImgShowIndex: ""
    };
  },
  components: { taskStatusView, taskTypeView },
  mounted() {
    let vm = this;
    request({
      url: "/User/GetAllUser",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.allUser = res.data.filter(function(item) {
          return item.isMobile;
          //   return item;
        });
      }
    });
    request({
      url: "/TaskStatus/GetAllTaskStatus",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        // console.log("res.data", res.data);
        let resultArr = [{ Id: 0, code: 0, name: "不限" }].concat(res.data);
        vm.allTaskStatus = resultArr;
      }
    });
    request({
      url: "/TaskType/GetAllTaskType",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        let resultArr = [{ Id: 0, code: 0, name: "不限" }].concat(res.data);
        vm.allTaskType = resultArr;
      }
    });
  },
  methods: {
    UpdateTaskStatusFun() {
      let vm = this;
      request({
        url: "/Task/UpdateTaskStatus", //http://127.0.0.1:999/Task/UpdateTaskStatus
        method: "post",
        param: JSON.stringify(vm.UpdateTaskStatus),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.$message({
            message: "修改成功,已刷新数据",
            type: "success"
          });
          vm.search.TaskStatusCode = vm.UpdateTaskStatus.taskStatusCode;
          vm.getUserData();
          vm.handleClose();
        }
      });
    },

    UpdateTaskTypeFun() {
      let vm = this;
      let axiosData = {
        taskIdList: vm.UpdateTaskStatus.taskIdList,
        taskTypeCode: vm.UpdateTaskStatus.taskStatusCode
      };
      request({
        url: "/Task/UpdateTaskType", //http://127.0.0.1:999/Task/UpdateTaskType
        method: "post",
        param: JSON.stringify(axiosData),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.$message({
            message: "修改成功,已刷新数据",
            type: "success"
          });
          vm.search.TaskTypeCode = axiosData.taskTypeCode;
          vm.getUserData();
          vm.handleClose();
        }
      });
    },
    getUserData() {
      let vm = this;
      //   vm.urlStr = str;
      //   if (str == "GetTaskForExecutorUserAndTaskStatus") {
      //     vm.search.TaskTypeCode = "";
      //   } else {
      //     vm.search.TaskStatusCode = "";
      //   }
      let data = vm.search;
      if (!data.ExecutorUserId) {
        vm.$message({
          message: "请先选择执行人",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (!data.TaskStatusCode) {
        data.TaskStatusCode = 0;
      }
      if (!data.TaskTypeCode) {
        data.TaskTypeCode = 0;
      }
      console.log("data", data);
      vm.loading = true;
      request({
        url: `/Task/GetTaskByExecutorUserTaskTypeTaskStatus?index=${vm.pageSize}&page=${vm.currentPage}`,
        method: "post",
        param: JSON.stringify(data),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.tabledatas = res.data;
          vm.tableLen = res.recordsFiltered;
          vm.loading = false;
          if (vm.search.TaskStatusCode == 100) {
            vm.isUnStart = true;
          } else {
            vm.isUnStart = false;
          }
        }
      });
    },
    TaskStatusChoose() {
      let data = this.search;
      //   console.log("let data = vm.search;", data);
      this.btnShow.canCheck = false;
      if (data.TaskStatusCode === 103) {
        this.btnShow.canCheck = true;
      }
    },
    ckeckResult(taskStatusCode, taskId) {
      let vm = this;
      var data = {};
      if (!taskId) {
        data = {
          taskIdList: vm.UpdateTaskStatus.taskIdList,
          taskStatusCode: taskStatusCode
        };
      } else {
        data = {
          taskIdList: [taskId],
          taskStatusCode: taskStatusCode
        };
      }
      request({
        url: "/Task/UpdateTaskStatus", //http://127.0.0.1:999/Task/UpdateTaskStatus
        method: "post",
        param: JSON.stringify(data),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.handleClose();
          vm.$message({
            type: "success",
            message: "已完成任务审核！"
          });
          vm.getUserData();
        }
      });
    },
    handleCheckAllChange(val) {
      //   this.addTasksData.siteDeviceList = val ? cityOptions : [];
      if ((this.UpdateTaskStatus.taskIdList = val)) {
        this.UpdateTaskStatus.taskIdList = this.tabledatas.map(function(item) {
          return item.taskId;
        });
      } else {
        this.UpdateTaskStatus.taskIdList = [];
      }
      this.isIndeterminate = false;
    },
    handleClose() {
      this.UpdateTaskTypeDialog = false;
      this.UpdateTaskStatusDialog = false;
      this.taskDetailDialog = false;
      this.allCheckDialog = false;
      this.photosDialog = false;
      this.UpdateTaskStatus = {
        taskIdList: [],
        taskStatusCode: ""
      };
      this.checkAll = false;
      //   this.seeTaskText = text;
      this.seeTaskDialog = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tabledatas.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tabledatas.length;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (val > this.tableLen) {
        this.currentPage = 1;
      }

      this.getUserData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.getUserData();
    },
    updataDialogShow(dialogName) {
      //   let oprateStauta =
      //     (dialogName == "UpdateTaskStatusDialog" &&
      //       this.search.TaskStatusCode) ||
      //     (dialogName == "UpdateTaskTypeDialog" && this.search.TaskTypeCode);
      //   if (oprateStauta) {

      //   } else {
      //     this.$message({
      //       message: "请先查询对应的数据，然后进行修改！",
      //       type: "error"
      //     });
      //   }
      this[dialogName] = true;
    },

    handleClick(text, obj) {
      let vm = this;
      switch (text) {
        case "start":
          taskOperate.StartTask(obj.taskId, vm);
          break;
        case "detail":
          vm.taskDetailDialog = true;
          vm.taskDetailObj = obj;
          break;
        case "photos":
          vm.photosDialog = true;
          vm.photoList = obj.photos;
          vm.checkTaskId = obj.taskId;
          break;
      }
    },
    seeTask(text) {
      this.seeTaskText = text;
      this.seeTaskDialog = true;
    },
    allCheck() {
      this.allCheckDialog = true;
    },
    fullImg(index) {
      //   console.log("fullImgUrl", url);
      //   console.log("fullImgUrl", index, this.taskDetailObj.photos[index].cosUrl);
      if (index > -1) {
        this.fullImgShowIndex = index;
        this.fullImgUrl = this.taskDetailObj.photos[
          this.fullImgShowIndex
        ].cosUrl;
      }

      this.fullImgShow = true;
    },
    nextPic(state) {
      if (state) {
        //后一张图片
        // console.log(this.taskDetailObj.photos.length - this.fullImgShowIndex);
        if (this.taskDetailObj.photos.length - this.fullImgShowIndex == 1) {
          this.$message({
            type: "warning",
            message: "最后一张图片",
            customClass: "zZindex"
          });
          return;
        } else {
          this.fullImgShowIndex++;
          this.fullImgUrl = this.taskDetailObj.photos[
            this.fullImgShowIndex
          ].cosUrl;
        }
      } else {
        if (this.fullImgShowIndex > 0) {
          this.fullImgShowIndex--;
          this.fullImgUrl = this.taskDetailObj.photos[
            this.fullImgShowIndex
          ].cosUrl;
        } else {
          this.$message({
            type: "warning",
            message: "第一张图片",
            customClass: "zZindex"
          });
          return;
        }
      }
    },
    closeFullImg() {
      this.fullImgShow = false;
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
.tasksSelectBox {
  max-height: 200px;
  overflow-y: auto;
  //   border: 1px solid #ccc;
  //   padding: 4px;
  .el-checkbox {
    width: 50%;
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

.taskPhoto::-webkit-scrollbar,
.tasksSelectBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.taskPhoto::-webkit-scrollbar-thumb,
.tasksSelectBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: #ddd;
}
.taskPhoto::-webkit-scrollbar-track,
.tasksSelectBox::-webkit-scrollbar-track {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #eee;
}
.taskPhoto {
  max-height: 400px;
  overflow: auto;
  width: 400px;
  margin: 0 auto;
  img {
    margin-top: 10px;
    display: block;
    width: 100%;
  }
}
</style>