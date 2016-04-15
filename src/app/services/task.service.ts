import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TaskService {
  // private _taskUrl = 'AdpSettings.xml';
  private _taskUrl = '/TMT5New/WebResources/ava_/config/AdpSettings.xml';
  constructor(private _http:Http) {

  }

  getGetGuidanceHelpText() {
    // return this._http.get(this._taskUrl)
    //   .toPromise()
    //   .then(this.extractData)
    //   .catch(this.handleError);
    return this._http.get(this._taskUrl)
      .map(this.extractData);
    // .catch(this.handleError);
    // .do(data => {console.log(data);})

  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let parser = new DOMParser();
    let text = res.text();
    let doc = parser.parseFromString(text, "application/xml");
    if (document.evaluate) {
      let path = doc.evaluate('//Element[@Name="UserGuidanceHelpText"]//Element[@Name="1"]//ElementValue[@Name="DefaultText"]', doc, null, 8, null);
      return path.singleNodeValue.attributes.getNamedItem('Value').value;

    } else {
      var obj = new ActiveXObject('Microsoft.XMLDOM');
      obj.async = false;
      obj.loadXML(text);
      return obj.selectSingleNode(".//Element[@Name='UserGuidanceHelpText']")
        .selectSingleNode("Elements").selectSingleNode(".//Element[@Name='1']")
        .selectSingleNode("ElementValues").selectSingleNode(".//ElementValue[@Name='DefaultText']")
        .getAttribute("Value");
    }
  }

  // private handleError(error:any) {
  //   // In a real world app, we might send the error to remote logging infrastructure
  //   let errMsg = error.message || 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Promise.reject(errMsg);
  // }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  // private handleError(error:Response) {
  //   console.log(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }

}
