/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/**
        |--------------------------------------------------
        | 封装的异步请求函数
        |--------------------------------------------------
        */
import axios from "axios";
import { Message } from "element-ui";
import config from "./config";

// Message.config({
//   duration: 1500,
//   // maxCount: 1,
// });
// 实例对象
const message = {
  error: function(txt) {
    Message.error({
      message: txt,
      duration: 1000
    });
  }
};
const AJAX_TIMEOUT = "ECONNABORTED";
// console.log(window.root_config)
let ROOT_URL = "";
if (process.env.NODE_ENV === "development") {
  ROOT_URL = config.development;
} else {
  ROOT_URL = config.product;
}
const newRequest = (url, params, method, onError, vm) =>
  new Promise((resolve, reject) => {
    let postData = {};
    // console.log(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));
    let turl = ROOT_URL + url;
    let requestheaders = {};
    switch (url) {
      case "/User/UserLogin":
      case "/User/SendVerifyCode":
        requestheaders = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        break;
      case "/SiteDeviceControllers/GetAllSiteDevice":
      case "/User/GetUserInfo":
      case "/User/GetAllUser":
      case "/User/GetUserByUserId":
      case "/User/DeleteUser":
      case "/UserModule/GetAllPermissionGroup":
      case "/PermissionGroup/GetAllPermissionGroup":
      case "/SiteDeviceControllers/UpdateALLSiteDeviceEmptyXY":
      case "/SiteDeviceControllers/UpdateAomaData":
      case "/SiteDeviceControllers/GetSiteDeviceForIsOnline":
      case "/SiteDeviceControllers/GetSiteDeviceByDeviceId":
      case "/SiteDeviceControllers/GetSiteDeviceForContains":
      case "/SiteDeviceControllers/GetSiteDeviceForRemark":
      case "/SiteDeviceControllers/DeleteSiteDevice":
      case "/UserModule/GetAllUserModule":
      case "/PermissionGroup/ClearUserModuleToPermissionGroup":
      case "/SiteCoordinates/GetAllCoordinates":
      case "/FaultPhenomenon/GetAllFaultPhenomenon":
      case "/FaultPhenomenon/DelFaultPhenomenonByCode":
      case "/FaultPhenomenon/GetFaultPhenomenonByCode":
      case "/FaultHandling/GetAllFaultHandling":
      case "/FaultHandling/GetFaultHandlingByCode":
      case "/FaultHandling/DelFaultHandlingByCode":
      case "/OrderChecklist/GetAllOrderChecklist":
      case "/OrderChecklist/GetOrderChecklistByCode":
      case "/OrderChecklist/DelOrderChecklistByCode":
      case "/TaskType/GetTaskTypeByCode":
      case "/TaskType/GetAllTaskType":
      case "/TaskType/DelTaskTypeByCode":
      case "/TaskStatus/GetAllTaskStatus":
      case "/TaskStatus/GetTaskStatusByCode":
      case "/TaskStatus/DelTaskStatusByCode":
      case "/FailureSite/GetFailureSitesByClosed":
      case "/FailureSite/CloseFailureSites":
      case "/FailureSite/GetReportFailureSitesForId":
      case "/FailureSite/DeleteFailureSitesForId":
      case "/Task/StartTask":
      case "/Task/CloseTask":
      case "/SiteDeviceControllers/GetSiteDeviceForMbV":
      case "/SiteDeviceControllers/GetSiteDeviceForAbV":
      case "/SiteDeviceControllers/GetSiteDeviceForDumpE":
      case "/SiteDeviceControllers/GetSiteDeviceForSunPadV":
      case "/SiteDeviceControllers/GetSiteDeviceForCDdl":
      case "/ExcelExportInfo/GetExcelPortInfoByCreateCode":
      case "/ExcelExportInfo/GetAllExcelPortInfo":
      case "/FailureSite/ExistFailureSiteByPID":
        requestheaders = {
          "Content-type": "application/x-www-form-urlencoded",
          userId: user ? user.userId : "",
          userToken: user ? user.userToken : ""
        };
        break;
      case "/User/AddUser":
      case "/User/UpdateUser":
      case "/UserModule/AddUserModule":
      case "/UserModule/UpdateUserModule":
      case "/PermissionGroup/AddPermissionGroup":
      case "/User/BindUserToPermissionGroup":
      case "/User/RemoveUserPermissionGroup":
      case "/SiteDeviceControllers/AddNewSiteDevice":
      case "/PermissionGroup/BindUserModuleToPermissionGroup":
      case "/PermissionGroup/RemoveUserModuleToPermissionGroup":
      case "/SiteCoordinates/ReportSiteCoordinate":
      case "/SiteCoordinates/AuditCoordinates":
      case "/FaultPhenomenon/AddFaultPhenomenon":
      case "/FaultHandling/AddFaultHandling":
      case "/OrderChecklist/AddOrderChecklist":
      case "/TaskType/AddTaskType":
      case "/TaskStatus/AddTaskStatus":
      case "/Task/GetTaskForSiteDevicePID":
      case "/Task/UpdateTaskStatus":
      case "/Task/UpdateTaskType":
      case "/ExcelExportInfo/AddExcelExportInfo":
      case "/Task/FinishTask1":
      case "/COS/ObtainTemporaryKey":
      case "/Task/CreateTaskByFaultSite":
      case "/ExcelExportInfo/ExportOperationMaintenanceData":
        requestheaders = {
          "Content-type": "application/json;charset=utf-8",
          userId: user ? user.userId : "",
          userToken: user ? user.userToken : ""
        };
        break;
      default:
        requestheaders = {
          "Content-type": "application/json;charset=utf-8",
          userId: user ? user.userId : "",
          userToken: user ? user.userToken : ""
        };
    }
    postData = {
      url: turl,
      method,
      timeout: 60000,
      withCredentials: false,
      headers: requestheaders,
      ...params
    };
    axios(postData)
      .then(({ data }) => {
        const { code, msg } = data;
        if (code != 200) {
          if (url == "/User/UserLogin" && code == -1100) {
            // message.success("验证码已发送您的邮箱，请查收！");
            vm.getVerifyCode();
          } else if (code == -1) {
            message.error("request error");
          } else if (code == 240 || code == 241 || code == 124) {
            message.error("response error");
          } else {
            if (msg.indexOf("token") > -1) {
              vm.$router.push("/");
            }
            vm.$message(msg);
          }
        }
        resolve(data);
      })
      .catch(error => {
        onError && onError(error);
        // if (error.code === AJAX_TIMEOUT) {
        //   message.error(vm.$t('message.MESSAGE.code.timeOut'));
        // } else {
        //   message.error(vm.$t('message.MESSAGE.code.error'));
        //   throw error;
        // }
      });
  });
const request = ({ url = "", param = {}, method = "get", onError, vm }) => {
  const Method = method.toLowerCase();
  if (Method === "post") {
    // console.log("post", param);
    return newRequest(url, { data: param }, "post", onError, vm);
  }
  if (Method === "put") {
    return newRequest(url, { data: param }, "put", onError, vm);
  }
  if (Method === "delete") {
    return newRequest(url, { params: param }, "delete", onError, vm);
  }
  return newRequest(url, { params: param }, "get", onError, vm); // 默认 Get 请求
};

request.get = (url, param, onError, vm) =>
  request({ method: "get", url, param, onError, vm });
request.post = (url, param, onError, vm) =>
  request({ method: "post", url, param, onError, vm });
request.put = (url, param, onError, vm) =>
  request({ method: "put", url, param, onError, vm });
request.delete = (url, param, onError, vm) =>
  request({ method: "delete", url, param, onError, vm });

export default request;
