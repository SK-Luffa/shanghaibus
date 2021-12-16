<template>
  <div>
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
                    <div class>{{taskDetailObj.siteDevice.Addr}}</div>
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
                    <div class>{{taskDetailObj.siteDevice.BDY}}</div>
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
      <div style="margin-top:10px" v-show="canCheck">
        <el-button
          type="success"
          class="greenBtn"
          size="mini"
          @click="ckeckResult(105,taskDetailObj.taskId)"
        >通过</el-button>
        <el-button
          type="success"
          class="redBtn"
          size="mini"
          @click="ckeckResult(104,taskDetailObj.taskId)"
        >不通过</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="'完成任务-'+isOverText"
      :visible.sync="finish1Dialog"
      width="960px"
      :before-close="handleClose"
    >
      <el-row :gutter="40">
        <el-col :span="4">上传照片：</el-col>
        <el-col :span="20">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            ref="uploadImg"
            :on-change="pictureChange"
            :on-remove="pictureRemove"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">上传视频：</el-col>
        <el-col :span="20">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="VideoChange"
            :on-remove="VideoRemove"
            ref="uploadVideo"
          >
            <i slot="default" class="el-icon-plus"></i>
            <!-- <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>-->
          </el-upload>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">处理故障：</el-col>
        <el-col :span="20">
          <!-- <el-checkbox-group v-model="finish1Data.faultHandlingCodeList" @change="ttt">
            <el-checkbox v-for="item in handlingCodeList" :key="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>-->
          <el-checkbox-group v-model="faultHandlingCodeList">
            <el-checkbox v-for="item in handlingCodeList" :key="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top:10px">
        <el-col :span="4">备注信息：</el-col>
        <el-col :span="20">
          <el-input size="mini" v-model="finish1Data.appRemarks" autocomplete="off"></el-input>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <div style="margin-top:10px">
        <el-button type="primary" @click="FinishTask()" size="mini">{{isOverText}}</el-button>
      </div>
    </el-dialog>
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/tasksSearch.svg" alt />
      </div>
      <div class="taskTopSearch">
        <el-form ref="form" :model="searchData" size="mini" label-width="100px">
          <div class="timeSelectBox" :style="{height:moreSelectBoxH}">
            <el-row :gutter="40">
              <el-col :span="6">
                <div class>
                  <el-form-item label="创建时间">
                    <el-date-picker
                      v-model="CreateTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('CreateTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-form-item label="要求开始时间">
                    <el-date-picker
                      v-model="SetStartTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('SetStartTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-form-item label="要求结束时间">
                    <el-date-picker
                      v-model="SetEndTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('SetEndTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-form-item label="实际开始时间 ">
                    <el-date-picker
                      v-model="StartTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('StartTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class>
                  <el-form-item label="实际结束时间">
                    <el-date-picker
                      v-model="EndTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('EndTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-form-item label="上传照片时间">
                    <el-date-picker
                      v-model="UploadedTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('UploadedTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-form-item label="审核时间">
                    <el-date-picker
                      v-model="AuditTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="timePicker('AuditTime')"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class>
                  <el-checkbox v-model="searchData.HasPhotos">含有图片</el-checkbox>
                  <el-checkbox v-model="searchData.HasVideos">含有视频</el-checkbox>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="40">
            <el-col :span="6">
              <div class>
                <el-form-item label="任务ID">
                  <el-input v-model="searchData.TaskId"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-form-item label="设备PID">
                  <el-input v-model="searchData.PID"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-form-item label="设备SCode">
                  <el-input v-model="searchData.SCode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-form-item label="创建人">
                  <!-- <el-input v-model="searchData.CreateUserId"></el-input> -->
                  <el-select v-model="searchData.CreateUserId" placeholder="请选择">
                    <el-option
                      v-for="item in unMobileUser"
                      :key="item.userId"
                      :label="item.Name+item.phone"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <div class>
                <el-form-item label="执行人">
                  <!-- <el-input v-model="searchData.ExecutorUserId"></el-input> -->
                  <el-select v-model="searchData.ExecutorUserId" placeholder="请选择">
                    <el-option
                      v-for="item in mobileUser"
                      :key="item.userId"
                      :label="item.Name+item.phone"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-form-item label="任务类型">
                  <!-- <el-input v-model="searchData.TaskTypeCode"></el-input> -->
                  <el-select v-model="searchData.TaskTypeCode" placeholder="请选择">
                    <el-option
                      v-for="item in allTaskType"
                      :key="item.name"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-form-item label="任务状态">
                  <!-- <el-input v-model="searchData.TaskStatusCode"></el-input> -->
                  <el-select v-model="searchData.TaskStatusCode" placeholder="请选择">
                    <el-option
                      v-for="item in allTaskStatus"
                      :key="item.name"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-button class="blueBtn" size="mini" @click="IntegratedQueryTask()">查询</el-button>
                <el-button class="blueBtn" size="mini" @click="moreSelect()">
                  更多
                  <i
                    class="el-icon-arrow-down moreSelectIcon"
                    :style="{transform: moreSelectIconDeg}"
                  ></i>
                </el-button>
                <el-button
                  icon="icon iconfont iconexport-icon "
                  class="blueBtn"
                  size="mini"
                  @click="AddExcelExportInfo()"
                >导出</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table mainTable">
        <el-table
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(256, 256, 256, 0.2)"
          style="width: 100%;margin-top:10px;"
          :data="tabledatas"
        >
          <el-table-column width="72px" prop="id" label="id"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="executorUser.Name" label="执行人"></el-table-column>
          <el-table-column prop="createUser.Name" label="创建人"></el-table-column>
          <el-table-column prop="siteDevice.SName" label="站点名称"></el-table-column>
          <el-table-column prop="taskType.name" label="任务类型"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row.btnObj.enText, scope.row,scope.$index)"
                class="tableGreenBtn"
                size="mini"
                :disabled="scope.row.btnObj.unclick"
                plain
              >{{scope.row.btnObj.text}}</el-button>
              <el-button
                @click="handleClick('detail', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
              >详情</el-button>
              <el-button
                @click="handleClick('toClose', scope.row)"
                class="tableRedBtn"
                size="mini"
                plain
              >关闭</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :pager-count="11"
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
import timer from "../../assets/js/time.js";
import request from "../../assets/js/axios.js";
import taskOperate from "../js/taskOperate.js";
import COS from "cos-js-sdk-v5";

