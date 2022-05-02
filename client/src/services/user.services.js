const { default: axios } = require('axios')
const API_URL = require('./api')

class UserService {

    getUser(id) {
        return axios.get(API_URL + "/user?userId=" + id);
    }

    updateInterest(id, interest) {
        return axios.patch(API_URL + "/user?userId=" + id, {
            "userId": id,
            "updateKey": "interest",
            "updateValue": interest,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }
}

export default new UserService()