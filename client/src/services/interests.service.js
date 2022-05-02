import axios from 'axios'
const API_URL = require('./api');

class InterestService {

    async getAllAvailableInterest() {
        let res = await axios.get(API_URL + "/interests", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let data = res.data.interests;
        return data
    }

    getAvailableInterests = async(array) => {
        let alist = await this.getAllAvailableInterest();
        var list = alist.filter(function(e) {
            return !(array.includes(e));
        });
        return list;
    }
}

export default new InterestService();