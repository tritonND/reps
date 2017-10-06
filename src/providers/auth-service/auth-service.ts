import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User{
  user : string;
  password : string;

  constructor(user : string, password : string){
     this.user = user;
     this.password = password;
  }
}


@Injectable()
export class AuthServiceProvider {

  currentUser : User;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }


  public login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } 
    else {   
     console.log("Data Entered");
     this.http.post('http://localhost/reports/js/login.php', {headers: headers})
     .map(res => res.json())
     .subscribe(data => {
       console.log(data);
     }, (err) => { console.log("error");}
    );
  }
}


// this.http.get('http://localhost/reports/php/login.php')
// .map(res => res.json())
// .subscribe(data => {
//  console.log("Success");
// }

  public loginOld(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
