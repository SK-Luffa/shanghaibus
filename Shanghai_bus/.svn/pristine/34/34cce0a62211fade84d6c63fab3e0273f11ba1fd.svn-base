import request from "../../assets/js/axios";
import COS from "cos-js-sdk-v5";
import md5 from "js-md5";
var operateFuns = {
  StartTask: function(taskId, handleIndex, vm) {
    let form = new FormData();
    console.log("start", taskId, handleIndex);
    form.append("taskId", taskId);
    request({
      url: "/Task/StartTask", //http://127.0.0.1:999/Task/StartTask
      method: "post",
      param: form,
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.tabledatas[handleIndex] = res.data;
        vm.dealData(vm.tabledatas);
        vm.$message({
          type: "success",
          message: "已开始该任务"
        });
      }
    });
  },
  CloseTask: function(taskId, handleIndex, vm) {
    let form = new FormData();
    form.append("taskId", taskId);
    request({
      url: "/Task/CloseTask", //http://127.0.0.1:999/Task/CloseTask
      method: "post",
      param: form,
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.tabledatas[handleIndex] = res.data;
        vm.dealData(vm.tabledatas);
        vm.$message({
          type: "success",
          message: "已关闭该任务"
        });
      }
    });
  },
  FinishTask1: function(obj, vm) {
    // console.log("function", obj, vm.taskDetailObj.siteDevice.PID);
    var _self = this;
    let data = {
      taskId: obj.taskId,
      appRemarks: obj.appRemarks,
      photosNumber: obj.cosImageNameList.length,
      videosNumber: obj.cosVideoNameList.length
    };
    request({
      url: "/Task/FinishTask1", //http://127.0.0.1:999/Task/FinishTask1
      param: JSON.stringify(data),
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.isOverText = "上传资料";
        _self.getKey(vm, vm.taskDetailObj.siteDevice.PID, "taskid");
        vm.$message({
          message: "信息已录入,再次点击上传资料",
          type: "success"
        });
      }
    });
  },
  FinishTask2: function(vm) {
    console.log("vm.finish1Data", vm.finish1Data);
    let data = {
      taskId: vm.finish1Data.taskId,
      cosImageNameList: vm.cosUrlArray.cosImageNameList,
      cosVideoNameList: vm.cosUrlArray.cosVideoNameList,
      faultHandlingCodeList: []
    };
    for (let i = 0; i < vm.faultHandlingCodeList.length; i++) {
      for (let j = 0; j < vm.handlingCodeList.length; j++) {
        if (vm.faultHandlingCodeList[i] == vm.handlingCodeList[j].name) {
          data.faultHandlingCodeList.push(vm.handlingCodeList[j].code);
        }
      }
    }
    console.log("FinishTask2", data);
    request({
      url: "/Task/FinishTask2", //http://127.0.0.1:999/Task/FinishTask2
      param: JSON.stringify(data),
      method: "post",
      onError: function() {},
      vm
    }).then(res => {
      vm.pageLoading.close();
      if (res.code == 200) {
        vm.finish1Dialog = false;
        vm.pageLoading.close();
        vm.isOverText = "录入信息";
        vm.faultHandlingCodeList = [];
        vm.finish1Data = {
          taskId: "",
          appRemarks: "",
          photosNumber: "",
          videosNumber: "",
          cosImageNameList: [],
          cosVideoNameList: []
        };
        vm.tabledatas[vm.handledIndex] = res.data;
        vm.dealData(vm.tabledatas);
        vm.$message({
          message: "资料已上传",
          type: "success"
        });
      }
    });
  },
  getKey: function(vm, PIDorTaskID, _text) {
    // let operation_this = this;
    let obj = {};
    let time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    month + 1 < 10 ? (month = "0" + (month + 1)) : month + 1;
    var date = time.getDate();
    date < 10 ? (date = "0" + date) : date;
    let hour = time.getHours();
    hour < 10 ? (hour = "0" + hour) : hour;
    //

    if (_text == "taskid") {
      vm.uploadUrl = `/operation/task/${PIDorTaskID}/${year}/${month}/${date}/`;
    } else {
      vm.uploadUrl = `/operation/faultSite/${PIDorTaskID}/${year}/${month}/${date}/`;
    }
    let allStr = "12345678910141123549895454";
    let numRadom = parseInt(Math.random() * 20);
    let radomStr = allStr.slice(numRadom, numRadom + 4);
    let str = `U2FsdGVkX1/+SkHe/LgKXTsiauqiUbPaqSeq8BTAgZZuSdWvOy4Gt8pYz2NN850H0iWMuLhr5uGVWCHU/lw2Ww==${year}-${month}-${date} ${hour}:00:00${radomStr}`;
    obj.key = md5(str);
    obj.seed = radomStr;
    request({
      url: "/COS/ObtainTemporaryKey", //  http://127.0.0.1:999/"/COS/ObtainTemporaryKey"
      param: JSON.stringify(obj),
      method: "post",
      onError: () => {},
      vm
    }).then(res => {
      if (res.code == 200) {
        vm.cosData = res.data;
        // let url = "";
        // if (name == "PhotosCosNameList" || "VideosCosNameList") {
        //   url = `/operation/faultSite/${PIDorTaskID}/${year}/${month}/${date}/`;
        // } else {
        //   url = `/operation/task/${PIDorTaskID}/${year}/${month}/${date}/`;
        // }
        // operation_this.uploadFiles(name, fileList, url, vm);
      }
    });
  },
  uploadFiles: function(file, _canUpload, vm, cosName, _text) {
    let self = operateFuns;
    if (!file) return false;
    const data = vm.cosData;
    const cos = new COS({
      getAuthorization: (options, callback) => {
        const obj = {
          TmpSecretId: data.credentials.TmpSecretId,
          TmpSecretKey: data.credentials.TmpSecretKey,
          XCosSecurityToken: data.credentials.Token,
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
        };
        callback(obj);
      }
    });
    cos.putObject(
      {
        Bucket: "operation-1251394138",
        Region: "ap-shanghai",
        Key: vm.uploadUrl + file.name,
        Body: file.raw,
        onHashProgress: function(progressData) {
          console.log("校验中", JSON.stringify(progressData));
        },
        onProgress: function(progressData) {
          console.log("上传中", JSON.stringify(progressData));
        }
      },
      function(err, data) {
        if (err) {
          //   console.log(err);
          _canUpload = false;
          vm.$message({
            type: "error",
            message: "图片上传失败！"
          });
          return;
        }
        // console.log("putObject", data.Location);
        vm.cosUrlArray[cosName].push(vm.uploadUrl + file.name);
        vm.hasUploadLength++;
        if (vm.hasUploadLength == vm.cosTotalLength) {
          console.log("传完了 ，可以上传文件了", vm.cosTotalLength);
          if (_text == "taskid") {
            self.FinishTask2(vm);
          } else {
            vm.startCreat();
          }
        }
      }
    );
  }
};
export default operateFuns;
