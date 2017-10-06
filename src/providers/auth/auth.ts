import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiURL = "http://localhost/reports/js/login.php";
@Injectable()
export class AuthProvider {

  
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials){

    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiURL, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });


  }

}
