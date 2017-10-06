import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : Http) {
    this.data.username = '';
    this.data.password = '';
    this.data.response = '';
    

    this.http = http;

  }


  login(){
    var apiURL = "http://localhost/reports/js/login.php";
    // var myData = JSON.stringify({username: this.data.username, password: this.data.password});

    var myData = JSON.stringify(this.data);
    
    this.http.post(apiURL, myData)
    .subscribe(data => {
    this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    // console.log(data["_body"]); 
    console.log(this.data.response) ;
    // console.log("Success");
    console.log(JSON.parse(this.data.response));
    var dataRes = JSON.parse(this.data.response);
    console.log(dataRes.status);
    console.log(dataRes.usertype);
    console.log(dataRes.currentWeekNumber);
    console.log(dataRes.fullname);
  }, error => {
    console.log("Oooops!");
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
