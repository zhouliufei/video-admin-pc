import request from '../utils/request';

export default {
    login:function(param) {
        return request.post('/login',param);
    }
}

