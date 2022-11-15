import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class AssetApi extends BaseAPI {
  controllerName = Version.Version.Major;

  async delete(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + '/' + payload,
    };
    return httpclient.deleteAsync(request);
  }
  async put(action,recordId, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + '/' + recordId,
      data: payload,
    };
    return httpclient.pushAsync(request);
  }

  async filters(action,keyword,departmentId,categoryId,limit,page) {
    let request = {
      url: this.getBaseURL() 
      + "/" + action 
      + "?limit="+limit 
      + "&page="+page 
      + "&departmentId=" +departmentId 
      +"&categoryId="+categoryId
      + "&keyword="+keyword,
    };
    return httpclient.getAsync(request);
  }
}

export default new AssetApi();
