import 'whatwg-fetch';

const API_ROOT = 'https://jkhz-test.alijian.net/index.php?r=';

const fetchDao = {
	doGet: function(url, params){
		return this.request("GET", url, params);
	},

	doPost: function(url, params){
		return this.request("POST", url, params);
	},

	doPut: function(url, params){
		return this.request("PUT", url, params);
	},

	doDelete: function(url, params){
		return this.request("DELETE", url, params);
	},

	doUploadFile: function(url, params){
		return this.request("POST", url, params, true);
	},

	paramsParse: function(params) {
		let arr = [];

		Object.keys(params).forEach((key) => {
			arr.push(key + '=' + params[key]);
		});

		return '&' + arr.join('&');
	},

	request: function(method, u, params, file){
		const self = this;
		let url = API_ROOT + u;
		let config = {
			method: method,
			headers: {},
			credentials: "same-origin"
		};

		if((method !== "POST" && method !== "PUT") && typeof params !== "undefined"){
			url += self.paramsParse(params);
		}

		// only post method to add body config
		if((method === "POST" || method === "PUT") && typeof params !== "undefined"){
			let payload = [];
			Object.keys(params).forEach(key => payload.push(key + "=" + params[key]));
			config.body = payload.join("&");

			if(file){
				let formData = new FormData();
				formData.append("file", params.file);
				config.body = formData;
			}else {
				// change the Content-Type for mime
				config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
			}
		}

		return new Promise(function (resolve, reject) {
			fetch(url, config)
			.then(self.checkStatus)
			.then(self.parseJSON)
			.then(function(data) {
				if(data && data.code !== 200) {
					reject(error);
				}else {
					resolve(data);
				}
			}).catch(function(error){
				reject(error);
			});
		});
	},

	checkStatus: function(response){
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	},

	parseJSON: function(response){
		return response.json();
	}
};

export default fetchDao;
