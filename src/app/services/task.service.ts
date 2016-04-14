import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  // private _taskUrl = 'AdpSettings.xml';
  private _taskUrl = '/TMT5New/WebResources/ava_/config/AdpSettings.xml';
  constructor(private _http: Http) {

  }

  getGetGuidanceHelpText(){
    var parser = new DOMParser();

    return this._http.get(this._taskUrl)
      .map((response: Response) => {
        var doc = parser.parseFromString(response.text(), "application/xml");
        let path = doc.evaluate('//Element[@Name="UserGuidanceHelpText"]//Element[@Name="1"]//ElementValue[@Name="DefaultText"]', doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        return path.singleNodeValue.attributes.getNamedItem('Value').value;
      });
      // .do(data => {console.log(data);})
      // .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
