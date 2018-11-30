import axios from "axios";

export default {
    harvest: function(query){
        console.log('api util hit');
        
        return axios.post('/api/', query);
    }
}