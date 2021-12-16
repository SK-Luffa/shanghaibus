
import request from "./axios"
const uploadjs = {
    uploadimg: (url, params, _this) => {  
        let formData = new FormData();
        formData.append("imageNumber", params.imageNumber);
        formData.append("file", params.file);  
        //console.log("formData", formData.get('file')) 
        request({
            url: url,
            param: formData,
            method: "post",
            onError: () => {
                console.log("false");
            },
            _this,
        }).then((res) => {
            if (res.code == 200) {
                //return(res);
                _this.$message({
                    showClose: true,
                    message: 'success',
                    type: 'success'
                });
            }
        });
    },
    uploadtext: () => {

    }
}
export default uploadjs
