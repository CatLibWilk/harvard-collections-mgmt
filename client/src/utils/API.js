import axios from "axios";

export default {
    test: function(){
        console.log('test in api util hit');
        
        return axios.get('/api');
    }
}