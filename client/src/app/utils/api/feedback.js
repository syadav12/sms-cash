import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress= 'http://localhost:3000';

const utils = {
	getFeedback: (data) => {
		let url = serverAddress + '/api/feedback/getFeedback'
		let token = Auth.getToken();
		let authString = 'bearer ' + token
		let config = {
    		headers: {
        		'Authorization': authString
   	 		}
		}
		return axios.post(url, data, config);
	}
}

export default utils;