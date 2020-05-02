import request from '../utils/request';

export default {
    queryBgmList:function(param) {
        return request.get('/bgm/queryBgmList',param);
    },
    updateBgmStatus:function (param) {
        return request.post('/bgm/updateBgmStatus',param);
    },
    deleteBgm:function (param) {
        return request.post('/bgm/deleteBgm',param);
    },
    uploadFile:function (param) {
        return request.fileUpload('/bgm/addBgm',param)
    }

}

