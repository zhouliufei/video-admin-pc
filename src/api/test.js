import request from '../utils/request';

export default {
    test:function() {
        return request.get('/test');
    }
}

