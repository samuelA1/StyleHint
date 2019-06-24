import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
user: any = {
  country: ''
}; // user object to be sent to the database
error: any = {};
loading: boolean = false; //loader on the page after the user clicks the create account button

  constructor(private navCtrl: NavController,
     private authService: AuthService,
     private alertCtrl: AlertController) { }

  //performs registration
  async register() {
    this.loading = true;
    setTimeout(async () => {
      this.validation(this.user)
      if (Object.keys(this.error).length == 0) {
        this.loading = false;
        try {
          const registrationInfo = await this.authService.signup(this.user);
          if (registrationInfo['success']) {
            this.navCtrl.navigateRoot('/customize', {animationDirection: 'forward'})
          } else {
            this.presentAlert(registrationInfo['message']);
          }
        } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to create an account. Please try signing up again')
        }
      } else {
        this.loading = false;
      }
    }, 1000);
  }

//Validate user inputs
  validation(user: any) {
    if (user['username'].length >= 3) {
    } else {
      this.error.username = 'Sorry, your username must be at least 3 characters.';
    }
    
    if (user['country']) {
    } else {
      this.error.country = 'Please select a country.';
    }

    if (user['password'].length >= 8) {
    } else {
      this.error.password = 'Sorry, your password must be at least 8 characters';
    }

    if (user['password'] === user['cfmPassword']) {
    } else {
      this.error.cfmPassword = 'Sorry, your passwords do not match. Please make sure your password are exactly the same.'
    }

    if (user['email'].includes('@')) {
    } else {
      this.error.email = 'Please enter a valid email.';
    }
   
    
    return false;
  }

  //alert ctrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Signup Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //remove validation errors
  removeErrors() {
    this.error = {};
  }

  ngOnInit() {
  }
  
  // list of countries used in html
  countries = [ {
    name: "United States",}, {
    name: "Israel",}, {
    name: "Afghanistan",}, {
    name: "Albania",}, {
    name: "Algeria",}, {
    name: "AmericanSamoa",}, {
    name: "Andorra",}, {
    name: "Angola",}, {
    name: "Anguilla",}, {
    name: "Antigua and Barbuda",}, {
    name: "Argentina",}, {
    name: "Armenia",}, {
    name: "Aruba",}, {
    name: "Australia",}, {
    name: "Austria",}, {
    name: "Azerbaijan",}, {
    name: "Bahamas",}, {
    name: "Bahrain",}, {
    name: "Bangladesh",}, {
    name: "Barbados",}, {
    name: "Belarus",}, {
    name: "Belgium",}, {
    name: "Belize",}, {
    name: "Benin",}, {
    name: "Bermuda",}, {
    name: "Bhutan",}, {
    name: "Bosnia and Herzegovina",}, {
    name: "Botswana",}, {
    name: "Brazil",}, {
    name: "British Indian Ocean Territory",}, {
    name: "Bulgaria",}, {
    name: "Burkina Faso",}, {
    name: "Burundi",}, {
    name: "Cambodia",}, {
    name: "Cameroon",}, {
    name: "Canada",}, {
    name: "Cape Verde",}, {
    name: "Cayman Islands",}, {
    name: "Central African Republic",}, {
    name: "Chad",}, {
    name: "Chile",}, {
    name: "China",}, {
    name: "Christmas Island",}, {
    name: "Colombia",}, {
    name: "Comoros",}, {
    name: "Congo",}, {
    name: "Cook Islands",}, {
    name: "Costa Rica",}, {
    name: "Croatia",}, {
    name: "Cuba",}, {
    name: "Cyprus",}, {
    name: "Czech Republic",}, {
    name: "Denmark",}, {
    name: "Djibouti",}, {
    name: "Dominica",}, {
    name: "Dominican Republic",}, {
    name: "Ecuador",}, {
    name: "Egypt",}, {
    name: "El Salvador",}, {
    name: "Equatorial Guinea",}, {
    name: "Eritrea",}, {
    name: "Estonia",}, {
    name: "Ethiopia",}, {
    name: "Faroe Islands",}, {
    name: "Fiji",}, {
    name: "Finland",}, {
    name: "France",}, {
    name: "French Guiana",}, {
    name: "French Polynesia",}, {
    name: "Gabon",}, {
    name: "Gambia",}, {
    name: "Georgia",}, {
    name: "Germany",}, {
    name: "Ghana",}, {
    name: "Gibraltar",}, {
    name: "Greece",}, {
    name: "Greenland",}, {
    name: "Grenada",}, {
    name: "Guadeloupe",}, {
    name: "Guam",}, {
    name: "Guatemala",}, {
    name: "Guinea",}, {
    name: "Guinea-Bissau",}, {
    name: "Guyana",}, {
    name: "Haiti",}, {
    name: "Honduras",}, {
    name: "Hungary",}, {
    name: "Iceland",}, {
    name: "India",}, {
    name: "Indonesia",}, {
    name: "Iraq",}, {
    name: "Ireland",}, {
    name: "Israel",}, {
    name: "Italy",}, {
    name: "Jamaica",}, {
    name: "Japan",}, {
    name: "Jordan",}, {
    name: "Kazakhstan",}, {
    name: "Kenya",}, {
    name: "Kiribati",}, {
    name: "Kuwait",}, {
    name: "Kyrgyzstan",}, {
    name: "Latvia",}, {
    name: "Lebanon",}, {
    name: "Lesotho",}, {
    name: "Liberia",}, {
    name: "Liechtenstein",}, {
    name: "Lithuania",}, {
    name: "Luxembourg",}, {
    name: "Madagascar",}, {
    name: "Malawi",}, {
    name: "Malaysia",}, {
    name: "Maldives",}, {
    name: "Mali",}, {
    name: "Malta",}, {
    name: "Marshall Islands",}, {
    name: "Martinique",}, {
    name: "Mauritania",}, {
    name: "Mauritius",}, {
    name: "Mayotte",}, {
    name: "Mexico",}, {
    name: "Monaco",}, {
    name: "Mongolia",}, {
    name: "Montenegro",}, {
    name: "Montserrat",}, {
    name: "Morocco",}, {
    name: "Myanmar",}, {
    name: "Namibia",}, {
    name: "Nauru",}, {
    name: "Nepal",}, {
    name: "Netherlands",}, {
    name: "Netherlands Antilles",}, {
    name: "New Caledonia",}, {
    name: "New Zealand",}, {
    name: "Nicaragua",}, {
    name: "Niger",}, {
    name: "Nigeria",}, {
    name: "Niue",}, {
    name: "Norfolk Island",}, {
    name: "Northern Mariana Islands",}, {
    name: "Norway",}, {
    name: "Oman",}, {
    name: "Pakistan",}, {
    name: "Palau",}, {
    name: "Panama",}, {
    name: "Papua New Guinea",}, {
    name: "Paraguay",}, {
    name: "Peru",}, {
    name: "Philippines",}, {
    name: "Poland",}, {
    name: "Portugal",}, {
    name: "Puerto Rico",}, {
    name: "Qatar",}, {
    name: "Romania",}, {
    name: "Rwanda",}, {
    name: "Samoa",}, {
    name: "San Marino",}, {
    name: "Saudi Arabia",}, {
    name: "Senegal",}, {
    name: "Serbia",}, {
    name: "Seychelles",}, {
    name: "Sierra Leone",}, {
    name: "Singapore",}, {
    name: "Slovakia",}, {
    name: "Slovenia",}, {
    name: "Solomon Islands",}, {
    name: "South Africa",}, {
    name: "South Georgia and the South Sandwich Islands",}, {
    name: "Spain",}, {
    name: "Sri Lanka",}, {
    name: "Sudan",}, {
    name: "Suriname",}, {
    name: "Swaziland",}, {
    name: "Sweden",}, {
    name: "Switzerland",}, {
    name: "Tajikistan",}, {
    name: "Thailand",}, {
    name: "Togo",}, {
    name: "Tokelau",}, {
    name: "Tonga",}, {
    name: "Trinidad and Tobago",}, {
    name: "Tunisia",}, {
    name: "Turkey",}, {
    name: "Turkmenistan",}, {
    name: "Turks and Caicos Islands",}, {
    name: "Tuvalu",}, {
    name: "Uganda",}, {
    name: "Ukraine",}, {
    name: "United Arab Emirates",}, {
    name: "United Kingdom",}, {
    name: "Uruguay",}, {
    name: "Uzbekistan",}, {
    name: "Vanuatu",}, {
    name: "Wallis and Futuna",}, {
    name: "Yemen",}, {
    name: "Zambia",}, {
    name: "Zimbabwe",}, {
    name: "land Islands",}, {
    name: "Antarctica",}, {
    name: "Bolivia, Plurinational State of",}, {
    name: "Brunei Darussalam",}, {
    name: "Cocos (Keeling) Islands",}, {
    name: "Congo, The Democratic Republic of the",}, {
    name: "Cote d'Ivoire",}, {
    name: "Falkland Islands (Malvinas)",}, {
    name: "Guernsey",}, {
    name: "Holy See (Vatican City State)",}, {
    name: "Hong Kong",}, {
    name: "Iran, Islamic Republic of",}, {
    name: "Isle of Man",}, {
    name: "Jersey",}, {
    name: "Korea, Democratic People's Republic of",}, {
    name: "Korea, Republic of",}, {
    name: "Lao People's Democratic Republic",}, {
    name: "Libyan Arab Jamahiriya",}, {
    name: "Macao",}, {
    name: "Macedonia, The Former Yugoslav Republic of",}, {
    name: "Micronesia, Federated States of",}, {
    name: "Moldova, Republic of",}, {
    name: "Mozambique",}, {
    name: "Palestinian Territory, Occupied",}, {
    name: "Pitcairn",}, {
    name: "Réunion",}, {
    name: "Russia",}, {
    name: "Saint Barthélemy",}, {
    name: "Saint Helena, Ascension and Tristan Da Cunha",}, {
    name: "Saint Kitts and Nevis",}, {
    name: "Saint Lucia",}, {
    name: "Saint Martin",}, {
    name: "Saint Pierre and Miquelon",}, {
    name: "Saint Vincent and the Grenadines",}, {
    name: "Sao Tome and Principe",}, {
    name: "Somalia",}, {
    name: "Svalbard and Jan Mayen",}, {
    name: "Syrian Arab Republic",}, {
    name: "Taiwan, Province of China",}, {
    name: "Tanzania, United Republic of",}, {
    name: "Timor-Leste",}, {
    name: "Venezuela, Bolivarian Republic of",}, {
    name: "Viet Nam",}, {
    name: "Virgin Islands, British",}, {
    name: "Virgin Islands, U.S.",}]

}
