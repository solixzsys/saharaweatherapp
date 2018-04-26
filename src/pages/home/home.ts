
import { Location, Report } from './../../utility/iWeather';
import { WeatherserviceProvider } from './../../providers/weatherservice/weatherservice';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  r: Report;
  loc=new Location();
  reportService:any;
  constructor(public navCtrl: NavController,private ws:WeatherserviceProvider,private storage:Storage) {

    this.loc={
      city:"Lagos",
      country:"NG"
    }
    this.r=new Report();

   
  }

  ionViewDidEnter(){

    this.storage.get('location')
        .then((loc)=>{
          if(!(loc==='undefined'||loc==''||loc==null||loc==undefined)){
            this.loc=(loc);
            this.getReport();
      
          }
        })
 
  

  }

  getReport(){
    this.ws.getWeatherReport(this.loc)
    .subscribe(res=>{
      console.log(res)

    let x=res.data[0];
    console.log(x);
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
