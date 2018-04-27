
import { Location, Report } from './../../utility/iWeather';
import { WeatherserviceProvider } from './../../providers/weatherservice/weatherservice';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {timer} from 'rxjs/observable/timer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  r: Report;
  loc=new Location();
  reportService:any;
  constructor(public navCtrl: NavController,
    private navparam: NavParams,
      private ws:WeatherserviceProvider,
      private storage:Storage,
      private platform: Platform, 
      private statusBar: StatusBar,
      private splashScreen: SplashScreen) {

    this.loc={
      city:"Lagos",
      country:"NG"
    }
    this.r=new Report();

   
  }
  showSplash = true; // <-- show animation

  ionViewWillEnter(){
    this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image
      if(this.navparam.get("notNew") == true ){
      timer(6000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
      }else{
        timer(3000).subscribe(() => this.showSplash = false)
      }
  }

  ionViewDidEnter(){

    this.storage.get('location')
        .then((loc)=>{
          if(!(loc.city==='undefined'||loc.city==''||loc.city==null||loc.city==undefined)){
            this.loc=(loc);
            this.getReport();
      
          }else{

            this.loc={
              city:"Lagos",
              country:"NG"
            }
            this.getReport();
          }
        })
 
  

  }

  getReport(){
    this.ws.getWeatherReport(this.loc)
    .subscribe(res=>{
      console.log(res)

    let x=res.data[0];
    // console.log(x);
    this.r.cloud=x.clouds;
    this.r.code=x.weather.code;
    this.r.date=x.datetime;
    this.r.description=x.weather.description;
    this.r.icon=x.weather.icon;
    this.r.temperature=x.temp;
    this.r.visibility=x.vis;
    this.r.wind_direction=x.wind_cdir;
    this.r.city=res.city_name;
    this.r.country=res.country_code;
   
    })
  }

}
