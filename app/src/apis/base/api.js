import httpclient from "@/apis/base/httpclient";

export default class BaseAPI {
  controllerName = "";

  getBaseURL() {
    return "https://localhost:44336/api" + "/" + this.controllerName;
  }

  async get(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
    };
    return httpclient.getAsync(request);
  }
  async push(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      Data:payload
    };
    return httpclient.pushAsync(request);
  }
  async post(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      Data:payload
    };
    return httpclient.postAsync(request);
  }
  
}