// import func from "../../../vue-temp/vue-editor-bridge.js";
export default {
  data() {
    return {
      searchData: {
        //综合任务查询  除HasPhotos和HasVideos两个必传字段外，其他如果没有需要查询的字段，则可以不传
        TaskId: "",
        PID: "",
        SCode: "",
        CreateUserId: "",
        ExecutorUserId: "",
        CreateTime1: "",
        CreateTime2: "",
        SetStartTime1: "",
        SetStartTime2: "",
        SetEndTime1: "",
        SetEndTime2: "",
        StartTime1: "",
        StartTime2: "",
        EndTime1: "",
        EndTime2: "",
        UploadedTime1: "",
        UploadedTime2: "",
        AuditTime1: "",
        AuditTime2: "",
        TaskTypeCode: 0, //
        TaskStatusCode: 0,
        HasPhotos: false,
        HasVideos: false
      },
      CreateTime: "",
      SetStartTime: "",
      SetEndTime: "",
      StartTime: "",
      EndTime: "",
      UploadedTime: "",
      AuditTime: "",
      tabledatas: [],
      tableLen: 0,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      mobileUser: [],
      unMobileUser: [],
      allTaskType: [
        {
          Id: "不限",
          code: 0,
          name: "不限"
        }
      ],
      allTaskStatus: [
        {
          Id: "不限",
          code: 0,
          name: "不限"
        }
      ],
      moreSelectBoxH: "0px",
      moreSelectIconDeg: "rotate(0deg)",
      cosData: {},
      finish1Dialog: false,
      finish1Data: {
        taskId: "",
        appRemarks: "",
        photosNumber: "",
        videosNumber: "",
        cosImageNameList: [],
        cosVideoNameList: []
      },
      isOverText: "录入信息",
      handlingCodeList: [],
      faultHandlingCodeList: [],
      allFiles: {
        cosImageNameList: [],
        cosVideoNameList: []
      },
      pageLoading: null,
      uploadUrl: "",
      //   handledObj: {},
      handledIndex: "",
      taskDetailDialog: false,
      taskDetailObj: {
        createUser: {},
        executorUser: {},
        taskStatus: {},
        taskType: {},
        siteDevice: {},
        photos: []
      },
      taskActiveName: "first",
      canCheck: false,
      fullImgShow: false,
      fullImgUrl: "",
      fullImgShowIndex: "",
      cosUrlArray: {
        cosImageNameList: [],
        cosVideoNameList: []
      },
      cosTotalLength: 0,
      hasUploadLength: 0
    };
  },
  mounted() {
    this.IntegratedQueryTask();
    let vm = this;
    request({
      url: "/User/GetAllUser",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.mobileUser.push({
          id: 0,
          userId: "",
          userName: "不限",
          UserIcon: "",
          Name: "不限",
          phone: "",
          EMail: ""
        });
        vm.unMobileUser.push({
          id: 0,
          userId: "",
          userName: "不限",
          UserIcon: "",
          Name: "不限",
          phone: "",
          EMail: ""
        });
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isMobile) {
            vm.mobileUser.push(res.data[i]);
          } else {
            vm.unMobileUser.push(res.data[i]);
          }
        }
      }
    });
    request({
      url: "/TaskStatus/GetAllTaskStatus",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.allTaskStatus = vm.allTaskStatus.concat(res.data);
      }
    });
    request({
      url: "/TaskType/GetAllTaskType",
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.allTaskType = vm.allTaskType.concat(res.data);
      }
    });
    request({
      url: "/FaultHandling/GetAllFaultHandling", //http://127.0.0.1:999/FaultHandling/GetAllFaultHandling
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.handlingCodeList = res.data;
        //vm.allTaskType = vm.allTaskType.concat(res.data);
      }
    });
  },
  methods: {
    handleClose() {
      this.isOverText = "录入信息";
      this.faultHandlingCodeList = [];

      this.finish1Dialog = false;
      this.taskDetailDialog = false;
      console.log(" this.taskDetailDialog", this.taskDetailDialog);
      this.finish1Data = {
        taskId: "",
        appRemarks: "",
        photosNumber: "",
        videosNumber: "",
        cosImageNameList: [],
        cosVideoNameList: []
      };
      this.$refs.uploadImg && this.$refs.uploadImg.clearFiles();
      this.$refs.uploadVideo && this.$refs.uploadVideo.clearFiles();
    },
    timePicker(timeName) {
      for (let i = 0; i < this[timeName].length; i++) {
        this.searchData[timeName + (i + 1)] = timer.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          this[timeName][i]
        );
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
          //   console.log(" vm.handleClose", vm.handleClose);
          vm.handleClose();
          vm.$message({
            type: "success",
            message: "已完成任务审核！"
          });
          var btnObj = {};
          if (taskStatusCode == 105) {
            //通过
            btnObj = {
              text: "已通过",
              enText: "passed",
              unclick: true
            };
          } else {
            btnObj = {
              text: "不通过",
              enText: "unpassed",
              unclick: true
            };
          }
          vm.taskDetailObj.btnObj = btnObj;
          //   vm.getUserData("GetTaskForExecutorUserAndTaskStatus");
        }
      });
    },
    //http://127.0.0.1:999/Task/IntegratedQueryTask?index=10&page=1
    IntegratedQueryTask() {
      let vm = this;
      let data = vm.searchData;
      vm.loading = true;
      request({
        url: `/Task/IntegratedQueryTask?index=${vm.pageSize}&page=${vm.currentPage}`,
        param: JSON.stringify(data),
        method: "post",
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.dealData(res.data);
          vm.tableLen = res.recordsFiltered;
          vm.loading = false;
        }
      });
    },

    dealData(tasksArr) {
      this.tabledatas = tasksArr.map(function(item) {
        switch (item.taskStatus.code) {
          case 100: //已发布的任务
            item.btnObj = {
              text: "开始任务",
              enText: "start"
            };
            break;
          case 101: //"任务进行中"
            item.btnObj = {
              text: "完成任务",
              enText: "finish1"
            };
            break;
          case 102: //"任务完成，等待资源上传"
            item.btnObj = {
              text: "上传资料",
              enText: "finish2"
            };
            break;
          case 103: //"任务已完成，等待审核"
            item.btnObj = {
              text: "审核",
              enText: "check"
            };
            break;
          case 104: //"	任务已完成，审核不通过"
            item.btnObj = {
              text: "不通过",
              enText: "unpassed",
              unclick: true
            };
            break;
          case 105: //"任务已完成，审核通过"
            item.btnObj = {
              text: "已通过",
              enText: "passed",
              unclick: true
            };
            break;
          case 106: //"	此任务被其他任务覆盖"
            item.btnObj = {
              text: "已覆盖",
              enText: "cover",
              unclick: true
            };
            break;
          case 107: //"		任务完成，部分资源上传，等待所有资源上传"
            item.btnObj = {
              text: "上传所有资源",
              enText: "waitAll"
            };
            break;
          case 108: //"	任务被手动关闭"
            item.btnObj = {
              text: "已关闭",
              enText: "closed",
              unclick: true
            };
            break;
        }
        return item;
      });
    },
    AddExcelExportInfo() {
      let vm = this;
      var obj = {};
      obj.taskId = vm.tabledatas.map(function(item) {
        return item.taskId;
      });

      this.$prompt("请输入备注信息", "备注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          obj.remark = "";
          if (value) {
            obj.remark = value;
          }
          request({
            url: "/ExcelExportInfo/AddExcelExportInfo", //http://127.0.0.1:999/ExcelExportInfo/AddExcelExportInfo
            method: "post",
            param: JSON.stringify(obj),
            onError: function() {},
            vm
          }).then(res => {
            vm.$message({
              type: "success",
              message: "文件生成中，请稍后在邮箱查收！"
            });
          });
        })
        .catch(() => {
          vm.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    GetAllExcelPortInfoByUserId(createCode) {
      let vm = this;
      let form = new FormData();
      form.append("createCode", createCode);
      request({
        url: "/ExcelExportInfo/GetExcelPortInfoByCreateCode", //http://127.0.0.1:999/ExcelExportInfo/GetExcelPortInfoByCreateCode
        method: "post",
        param: form,
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.$message({
            type: "success",
            message: "下载成功"
          });
        }
      });
    },

    moreSelect() {
      if (this.moreSelectBoxH == "0px") {
        this.moreSelectBoxH = "92px";
        this.moreSelectIconDeg = "rotate(180deg)";
      } else {
        this.moreSelectBoxH = "0px";
        this.moreSelectIconDeg = "rotate(0deg)";
      }
    },
    FinishTask() {
      this.isOverText == "录入信息" ? this.FinishTask1() : this.FinishTask2();
    },
    FinishTask1() {
      taskOperate.FinishTask1(this.finish1Data, this);
    },
    FinishTask2() {
      var canUpload = true;
      let vm = this;
      vm.pageLoading = vm.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      vm.cosTotalLength =
        vm.allFiles.cosImageNameList.length +
        vm.allFiles.cosVideoNameList.length;
      vm.hasUploadLength = 0;
      for (let i = 0; i < vm.allFiles.cosImageNameList.length; i++) {
        if (canUpload) {
          taskOperate.uploadFiles(
            vm.allFiles.cosImageNameList[i],
            canUpload,
            vm,
            "cosImageNameList",
            "taskid"
          );
        } else {
          break;
        }
      }
      for (let i = 0; i < vm.allFiles.cosVideoNameList.length; i++) {
        if (canUpload) {
          taskOperate.uploadFiles(
            vm.allFiles.cosVideoNameList[i],
            canUpload,
            vm,
            "cosVideoNameList",
            "taskid"
          );
        } else {
          break;
        }
      }
      //   if (canUpload) {
      //     taskOperate.FinishTask2(this.finish1Data, this);
      //   }
    },
    // ckeckResult(taskStatusCode, taskId) {
    //   let vm = this;
    //   let data = {
    //     taskIdList: [taskId],
    //     taskStatusCode: taskStatusCode
    //   };
    //   request({
    //     url: "/Task/UpdateTaskStatus", //http://127.0.0.1:999/Task/UpdateTaskStatus
    //     method: "post",
    //     param: JSON.stringify(data),
    //     onError: function() {},
    //     vm
    //   }).then(res => {
    //     if (res.code == 200) {
    //       vm.$message({
    //         type: "success",
    //         message: "已完成任务审核！"
    //       });
    //     }
    //   });
    // },
    // tocheckTask(obj) {
    //   let vm = this;
    //   this.$confirm("次任务是否通过审核？", "任务审核", {
    //     confirmButtonText: "通过",
    //     cancelButtonText: "不通过",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       vm.ckeckResult(105, obj.taskId);
    //     })
    //     .catch(() => {
    //       console.log("不通过");
    //       //   vm.ckeckResult(104, obj.taskId);
    //     });
    // },

    handleClick(text, obj, handleIndex) {
      let vm = this;
      console.log("index", obj, handleIndex);

      vm.handledIndex = handleIndex;
      switch (text) {
        case "start": //已发布的任务
          taskOperate.StartTask(obj.taskId, handleIndex, vm);
          vm.taskDetailObj = obj;
          break;
        case "finish1": //"任务进行中"
        case "finish2": //"任务完成，等待资源上传"
          vm.taskDetailObj = obj;
          vm.finish1Data.taskId = obj.taskId;
          vm.finish1Data.faultHandlingCodeList = obj.taskId;
          vm.finish1Dialog = true;
          break;
        case "check": //"任务已完成，等待审核"
          // vm.tocheckTask(obj);
          vm.taskDetailDialog = true;
          vm.taskDetailObj = obj;
          vm.canCheck = obj.taskStatus.code == 103;
          break;
        case "detail": //"任务已完成，等待审核"
          vm.taskDetailDialog = true;
          vm.taskDetailObj = obj;
          vm.canCheck = obj.taskStatus.code == 103;
          break;
        case "unpassed": //"	任务已完成，审核不通过"
          break;
        case "passed": //"任务已完成，审核通过"
          break;
        case "cover": //"	此任务被其他任务覆盖"
          break;
        case "waitAll": //"		任务完成，部分资源上传，等待所有资源上传"
          vm.FinishTask2(obj);
          break;
        case "closed": //"	任务被手动关闭"
          // http://127.0.0.1:999/Task/CloseTask

          break;
        case "toClose": //"	手动关闭"
          this.$confirm("谨慎关闭, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              taskOperate.CloseTask(obj.taskId, handleIndex, vm);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消关闭"
              });
            });
          break;
      }
    },
    handleSizeChange(val) {
      //   this.currentPage = 1;
      this.pageSize = val;
      if (val > this.tableLen) {
        this.currentPage = 1;
      }
      this.IntegratedQueryTask();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.IntegratedQueryTask();
    },

    pictureChange(file, fileList) {
      this.changeFilesList("cosImageNameList", file);
    },
    VideoChange(file, fileList) {
      this.changeFilesList("cosVideoNameList", file);
    },

    changeFilesList(name, file) {
      this.finish1Data[name].push(file.name);
      this.allFiles[name].push(file);
    },
    VideoRemove(file) {
      for (let i = 0; i < this.finish1Data.cosVideoNameList.length; i++) {
        if (this.finish1Data.cosVideoNameList[i] == file.name) {
          this.finish1Data.cosVideoNameList.splice(i, 1);
          this.allFiles.cosVideoNameList.splice(i, 1);
          break;
        }
      }
    },
    pictureRemove(file) {
      for (let i = 0; i < this.finish1Data.cosImageNameList.length; i++) {
        if (this.finish1Data.cosImageNameList[i] == file.name) {
          this.finish1Data.cosImageNameList.splice(i, 1);
          this.allFiles.cosImageNameList.splice(i, 1);
          break;
        }
      }
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
.taskTopSearch {
  color: #fff;
  .el-input__inner,
  .el-range-input,
  .el-checkbox__inner {
    background: rgba($color: #000000, $alpha: 0);
  }

  .el-col-3 {
    width: 20%;
  }
  .el-form-item {
    .el-select {
      width: 100%;
    }
  }

  .el-checkbox {
    line-height: 28px;
  }

  .el-checkbox,
  .el-range-separator,
  .el-form-item__label {
    color: #fff;
  }

  .el-date-editor {
    width: 100%;

    .el-range-input {
      color: #fff;
    }
  }
}
.timeSelectBox {
  overflow: hidden;
}
.timeSelectBox,
.moreSelectIcon {
  transition: all 1s;
}
.el-date-editor {
  width: 100%;
}
.el-message-box {
  .el-input__inner {
    height: 28px;
    line-height: 28px;
    color: #000;
  }
}
.el-upload-list__item {
  overflow: hidden;
  //   display: inline-flex !important;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto !important;
  }
}
</style>