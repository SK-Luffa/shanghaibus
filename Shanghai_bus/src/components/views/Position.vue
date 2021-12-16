<template>
  <div>
    <el-dialog title="纠正坐标" :visible.sync="dinateDialog" width="40%" :before-close="handleClose">
      <el-form
        :model="positionForm"
        status-icon
        :rules="positionRules"
        ref="positionForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-row :gutter="40">
          <el-col :span="12">
            <div class>
              <el-form-item label="revisedBDX" prop="revisedBDX">
                <el-input type="text" v-model="positionForm.revisedBDX"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="revisedBDY" prop="revisedBDY">
                <el-input type="text" v-model="positionForm.revisedBDY"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="success"
            class="blueBtn"
            size="mini"
            @click="submitForm('positionForm')"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="审核详情" :visible.sync="checkDialog" width="70%" :before-close="handleClose">
      <!-- <lable for="checkList">请勾选</lable> -->
     
      <!-- <lable for="checkAuditStatus">是否通过</lable>
      <el-select size="mini" id="checkAuditStatus" v-model="checkAuditStatus" placeholder="请选择是否通过">
        <el-option label="未通过" value="1"></el-option>
        <el-option label="通过" value="2"></el-option>
      </el-select>-->
<div>
  <div style="height:30px;margin-top:-10px;margin-bottom:10px">
 <ul class="vn j">
   <li><h2>纠正前</h2></li>
   <li><h2>纠正后</h2></li>
 </ul>
 </div>
 <div  style="height:15px;margin-bottom:10px">
 <ul  class="vn p">
   <li>纠正前经度:
     
      {{beforeX}}</li>
   <li>纠正前纬度:{{beforeY}}</li>
   <li> 纠正后经度:<span style="color:#108EE9">{{afterX}}</span></li>
   <li> 纠正后纬度:<span style="color:#108EE9">{{afterY}}</span></li>
 </ul>
 </div>

</div>
        <baidu-map
         class="bm-view" 
         :center="center"
            :zoom="zoom"
            @ready="handler"
            :scroll-wheel-zoom="true"
          
            ak="uV9gGX5pg4KbpEDsGICIqjK5IeLUlCVh"
            >
           <bm-marker  :zlndex="-1000000" class="marker_one" :position="{lng:beforeX, lat:beforeY}" :dragging="true" animation="BMAP_ANIMATION_BOUNCEs" @click="infoWindowClose">
              <bm-info-window :position="{lng:beforeX, lat: beforeY}"  :show="show" @close="off"  :height="110">
                <div class="zs">
                  <h3> 纠正前：</h3>
                  <p>PID:{{DPID}}</p>
                  <p>地址：{{address}}</p>          
                    <h4 class="xy">经度：{{beforeX}}</h4>
                    <h4>纬度：{{beforeY}}</h4>
                </div>
    </bm-info-window>
    </bm-marker>
     <bm-marker class="marker_two" :position="{lng:afterX, lat:afterY}" :dragging="true" animation="BMAP_ANIMATION_BOUNCEk" @click="infoWindowClose">
           <bm-info-window :position="{lng:afterX, lat: afterY}" :show="!show" @close="off_1">
               <div class="zs">
                  <h3> 纠正后：</h3>
                  <p>PID:{{DPID}}</p>
                  <p>地址：{{address}}</p>  
                    <h4  class="xy">经度：{{afterX}}</h4>
                    <h4>纬度：{{afterY}}</h4>
                  
                </div>
    </bm-info-window>
    </bm-marker>
  </baidu-map> 
  <!-- 左下角的提示信息框 -->
  <div class="Tips">
<ul class="Tips_ul">
  <li class="Tips_ul_li" @click="AddStyle(0)">全部</li>
  <li class="Tips_ul_li" @click="AddStyle(1)">纠正前</li>
  <li class="Tips_ul_li" @click="AddStyle(2)">纠正后  </li>
