<template>
  <div>
    <el-dialog
      title="多ID搜索"
      :visible.sync="searchIdlistDialog"
      width="960px"
      :before-close="handleClose"
      ><div style="width: 80%; margin: 0 auto">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="siteList"
        >
        </el-input>
        <el-button
          style="margin-top: 30px"
          type="success"
          size="mini"
          class="leftBtn blueBtn"
          @click="getSiteDeviceForPIDList()"
          >查找</el-button
        >
      </div></el-dialog
    >
    <el-dialog
      title="创建故障点"
      :visible.sync="createFailureSiteDialog"
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
      <el-row :gutter="40" style="margin-top: 10px">
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
          </el-upload>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top: 10px">
        <el-col :span="4">故障现象:</el-col>
        <el-col :span="20">
          <el-checkbox-group v-model="faultPhenomenonCodeList">
            <el-checkbox
              v-for="item in phenomenonCodeList"
              :key="item.name"
              :label="item.name"
            ></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <el-row :gutter="40" style="margin-top: 10px">
        <el-col :span="4">备注信息：</el-col>
        <el-col :span="20">
          <el-input
            size="mini"
            v-model="createFailureSiteData.remarks"
            autocomplete="off"
          ></el-input>
        </el-col>
        <div class="clearfix"></div>
      </el-row>
      <div style="margin-top: 10px">
        <el-button type="primary" @click="CreateFailureSite()" size="mini"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="站点详情"
      :visible.sync="siteDetailDialog"
      width="800px"
      :before-close="handleClose"
      class="siteDetails"
    >
      <el-tabs v-model="siteDetailActiveName">
        <el-tab-pane label="常规" name="normal">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点名称：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.SName }}</div>
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
                    <div class>{{ siteDetailObj.Addr }}</div>
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
                    <div class>站点编码：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.SCode }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>站点PID：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.PID }}</div>
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
                    <div class>站点类型：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.Ptype }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>屏幕类型：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.Stype }}</div>
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
                    <div class>方向：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.FxDirection }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>线路：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.Lines }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="电池" name="power">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>电池电量：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.DumpE }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>充电电流：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.CDdl }}</div>
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
                    <div class>主电池电压：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.MbV }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>副电池电压：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.AbV }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="坐标" name="position">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>百度经度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.BDX }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>百度纬度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.BDY }}</div>
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
                    <div class>经度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.X }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>纬度：</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.Y }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div class="siteMap">
            <baidu-map
              class="bm-view"
              :center="center"
              :zoom="zoom"
              @ready="handler"
              :scroll-wheel-zoom="true"
            >
              <bm-marker
                :position="{ lng: mark.lng, lat: mark.lat }"
                :dragging="false"
              ></bm-marker>
            </baidu-map>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图片" name="image">
          <img
            v-if="siteDetailObj.StatusPicUrl"
            :src="siteDetailObj.StatusPicUrl"
            alt
          />
          <div v-else>暂无图片信息</div>
        </el-tab-pane>
        <el-tab-pane label="供应商" name="supplier">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class>供应商:</div>
                  </el-col>
                  <el-col :span="16">
                    <div class>{{ siteDetailObj.Supplier }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      title="新增站点"
      :visible.sync="addDialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        ref="addForm"
        size="mini"
        id="addSite"
        :rules="addRules"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="设备编码:" label-width="100px" prop="PID">
                <el-input v-model="addForm.PID" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="站点编码:" label-width="100px" prop="SCode">
                <el-input v-model="addForm.SCode" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="站点名:" label-width="100px" prop="SName">
                <el-input v-model="addForm.SName" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="屏幕类型:" label-width="100px" prop="Stype">
                <!-- <el-input v-model="addForm.Stype" autocomplete="off"></el-input> -->
                <el-select
                  size="mini"
                  v-model="addForm.Stype"
                  placeholder="请选择屏幕类型"
                >
                  <el-option label="EPD" value="EPD"></el-option>
                  <el-option label="LCD" value="LCD"></el-option>
                  <el-option label="LED" value="LED"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="站点类型:" label-width="100px" prop="Ptype">
                <!-- <el-input v-model="addForm.Ptype" autocomplete="off"></el-input> -->
                <el-select
                  size="mini"
                  v-model="addForm.Ptype"
                  placeholder="请选择站点类型"
                >
                  <el-option label="站亭" value="站亭"></el-option>
                  <el-option label="站杆" value="站杆"></el-option>
                  <!-- <el-option label="LED" value="LED"></el-option> -->
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="地址:" label-width="100px" prop="Addr">
                <el-input v-model="addForm.Addr" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item
                label="方向:"
                label-width="100px"
                prop="FxDirection"
              >
                <el-input
                  v-model="addForm.FxDirection"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="纬度:" label-width="100px" prop="X">
                <el-input v-model="addForm.X" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="经度:" label-width="100px" prop="Y">
                <el-input v-model="addForm.Y" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="百度纬度:" label-width="100px" prop="BDX">
                <el-input v-model="addForm.BDX" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="百度经度:" label-width="100px" prop="BDY">
                <el-input v-model="addForm.BDY" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="公交路线:" label-width="100px" prop="Lines">
                <el-input v-model="addForm.Lines" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class>
              <el-form-item label="备注:" label-width="100px">
                <el-input
                  v-model="addForm.Remark"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class>
              <el-form-item label="用户名:" label-width="100px" prop="Supplier">
                <el-input
                  v-model="addForm.Supplier"
                  disabled
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="addDialog = false" class="greenBtn" size="mini"
            >取消</el-button
          >
          <el-button @click="newSite('addForm')" class="redBtn" size="mini"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="pageContent">
      <div class="title-svg">
        <img src="../../assets/images/site.svg" alt />
      </div>
      <div
        class="inputs timeSelectBox sitepageTop"
        style="display: flex; jusity-content: flex-start"
        :style="{ height: moreSelectBoxH }"
      >
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateALLSiteDeviceEmptyXY()"
            >更新经纬度</el-button
          >
        </div>
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateAomaData('/admin/GetAomaSiteInfo')"
            >更新奥玛公交数据</el-button
          >
        </div>
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateAomaData('/admin/UpdateCameraImageLibExpired')"
            >更新摄像图库</el-button
          >
        </div>
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateAomaData('/admin/UpdateVideoLibExpired')"
            >更新视频库</el-button
          >
        </div>
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateAomaData('/admin/UpdateImageLibExpired')"
            >更新图库</el-button
          >
        </div>
        <div class="equipSearch">
          <el-button
            type="success"
            size="mini"
            class="leftBtn blueBtn"
            @click="UpdateAomaData('/admin/ProSiteDeviceCameraUrl')"
            >处理澳马摄像图片</el-button
          >
        </div>
      </div>
      <div class="sitesTop">
        <div class="inputs">
          <div class="equipSearch">
            <el-input
              size="mini"
              v-model="search.num"
              placeholder="站点ID"
            ></el-input>
          </div>
          <div class="equipSearch">
            <el-input
              size="mini"
              v-model="search.getvalue"
              placeholder="模糊查询"
            ></el-input>
          </div>
          <div class="equipSearch">
            <el-select
              size="mini"
              v-model="search.onoff"
              placeholder="请选择在线状态"
              @change="GetSiteDeviceForIsOnline(1)"
            >
              <el-option
                v-for="item in onoffoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="equipSearchBtn">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="GetSiteDeviceByDeviceId()"
              >搜索</el-button
            >
          </div>
          <div class="equipSearchBtn">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="showSearchDialog()"
              >多ID搜索</el-button
            >
          </div>
          <div class="btns"></div>
          <div class="equipSearchBtn">
            <el-button
              type="success"
              size="mini"
              class="leftBtn blueBtn"
              @click="getSiteDeviceForContains()"
              >模糊查询</el-button
            >
          </div>
          <div class="equipSearchBtn">
            <el-button class="blueBtn" size="mini" @click="moreSelect()">
              更多
              <i
                class="el-icon-arrow-down moreSelectIcon"
                :style="{ transform: moreSelectIconDeg }"
              ></i>
            </el-button>
          </div>
        </div>
        <div class="btns">
          <div class>
            <el-button
              type="success"
              icon="el-icon-plus"
              class="blueBtn"
              size="mini"
              @click="addEquipmentfun()"
              >新增站点</el-button
            >
          </div>
        </div>
      </div>

      <div class="table mainTable">
        <el-table
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(256, 256, 256, 0.2)"
          style="width: 100%; margin-top: 10px"
          :data="tabledatas"
        >
          <el-table-column
            width="72px"
            prop="index"
            label="序列"
          ></el-table-column>
          <el-table-column prop="PID" label="站点id"></el-table-column>
          <el-table-column prop="SName" label="站点名称"></el-table-column>
          <!-- <el-table-column prop="Addr" label="站点地址"></el-table-column> -->
          <el-table-column prop="FxDirection" label="方向"></el-table-column>
          <el-table-column prop="Stype" label="设备类型"></el-table-column>
          <el-table-column prop="Ptype" label="站点类型"></el-table-column>
          <!-- <el-table-column prop="StDate" label="距上次刷新间隔"></el-table-column> -->
          <el-table-column prop="SunPadV" label="主电池电压"></el-table-column>
          <el-table-column prop="SunPadV" label="副电池电压"></el-table-column>
          <el-table-column prop="CDdl" label="充电电流"></el-table-column>
          <el-table-column prop="Online" label="在线情况"></el-table-column>
          <el-table-column prop="option" label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                @click="handleClick('detail', scope.row)"
                class="tableGreenBtn"
                size="mini"
                plain
                >详情</el-button
              >
              <el-button
                @click="handleClick('delete', scope.row)"
                class="tableRedBtn"
                size="mini"
                plain
                >删除</el-button
              >
              <el-button
                @click="handleClick('createFailureSite', scope.row)"
                class="tableBlueBtn"
                size="mini"
                plain
                >故障上报</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :currentPage="currentPage"
          :page-sizes="[10, 20, 50, 100, 1000]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="tableLen"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../assets/js/axios.js";
import taskOperate from "../js/taskOperate.js";
export default {
  data() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      center: { lng: 0, lat: 0 },
      mark: { lng: 0, lat: 0 },
      zoom: 16,
      addDialog: false,
      siteList: "",
      addForm: {
        PID: "",
        SCode: "",
        SName: "",
        Stype: "",
        Ptype: "",
        Addr: "",
        FxDirection: "",
        X: "",
        Y: "",
        BDX: "",
        BDY: "",
        Lines: "",
        Remark: "",
        Supplier: user.userName,
      },
      addRules: {
        PID: [{ required: true, message: "请输入设备编码", trigger: "blur" }],
        SCode: [{ required: true, message: "请输入站点编码", trigger: "blur" }],
        SName: [{ required: true, message: "请输入站点名", trigger: "blur" }],
        Stype: [
          { required: true, message: "请选择屏幕类型", trigger: "change" },
        ],
        Ptype: [
          { required: true, message: "请选择站点类型", trigger: "change" },
        ],
        Addr: [{ required: true, message: "请输入站点地址", trigger: "blur" }],
        FxDirection: [
          { required: true, message: "请输入站点方向", trigger: "blur" },
        ],
        X: [
          { required: true, message: "请输入纬度", trigger: "blur" },
          {
            pattern: "^([0-9]?|[1-8][0-9]?)(/.[0-9]*)?$",
            message: "范围在0-90",
            trigger: "blur",
          },
        ],
        Y: [
          { required: true, message: "请输入经度", trigger: "blur" },
          {
            pattern: "^((1[0-7][0-9])?|([1-9][0-9])?|[0-9]?)(/.[0-9]*)$",
            message: "范围在0-180",
            trigger: "blur",
          },
        ],
        BDX: [
          { required: true, message: "请输入百度纬度", trigger: "blur" },
          {
            pattern: "^([0-9]?|[1-8][0-9]?)(/.[0-9]*)?$",
            message: "范围在0-90",
            trigger: "blur",
          },
        ],
        BDY: [
          { required: true, message: "请输入百度经度", trigger: "blur" },
          {
            pattern: "^((1[0-7][0-9])?|([1-9][0-9])?|[0-9]?)(/.[0-9]*)$",
            message: "范围在0-180",
            trigger: "blur",
          },
        ],
        Lines: [{ required: true, message: "请输入公交路线", trigger: "blur" }],
      },
      search: {
        num: "",
        site: "",
        onoff: "",
        type: "",
        getvalue: "",
      },
      onoffoptions: [
        { value: "false", label: "离线" },
        { value: "true", label: "在线" },
      ],
      typeoptions: [
        { value: "离线", label: "离线" },
        { value: "在线", label: "在线" },
      ],
      tabledatas: [],
      tableLen: 0,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      lastOperate: "",
      siteDetailDialog: false,
      siteDetailObj: {},
      siteDetailActiveName: "normal",
      createFailureSiteData: {
        PID: "",
        remarks: "",
        faultPhenomenonCodeList: [],
        PhotosCosNameList: [],
        VideosCosNameList: [],
      },
      createFailureSiteDialog: false,
      phenomenonCodeList: [],
      faultPhenomenonCodeList: [],
      allFiles: {
        PhotosCosNameList: [],
        VideosCosNameList: [],
      },
      pageLoading: null,
      uploadUrl: "",
      cosUrlArray: {
        PhotosCosNameList: [],
        VideosCosNameList: [],
      },
      cosTotalLength: 0,
      hasUploadLength: 0,
      moreSelectBoxH: "0px",
      moreSelectIconDeg: "rotate(0deg)",
      searchIdlistDialog: false,
    };
  },
  mounted() {
    this.GetAllSiteDevice();
    let vm = this;
    request({
      url: "/FaultPhenomenon/GetAllFaultPhenomenon", //http://127.0.0.1:999/FaultHandling/GetAllFaultHandling
      method: "post",
      onError: function () {},
      vm,
    }).then((res) => {
      if (res.code == 200) {
        vm.phenomenonCodeList = res.data;
        //vm.allTaskType = vm.allTaskType.concat(res.data);
      }
    });
  },
  methods: {
    moreSelect() {
      if (this.moreSelectBoxH == "0px") {
        this.moreSelectBoxH = "38px";
        this.moreSelectIconDeg = "rotate(180deg)";
      } else {
        this.moreSelectBoxH = "0px";
        this.moreSelectIconDeg = "rotate(0deg)";
      }
    },
    handler({ BMap, map }) {},
    showSearchDialog() {
      this.searchIdlistDialog = true;
    },

    GetAllSiteDevice() {
      let vm = this;
      vm.lastOperate = "all";
      let formData = new FormData();
      formData.append("index", vm.pageSize);
      formData.append("page", vm.currentPage);
      request({
        url: "/SiteDeviceControllers/GetAllSiteDevice", //http://127.0.0.1:999/SiteDeviceControllers/GetAllSiteDevice
        param: formData,
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.tabledatas = vm.addIndex(res.data);
          vm.tableLen = res.recordsFiltered;
        }
      });
    },
    upData() {
      switch (this.lastOperate) {
        case "all":
          this.GetAllSiteDevice();
          break;
        case "isOnline": ////isOnline  byId  info
          this.GetSiteDeviceForIsOnline();
          break;
        default:
          ////isOnline  byId  info
          //   this.GetSiteDeviceForIsOnline(val);
          break;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (val > this.tableLen) {
        this.currentPage = 1;
      }
      this.upData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.upData();
    },
    addEquipmentfun() {
      this.addDialog = true;
    },
    handleClose() {
      this.addDialog = false;
      this.siteDetailDialog = false;
      this.siteDetailActiveName = "normal";
      this.createFailureSiteDialog = false;
      this.searchIdlistDialog = false;
    },
    newSite(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          vm.AddNewSiteDevice();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    AddNewSiteDevice() {
      let vm = this;
      request({
        url: "/SiteDeviceControllers/AddNewSiteDevice",
        method: "post",
        onError: function () {},
        param: JSON.stringify(vm.addForm),
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.$message({
            message: res.msg,
            type: "success",
            duration: 1000,
          });
          vm.addDialog = false;
        }
      });
    },
    UpdateALLSiteDeviceEmptyXY() {
      let vm = this;
      request({
        url: "/SiteDeviceControllers/UpdateALLSiteDeviceEmptyXY",
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.$message({
            message: res.msg,
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    UpdateAomaData(url) {
      let vm = this;
      request({
        url: url, //http://49.234.157.170:999/SiteDeviceControllers/UpdateAomaData
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.$message({
            message: res.msg,
            type: "success",
            duration: 1000,
          });
        }
      });
    },

    GetSiteDeviceForIsOnline() {
      let vm = this;
      vm.lastOperate = "isOnline";
      let data = new FormData();
      data.append("index", vm.pageSize);
      data.append("page", vm.currentPage);
      data.append("isOnline", vm.search.onoff);
      request({
        url: "/SiteDeviceControllers/GetSiteDeviceForIsOnline", //http://127.0.0.1:999/SiteDeviceControllers/GetSiteDeviceForIsOnline
        param: data,
        method: "post",
        onError: function (error) {
          console.log("error", error);
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.tabledatas = vm.addIndex(res.data);
          vm.tableLen = res.recordsFiltered;
        }
      });
    },
    addIndex(arr) {
      arr.map((Element, index) => {
        Element.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return Element;
      });
      return arr;
    },
    GetSiteDeviceByDeviceId() {
      //http://127.0.0.1:999/SiteDeviceControllers/GetSiteDeviceByDeviceId
      let vm = this;
      vm.lastOperate = "byId";
      let data = new FormData();
      data.append("PID", vm.search.num * 1);
      request({
        url: "/SiteDeviceControllers/GetSiteDeviceByDeviceId",
        param: data,
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.tabledatas = [];
          vm.tabledatas.push(res.data);
          vm.tableLen = 1;
        }
      });
    },
    getSiteDeviceForContains() {
      //http://127.0.0.1:999/SiteDeviceControllers/GetSiteDeviceForContains
      let vm = this;
      let data = new FormData();
      vm.lastOperate = "info";
      data.append("info", vm.search.getvalue);
      data.append("index", vm.pageSize);
      data.append("page", vm.currentPage);
      request({
        url: "/SiteDeviceControllers/GetSiteDeviceForContains",
        param: data,
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.tabledatas = vm.addIndex(res.data);
          vm.tableLen = res.recordsFiltered;
        }
      });
    },
    GetSiteDeviceForRemark() {
      let vm = this;
      let data = new formData();
      data.append("info", vm.search.num);
      data.append("page", 1);
      data.append("index", 10);
      request({
        url: "/SiteDeviceControllers/GetSiteDeviceForRemark",
      }).then((res) => {
        if (res.code == 200) {
        }
      });
    },
    handleClick(text, obj) {
      let vm = this;
      vm.center.lng = obj.BDX * 1 - 0.0125 || obj.X * 1 - 0.0125;
      vm.center.lat = obj.BDY * 1 + 0.005 || obj.Y * 1 + 0.005;
      vm.mark = {
        lng: obj.BDX * 1 || obj.X * 1,
        lat: obj.BDY * 1 || obj.Y * 1,
      };
      //   console.log("obj", vm.center);
      switch (text) {
        case "delete":
          this.$confirm("谨慎删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              vm.DeleteSiteDevice(obj);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });

          break;
        case "detail":
          vm.siteDetailObj = obj;
          vm.siteDetailDialog = true;
          break;
        case "createFailureSite":
          //   vm.createFailureSiteDialog = true;
          //   vm.createFailureSiteData.PID = obj.PID;
          //   taskOperate.getKey(vm, obj.PID, "pid");
          vm.ExistFailureSiteByPID(obj.PID);
          break;
      }
    },
    ExistFailureSiteByPID(PID) {
      let vm = this;
      //   let data = {
      //     PID: PID
      //   };
      let form = new FormData();
      form.append("PID", PID);

      request({
        url: "/FailureSite/ExistFailureSiteByPID",
        method: "post",
        param: form,
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          console.log("ExistFailureSiteByPID", res);
          if (!res.data) {
            vm.createFailureSiteDialog = true;
            vm.createFailureSiteData.PID = PID;
            taskOperate.getKey(vm, PID, "pid");
          } else {
            vm.$message({
              type: "error",
              message: "该站点上报故障点",
            });
          }
        }
      });
    },
    DeleteSiteDevice(obj) {
      let vm = this;
      let formData = new FormData();
      formData.append("PID", obj.PID * 1);
      request({
        url: "/SiteDeviceControllers/DeleteSiteDevice", //http://127.0.0.1:999/SiteDeviceControllers/DeleteSiteDevice
        param: formData,
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.$message({
            message: res.msg,
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    pictureChange(file, fileList) {
      this.changeFilesList("PhotosCosNameList", file);
    },
    VideoChange(file, fileList) {
      this.changeFilesList("VideosCosNameList", file);
    },
    changeFilesList(name, file) {
      this.createFailureSiteData[name].push(file.name);
      this.allFiles[name].push(file);
    },
    VideoRemove(file) {
      for (
        let i = 0;
        i < this.createFailureSiteData.VideosCosNameList.length;
        i++
      ) {
        if (this.createFailureSiteData.VideosCosNameList[i] == file.name) {
          this.createFailureSiteData.VideosCosNameList.splice(i, 1);
          this.allFiles.VideosCosNameList.splice(i, 1);
          break;
        }
      }
    },
    pictureRemove(file) {
      for (
        let i = 0;
        i < this.createFailureSiteData.PhotosCosNameList.length;
        i++
      ) {
        if (this.createFailureSiteData.PhotosCosNameList[i] == file.name) {
          this.createFailureSiteData.PhotosCosNameList.splice(i, 1);
          this.allFiles.PhotosCosNameList.splice(i, 1);
          break;
        }
      }
    },
    getSiteDeviceForPIDList() {
      let reg = /[\s\n]/;
      let PIDList = this.siteList.split(reg).filter((item) => item != "");
      let vm = this;
      vm.currentPage = 1;
      vm.pageSize = 1000;
      request({
        url: "/SiteDeviceControllers/GetSiteDeviceForPIDList",
        method: "post",
        param: JSON.stringify({ PIDList }),
        onError() {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.tabledatas = vm.addIndex(res.data);
          vm.tableLen = res.recordsFiltered;
        }
      });
    },
    CreateFailureSite() {
      var canUpload = true;
      let vm = this;
      vm.pageLoading = vm.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      vm.cosTotalLength =
        vm.allFiles.PhotosCosNameList.length +
        vm.allFiles.VideosCosNameList.length;
      vm.hasUploadLength = 0;
      for (let i = 0; i < vm.allFiles.PhotosCosNameList.length; i++) {
        if (canUpload) {
          taskOperate.uploadFiles(
            vm.allFiles.PhotosCosNameList[i],
            canUpload,
            vm,
            "PhotosCosNameList"
          );
        } else {
          break;
        }
      }
      for (let i = 0; i < vm.allFiles.VideosCosNameList.length; i++) {
        if (canUpload) {
          taskOperate.uploadFiles(
            vm.allFiles.VideosCosNameList[i],
            canUpload,
            vm,
            "VideosCosNameList"
          );
        } else {
          break;
        }
      }
    },
    startCreat() {
      let vm = this;
      let data = {
        PID: vm.createFailureSiteData.PID,
        remarks: vm.createFailureSiteData.remarks,
        faultPhenomenonCodeList: [],
        PhotosCosNameList: vm.cosUrlArray.PhotosCosNameList,
        VideosCosNameList: vm.cosUrlArray.VideosCosNameList,
      };
      for (let i = 0; i < vm.faultPhenomenonCodeList.length; i++) {
        for (let j = 0; j < vm.phenomenonCodeList.length; j++) {
          if (vm.faultPhenomenonCodeList[i] == vm.phenomenonCodeList[j].name) {
            data.faultPhenomenonCodeList.push(vm.phenomenonCodeList[j].code);
          }
        }
      }
      request({
        url: "/FailureSite/CreateFailureSite", //http://127.0.0.1:999/FailureSite/CreateFailureSite
        param: JSON.stringify(data),
        method: "post",
        onError: function () {},
        vm,
      }).then((res) => {
        vm.pageLoading.close();
        if (res.code == 200) {
          vm.createFailureSiteDialog = false;
          vm.faultPhenomenonCodeList = [];
          (vm.createFailureSiteData = {
            PID: "",
            remarks: "",
            faultPhenomenonCodeList: [],
            PhotosCosNameList: [],
            VideosCosNameList: [],
          }),
            vm.$message({
              message: "故障点创建成功",
              type: "success",
            });
        }
      });
    },
  },
};
</script>
<style lang="scss">
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
.timeSelectBox {
  overflow: hidden;
}
.timeSelectBox,
.moreSelectIcon {
  transition: all 0.5s;
}
.siteDetails {
  .el-dialog {
    min-height: 40vh;
  }
}
.siteMap {
  height: 300px;
  width: 100%;
  .bm-view {
    width: 100%;
    height: 100%;
    margin-top: 0px;
  }
}
.timeSelectBox .equipSearch {
  margin-right: 10px;
}
</style>