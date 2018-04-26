import { Location, Report } from './../../utility/iWeather';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WeatherserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherserviceProvider {
  //http://api.weatherbit.io/v2.0/forecast/3hourly?city=Lagos&country=NG&Key=c8aac84e371e4641be3a2ecd0432360f

  weatherReport:any;
  apiKey: string='c8aac84e371e4641be3a2ecd0432360f';
  baseurl: string='http://api.weatherbit.io/v2.0/forecast/3hourly?';

  constructor(public http: HttpClient) {
    console.log('Hello WeatherserviceProvider Provider');

  }

  getWeatherReport(loc?:Location){
      let url=this.baseurl+'city='+loc.city+'&country='+loc.country+'&Key='+this.apiKey;
      
       
      return this.http.get(url);
        
      
    

  }

}