</ul>
  </div>
      <div style="margin-top:20px">
         <el-button @click="handleClose()"  size="mini">取消</el-button>
         <el-button type="warning"  @click="AuditCoordinates(1)" size="mini">审核不通过</el-button>
        <el-button type="primary"  @click="AuditCoordinates(2)" size="mini">审核通过</el-button>
       
      </div>
    </el-dialog>
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/Position.svg" alt />
      </div>
      <div class="sitesTop">
        <div class="inputs">
          <div class="equipSearch">
            <el-input size="mini" v-model="search.PID" placeholder="PID"></el-input>
          </div>
          <div class="equipSearchBtn" style="margin-right:20px">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="GetSiteCoordinates()"
            >搜索</el-button>
          </div>
          <div class="equipSearch">
            <el-select size="mini" v-model="search.auditStatus" placeholder="请选择任务状态">
              <el-option label="未通过" value="1"></el-option>
              <el-option label="通过" value="2"></el-option>
              <el-option label="等待审核" value="3"></el-option>
            </el-select>
          </div>
        </div>

        <div v-show="ischeck" class="btns">
          <div class="equipSearch">
            <el-button type="success" class="blueBtn" size="mini" @click="allCheck()">全部审核</el-button>
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
          <!-- <el-table-column width="72px" prop="index" label="序列"></el-table-column> -->
          <!-- <el-table-column prop="id" label="id"></el-table-column> -->
          <el-table-column prop="reportUser.Name" label="提交人"></el-table-column>
          <el-table-column prop="reviewerUser.Name" label="审核人"></el-table-column>
          <el-table-column prop="revisedBDX" label=" 更新后经度"></el-table-column>
          <el-table-column prop="revisedBDY" label="更新后纬度 "></el-table-column>
          <el-table-column prop="uncorrectedBDX" label="更新前经度"></el-table-column>
          <el-table-column prop="uncorrectedBDY" label="更新前纬度"></el-table-column>
          <el-table-column prop="siteDevice.SName" label="站点名"></el-table-column>
          <!-- <el-table-column prop="auditStatus" label="auditStatus"></el-table-column> -->
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click="handleClick('see', scope.row)" class="option-btn-see" size="mini">历史</el-button> -->
              <el-button
                @click="handleClick('edit', scope.row)"
                class="tableRedBtn"
                size="mini"
                plain
              >纠正</el-button>
              <el-button
                v-show="ischeck"
                @click="handleClick('check', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :pager-count="11"
          layout="sizes, prev, pager, next"
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
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import request from "../../assets/js/axios.js";
import { log } from "util";
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  data() {
    return {
      // 点击空白处两个点进行切换这里需要一个计数器
      nums: 0,
      show: false,
      //百度地图地址 添加到center当中的地址
      address: "上海市",
      // 更新前地址
      beforeX: "",
      beforeY: "",
      // 更新后地址
      afterX: "",
      afterY: "",
      // PID
      DPID: "",

      center: "上海市青浦区",
      zoom: -3,
      search: {
        auditStatus: "",
        PID: ""
      },
      tabledatas: [],
      tableLen: 0,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      dinateDialog: false, //纠正经纬度弹窗
      handleObj: {}, //点击的表格数据
      positionForm: {
        revisedBDX: "",
        revisedBDY: ""
      },
      positionRules: {
        revisedBDX: [
          { required: true, message: "请填写百度纬度", trigger: "blur" }
        ],
        revisedBDY: [
          { required: true, message: "请填写百度经度", trigger: "blur" }
        ]
      },
      checkDialog: false, //审核弹窗
      ischeck: false, //是否获取的是待审核的数据
      checkList: [], //选中的审核列表
      totalCheckList: [], //总的审核列表
      checkAuditStatus: "", //审核是否通过
      bm: null,
      mp: null
    };
  },
  components: {
    BaiduMap
  },
  mounted() {
    console, log(this.revisedBDX);

    // this.GetSiteCoordinates(this.pageSize, this.currentPage);
  },
  methods: {
    off() {
       var a = document.querySelectorAll(
        '[src="https://api.map.baidu.com/images/marker_red_sprite.png"]'
      );
       a[1].style.display = "block";
          a[0].style.display = "none";
          a[2].style.display="none";
          a[3].style.display="block";
      this.show = false;
    },
    off_1() {
       var a = document.querySelectorAll(
        '[src="https://api.map.baidu.com/images/marker_red_sprite.png"]'
      );
       a[0].style.display = "block";
       
          a[1].style.display = "none";
          a[2].style.display="block";
          a[3].style.display="none";
      this.show = true;
    },
    infoWindowClose() {
      this.show = !this.show;
    
    },

    handler({ BMap, map }) {
      this.center = "上海市" + this.address;

      this.zoom = 10;
      this.bm = BMap;
      this.mp = map;
    },

    timePicker(timeName) {
      for (let i = 0; i < this.CreateTime.length; i++) {
        this.searchData[timeName + (i + 1)] = timer.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          this.CreateTime[i]
        );
      }
    },
    //http://127.0.0.1:999/SiteCoordinates/GetAllCoordinates
    // GetAllCoordinates(index, page) {
    //   let vm = this;
    //   let form = new FormData();
    //   form.append("index", index);
    //   form.append("page", page);
    //   form.append("auditStatus", vm.search.auditStatus);

    //   request({
    //     url: "/SiteCoordinates/GetAllCoordinates",
    //     param: form,
    //     method: "post",
    //     onError: function() {},
    //     vm
    //   }).then(res => {
    //     if (res.code == 200) {
    //       console.log(res.data);
    //       //   vm.tabledatas = res.data;
    //       vm.tabledatas = [{}]; //todo for test
    //       vm.tableLen = res.data.length;
    //     }
    //   });
    // },
    GetSiteCoordinates(index, page) {
      let vm = this;
      let url;
      var resultData = {};
      if (vm.search.PID) {
        let data = {
          PID: vm.search.PID,
          auditStatus: parseInt(vm.search.auditStatus)
        };
        url = `/SiteCoordinates/GetSiteCoordinatesByPID?index=${index}&page=${page}`;
        resultData = JSON.stringify(data);
      } else {
        resultData = new FormData();
        resultData.append("index", index || vm.pageSize);
        resultData.append("page", page || vm.currentPage);
        resultData.append("auditStatus", vm.search.auditStatus); //http://127.0.0.1:999/SiteCoordinates/GetAllCoordinates
        url = "/SiteCoordinates/GetAllCoordinates";
      }
      console.log("resultData 123", resultData);
      console.log("789");
      request({
        url: url,
        param: resultData,
        method: "post",
        onError: function(res) {
          console.log("false没执行", res);
        },
        vm
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data);

          vm.tabledatas = res.data;
          //   vm.tabledatas = [{}]; //todo for test
          vm.tableLen = res.recordsFiltered;

          if (
            url == "/SiteCoordinates/GetAllCoordinates" &&
            vm.search.auditStatus == 3
          ) {
            vm.ischeck = true;
          } else {
            vm.ischeck = false;
          }
        }
      });
    },
    // 点击去除li身上的特殊样式 dom 是元素 cls 为class
    ClearStyle(dom, cls) {
      for (var i = 0; i < dom.length; i++) {
        if (dom[i].classList[1] == cls) {
          dom[i].classList.toggle(cls);
        }
      }
    },
    // 点击添加li身上的样式  documents为需要添加样式的dom元素数组的第几个元素
    AddStyle(documents) {
      var dom = document.getElementsByClassName("Tips_ul_li");

      this.ClearStyle(dom, "Tips_ul_liss");
      document
        .getElementsByClassName("Tips_ul_li")
        [documents].classList.toggle("Tips_ul_liss");
      // 获取百度地图的点
      var a = document.querySelectorAll(
        '[src="https://api.map.baidu.com/images/marker_red_sprite.png"]'
      );

      switch (documents) {
        // 点击全部
        case 0:
          var one = document.getElementsByClassName("marker_one")[0];

          a[0].style.display = a[1].style.display = "block";
          break;
        // 点击纠正前
        case 1:
          a[0].style.display = "block";
          a[1].style.display = "none";
          a[2].style.display="block";
          a[3].style.display="none";
          this.show = true;
          break;
        // 点击纠正后
        case 2:
          a[1].style.display = "block";
          a[0].style.display = "none";
          a[2].style.display="none";
          a[3].style.display="block";
          this.show = false;
          break;
      }
    },

    AuditCoordinates(state) {
      let vm = this;
      let arr = [];
      //   if (obj) {
      //     arr.push(obj.siteDevice.PID);
      //   } else {
      //     arr = vm.tabledatas.map(function(item) {
      //       return item.siteDevice.PID;
      //     });
      //   }
      let data = {
        ids: vm.checkList,
        AuditStatus: state
      };
      //console.log("checkList", data);
      //return;
      request({
        url: "/SiteCoordinates/AuditCoordinates",
        method: "post",
        param: JSON.stringify(data),
        onError: function() {},
        vm
      }).then(res => {
        if (res.code == 200) {
          vm.handleClose();
          vm.GetSiteCoordinates(vm.pageSize, vm.currentPage);
          vm.$message({
            message: "审核成功",
            type: "success",
            duration: 1000
          });
        }
      });
    },
    allCheck() {
      this.checkDialog = true;
      this.totalCheckList = this.tabledatas;
      this.checkList = [];
    },
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");

          let data = {
            PID: vm.handleObj.siteDevice.PID,
            revisedBDX: parseFloat(vm.positionForm.revisedBDX),
            revisedBDY: parseFloat(vm.positionForm.revisedBDY)
          };
          //   console.log(" vm.handleObj.PID", vm.handleObj.siteDevice.PID);
          request({
            url: "/SiteCoordinates/ReportSiteCoordinate", ///SiteCoordinates/ReportSiteCoordinate
            method: "post",
            param: JSON.stringify(data),
            onError: function() {},
            vm
          }).then(res => {
            if (res.code == 200) {
              vm.dinateDialog = false;
              vm.$message({
                message: "修改成功",
                type: "success",
                duration: 1000
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(text, obj) {
      let vm = this;

      this.handler({ BMap: this.bm, map: this.mp });

      console.log(123, obj);

      // 地址
      this.address = obj.siteDevice.SName;
      // 更新前X
      this.beforeX = obj.revisedBDX;
      this.beforeY = obj.revisedBDY;
      this.afterX = obj.uncorrectedBDX;
      this.afterY = obj.uncorrectedBDY;
      this.DPID = obj.siteDevice.PID;
      this.infoWindowClose();
      switch (text) {
        case "see": //查看历史坐标
          break;
        case "edit": //编辑纠正坐标
          vm.dinateDialog = true;
          vm.handleObj = obj;

          console.log("handleObj", obj);
          //http://127.0.0.1:999/SiteCoordinates/ReportSiteCoordinate
          break;
        case "check":
          //   vm.AuditCoordinates(obj);
          vm.checkDialog = true;
          vm.checkList = [];
          vm.totalCheckList = [];
          vm.totalCheckList.push(obj);
          //   console.log(obj);
          vm.checkList.push(obj.id);
          break;
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.GetSiteCoordinates(this.pageSize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetSiteCoordinates(this.pageSize, this.currentPage);
    },
    handleClose() {
      this.dinateDialog = false;
      this.checkDialog = false;
    }
  }
};
</script>
<style lang="scss">
.bm-view {
  width: 100%;
  height: 550px;
}
.xy {
  margin-top: 10px;
}
.zs {
  height: 110px;
}

.vn li {
  float: left;
  list-style: none;
}
.j li {
  width: 50%;
}
.p li {
  width: 25%;
}
.Tips {
  width: 52px;
  height: 93px;
  background: rgba($color: #fff, $alpha: 0.5);

  position: absolute;
  top: 577px;
  right: 20px;
}
.Tips_ul {
  height: 100%;
  width: 100%;
}
.Tips_ul_li {
  box-sizing: border-box;
  height: 33%;
  background-color: #fff;
  line-height: 33px;
  width: 100%;
  color: #000;
  list-style: none;
  cursor: pointer;
}
.Tips_ul_liss {
  background-color: rgba($color: #108ee9, $alpha: 0.3);
  color: #108ee9;
  border-bottom: 2px solid #108ee9;
}
</style>