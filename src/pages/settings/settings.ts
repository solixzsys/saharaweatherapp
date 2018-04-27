import { HomePage } from './../home/home';
import { Location } from './../../utility/iWeather';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherserviceProvider } from './../../providers/weatherservice/weatherservice';
import 'rxjs/operator/do'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  location: Location={
    city:'',
    country:''
  }
  country;
  city;
  countries: any;
  cities:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private ws:WeatherserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');

    this.ws.getCountries()
        
        .subscribe(c=>{
          
          this.countries=c;
        //  console.log(this.countries)

        })

    this.ws.getCities()
   
        .subscribe(x => this.cities=x)
        
        


  }

  

  SubmitForm(){
    this.location.city=this.city;
    this.location.country=this.country;

    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'+this.location.city);
    this.storage.set('location',this.location);
    this.storage.set('i','xxxx');
    this.navCtrl.push(HomePage,{'notNew':true})
  }

}
