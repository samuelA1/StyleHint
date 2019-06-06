import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './add-hint.page.html',
  styleUrls: ['./add-hint.page.scss'],
})
export class AddHintPage implements OnInit {
hint: any = {
  occasion: '',
  season: '',
  weather: '',
  size: '',
  country: ''
};
base64Image: string;
//seasons array
seasons: any[] = [
  {name: 'winter', icon: 'snow', isChosen: false},
  {name: 'spring', icon: 'rose', isChosen: false},
  {name: 'summer', icon: 'flower', isChosen: false},
  {name: 'fall', icon: 'partly-sunny', isChosen: false},
]

// weather array
weathers: any[] =[
  {name: 'clear', icon: 'sunny', isChosen: false},
  {name: 'rain', icon: 'rainy', isChosen: false},
  {name: 'clouds', icon: 'cloud', isChosen: false},
  {name: 'haze', icon: 'nuclear', isChosen: false},
  {name: 'mist', icon: 'list', isChosen: false},
]

//occasion/event array
occasions: any[] = [
  {name: 'school', icon: 'school', isChosen: false},
  {name: 'sport', icon: 'american-football', isChosen: false},
  {name: 'birthday party', icon: 'color-wand', isChosen: false},
  {name: 'halloween', icon: 'outlet', isChosen: false},
  {name: 'christmas', icon: 'gift', isChosen: false},
  {name: 'National day', extension: 'independence', icon: 'flag', isChosen: false},
  {name: 'date night', icon: 'contacts', isChosen: false},
  {name: 'job interview', icon: 'person-add', isChosen: false},
  {name: 'church', icon: 'home', isChosen: false},
]

//list of sizes
sizes: any = [
  { name: 'Petite'},
  { name: 'Plus size' },
  { name: 'Tall' },
];
  constructor(private camera: Camera,
    private alertCtrl: AlertController) { }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }
  addHint() {
    console.log(this.hint);
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }

  // list of countries used in html
  countries = [ {
    name: "United States",
    code: "US"
}, {
    name: "Israel",
    code: "IL"
}, {
    name: "Afghanistan",
    code: "AF"
}, {
    name: "Albania",
    code: "AL"
}, {
    name: "Algeria",
    code: "DZ"
}, {
    name: "AmericanSamoa",
    code: "AS"
}, {
    name: "Andorra",
    code: "AD"
}, {
    name: "Angola",
    code: "AO"
}, {
    name: "Anguilla",
    code: "AI"
}, {
    name: "Antigua and Barbuda",
    code: "AG"
}, {
    name: "Argentina",
    code: "AR"
}, {
    name: "Armenia",
    code: "AM"
}, {
    name: "Aruba",
    code: "AW"
}, {
    name: "Australia",
    code: "AU"
}, {
    name: "Austria",
    code: "AT"
}, {
    name: "Azerbaijan",
    code: "AZ"
}, {
    name: "Bahamas",
    code: "BS"
}, {
    name: "Bahrain",
    code: "BH"
}, {
    name: "Bangladesh",
    code: "BD"
}, {
    name: "Barbados",
    code: "BB"
}, {
    name: "Belarus",
    code: "BY"
}, {
    name: "Belgium",
    code: "BE"
}, {
    name: "Belize",
    code: "BZ"
}, {
    name: "Benin",
    code: "BJ"
}, {
    name: "Bermuda",
    code: "BM"
}, {
    name: "Bhutan",
    code: "BT"
}, {
    name: "Bosnia and Herzegovina",
    code: "BA"
}, {
    name: "Botswana",
    code: "BW"
}, {
    name: "Brazil",
    code: "BR"
}, {
    name: "British Indian Ocean Territory",
    code: "IO"
}, {
    name: "Bulgaria",
    code: "BG"
}, {
    name: "Burkina Faso",
    code: "BF"
}, {
    name: "Burundi",
    code: "BI"
}, {
    name: "Cambodia",
    code: "KH"
}, {
    name: "Cameroon",
    code: "CM"
}, {
    name: "Canada",
    code: "CA"
}, {
    name: "Cape Verde",
    code: "CV"
}, {
    name: "Cayman Islands",
    code: "KY"
}, {
    name: "Central African Republic",
    code: "CF"
}, {
    name: "Chad",
    code: "TD"
}, {
    name: "Chile",
    code: "CL"
}, {
    name: "China",
    code: "CN"
}, {
    name: "Christmas Island",
    code: "CX"
}, {
    name: "Colombia",
    code: "CO"
}, {
    name: "Comoros",
    code: "KM"
}, {
    name: "Congo",
    code: "CG"
}, {
    name: "Cook Islands",
    code: "CK"
}, {
    name: "Costa Rica",
    code: "CR"
}, {
    name: "Croatia",
    code: "HR"
}, {
    name: "Cuba",
    code: "CU"
}, {
    name: "Cyprus",
    code: "CY"
}, {
    name: "Czech Republic",
    code: "CZ"
}, {
    name: "Denmark",
    code: "DK"
}, {
    name: "Djibouti",
    code: "DJ"
}, {
    name: "Dominica",
    code: "DM"
}, {
    name: "Dominican Republic",
    code: "DO"
}, {
    name: "Ecuador",
    code: "EC"
}, {
    name: "Egypt",
    code: "EG"
}, {
    name: "El Salvador",
    code: "SV"
}, {
    name: "Equatorial Guinea",
    code: "GQ"
}, {
    name: "Eritrea",
    code: "ER"
}, {
    name: "Estonia",
    code: "EE"
}, {
    name: "Ethiopia",
    code: "ET"
}, {
    name: "Faroe Islands",
    code: "FO"
}, {
    name: "Fiji",
    code: "FJ"
}, {
    name: "Finland",
    code: "FI"
}, {
    name: "France",
    code: "FR"
}, {
    name: "French Guiana",
    code: "GF"
}, {
    name: "French Polynesia",
    code: "PF"
}, {
    name: "Gabon",
    code: "GA"
}, {
    name: "Gambia",
    code: "GM"
}, {
    name: "Georgia",
    code: "GE"
}, {
    name: "Germany",
    code: "DE"
}, {
    name: "Ghana",
    code: "GH"
}, {
    name: "Gibraltar",
    code: "GI"
}, {
    name: "Greece",
    code: "GR"
}, {
    name: "Greenland",
    code: "GL"
}, {
    name: "Grenada",
    code: "GD"
}, {
    name: "Guadeloupe",
    code: "GP"
}, {
    name: "Guam",
    code: "GU"
}, {
    name: "Guatemala",
    code: "GT"
}, {
    name: "Guinea",
    code: "GN"
}, {
    name: "Guinea-Bissau",
    code: "GW"
}, {
    name: "Guyana",
    code: "GY"
}, {
    name: "Haiti",
    code: "HT"
}, {
    name: "Honduras",
    code: "HN"
}, {
    name: "Hungary",
    code: "HU"
}, {
    name: "Iceland",
    code: "IS"
}, {
    name: "India",
    code: "IN"
}, {
    name: "Indonesia",
    code: "ID"
}, {
    name: "Iraq",
    code: "IQ"
}, {
    name: "Ireland",
    code: "IE"
}, {
    name: "Israel",
    code: "IL"
}, {
    name: "Italy",
    code: "IT"
}, {
    name: "Jamaica",
    code: "JM"
}, {
    name: "Japan",
    code: "JP"
}, {
    name: "Jordan",
    code: "JO"
}, {
    name: "Kazakhstan",
    code: "KZ"
}, {
    name: "Kenya",
    code: "KE"
}, {
    name: "Kiribati",
    code: "KI"
}, {
    name: "Kuwait",
    code: "KW"
}, {
    name: "Kyrgyzstan",
    code: "KG"
}, {
    name: "Latvia",
    code: "LV"
}, {
    name: "Lebanon",
    code: "LB"
}, {
    name: "Lesotho",
    code: "LS"
}, {
    name: "Liberia",
    code: "LR"
}, {
    name: "Liechtenstein",
    code: "LI"
}, {
    name: "Lithuania",
    code: "LT"
}, {
    name: "Luxembourg",
    code: "LU"
}, {
    name: "Madagascar",
    code: "MG"
}, {
    name: "Malawi",
    code: "MW"
}, {
    name: "Malaysia",
    code: "MY"
}, {
    name: "Maldives",
    code: "MV"
}, {
    name: "Mali",
    code: "ML"
}, {
    name: "Malta",
    code: "MT"
}, {
    name: "Marshall Islands",
    code: "MH"
}, {
    name: "Martinique",
    code: "MQ"
}, {
    name: "Mauritania",
    code: "MR"
}, {
    name: "Mauritius",
    code: "MU"
}, {
    name: "Mayotte",
    code: "YT"
}, {
    name: "Mexico",
    code: "MX"
}, {
    name: "Monaco",
    code: "MC"
}, {
    name: "Mongolia",
    code: "MN"
}, {
    name: "Montenegro",
    code: "ME"
}, {
    name: "Montserrat",
    code: "MS"
}, {
    name: "Morocco",
    code: "MA"
}, {
    name: "Myanmar",
    code: "MM"
}, {
    name: "Namibia",
    code: "NA"
}, {
    name: "Nauru",
    code: "NR"
}, {
    name: "Nepal",
    code: "NP"
}, {
    name: "Netherlands",
    code: "NL"
}, {
    name: "Netherlands Antilles",
    code: "AN"
}, {
    name: "New Caledonia",
    code: "NC"
}, {
    name: "New Zealand",
    code: "NZ"
}, {
    name: "Nicaragua",
    code: "NI"
}, {
    name: "Niger",
    code: "NE"
}, {
    name: "Nigeria",
    code: "NG"
}, {
    name: "Niue",
    code: "NU"
}, {
    name: "Norfolk Island",
    code: "NF"
}, {
    name: "Northern Mariana Islands",
    code: "MP"
}, {
    name: "Norway",
    code: "NO"
}, {
    name: "Oman",
    code: "OM"
}, {
    name: "Pakistan",
    code: "PK"
}, {
    name: "Palau",
    code: "PW"
}, {
    name: "Panama",
    code: "PA"
}, {
    name: "Papua New Guinea",
    code: "PG"
}, {
    name: "Paraguay",
    code: "PY"
}, {
    name: "Peru",
    code: "PE"
}, {
    name: "Philippines",
    code: "PH"
}, {
    name: "Poland",
    code: "PL"
}, {
    name: "Portugal",
    code: "PT"
}, {
    name: "Puerto Rico",
    code: "PR"
}, {
    name: "Qatar",
    code: "QA"
}, {
    name: "Romania",
    code: "RO"
}, {
    name: "Rwanda",
    code: "RW"
}, {
    name: "Samoa",
    code: "WS"
}, {
    name: "San Marino",
    code: "SM"
}, {
    name: "Saudi Arabia",
    code: "SA"
}, {
    name: "Senegal",
    code: "SN"
}, {
    name: "Serbia",
    code: "RS"
}, {
    name: "Seychelles",
    code: "SC"
}, {
    name: "Sierra Leone",
    code: "SL"
}, {
    name: "Singapore",
    code: "SG"
}, {
    name: "Slovakia",
    code: "SK"
}, {
    name: "Slovenia",
    code: "SI"
}, {
    name: "Solomon Islands",
    code: "SB"
}, {
    name: "South Africa",
    code: "ZA"
}, {
    name: "South Georgia and the South Sandwich Islands",
    code: "GS"
}, {
    name: "Spain",
    code: "ES"
}, {
    name: "Sri Lanka",
    code: "LK"
}, {
    name: "Sudan",
    code: "SD"
}, {
    name: "Suriname",
    code: "SR"
}, {
    name: "Swaziland",
    code: "SZ"
}, {
    name: "Sweden",
    code: "SE"
}, {
    name: "Switzerland",
    code: "CH"
}, {
    name: "Tajikistan",
    code: "TJ"
}, {
    name: "Thailand",
    code: "TH"
}, {
    name: "Togo",
    code: "TG"
}, {
    name: "Tokelau",
    code: "TK"
}, {
    name: "Tonga",
    code: "TO"
}, {
    name: "Trinidad and Tobago",
    code: "TT"
}, {
    name: "Tunisia",
    code: "TN"
}, {
    name: "Turkey",
    code: "TR"
}, {
    name: "Turkmenistan",
    code: "TM"
}, {
    name: "Turks and Caicos Islands",
    code: "TC"
}, {
    name: "Tuvalu",
    code: "TV"
}, {
    name: "Uganda",
    code: "UG"
}, {
    name: "Ukraine",
    code: "UA"
}, {
    name: "United Arab Emirates",
    code: "AE"
}, {
    name: "United Kingdom",
    code: "GB"
}, {
    name: "Uruguay",
    code: "UY"
}, {
    name: "Uzbekistan",
    code: "UZ"
}, {
    name: "Vanuatu",
    code: "VU"
}, {
    name: "Wallis and Futuna",
    code: "WF"
}, {
    name: "Yemen",
    code: "YE"
}, {
    name: "Zambia",
    code: "ZM"
}, {
    name: "Zimbabwe",
    code: "ZW"
}, {
    name: "land Islands",
    code: "AX"
}, {
    name: "Antarctica",
    code: "AQ"
}, {
    name: "Bolivia, Plurinational State of",
    code: "BO"
}, {
    name: "Brunei Darussalam",
    code: "BN"
}, {
    name: "Cocos (Keeling) Islands",
    code: "CC"
}, {
    name: "Congo, The Democratic Republic of the",
    code: "CD"
}, {
    name: "Cote d'Ivoire",
    code: "CI"
}, {
    name: "Falkland Islands (Malvinas)",
    code: "FK"
}, {
    name: "Guernsey",
    code: "GG"
}, {
    name: "Holy See (Vatican City State)",
    code: "VA"
}, {
    name: "Hong Kong",
    code: "HK"
}, {
    name: "Iran, Islamic Republic of",
    code: "IR"
}, {
    name: "Isle of Man",
    code: "IM"
}, {
    name: "Jersey",
    code: "JE"
}, {
    name: "Korea, Democratic People's Republic of",
    code: "KP"
}, {
    name: "Korea, Republic of",
    code: "KR"
}, {
    name: "Lao People's Democratic Republic",
    code: "LA"
}, {
    name: "Libyan Arab Jamahiriya",
    code: "LY"
}, {
    name: "Macao",
    code: "MO"
}, {
    name: "Macedonia, The Former Yugoslav Republic of",
    code: "MK"
}, {
    name: "Micronesia, Federated States of",
    code: "FM"
}, {
    name: "Moldova, Republic of",
    code: "MD"
}, {
    name: "Mozambique",
    code: "MZ"
}, {
    name: "Palestinian Territory, Occupied",
    code: "PS"
}, {
    name: "Pitcairn",
    code: "PN"
}, {
    name: "Réunion",
    code: "RE"
}, {
    name: "Russia",
    code: "RU"
}, {
    name: "Saint Barthélemy",
    code: "BL"
}, {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    code: "SH"
}, {
    name: "Saint Kitts and Nevis",
    code: "KN"
}, {
    name: "Saint Lucia",
    code: "LC"
}, {
    name: "Saint Martin",
    code: "MF"
}, {
    name: "Saint Pierre and Miquelon",
    code: "PM"
}, {
    name: "Saint Vincent and the Grenadines",
    code: "VC"
}, {
    name: "Sao Tome and Principe",
    code: "ST"
}, {
    name: "Somalia",
    code: "SO"
}, {
    name: "Svalbard and Jan Mayen",
    code: "SJ"
}, {
    name: "Syrian Arab Republic",
    code: "SY"
}, {
    name: "Taiwan, Province of China",
    code: "TW"
}, {
    name: "Tanzania, United Republic of",
    code: "TZ"
}, {
    name: "Timor-Leste",
    code: "TL"
}, {
    name: "Venezuela, Bolivarian Republic of",
    code: "VE"
}, {
    name: "Viet Nam",
    code: "VN"
}, {
    name: "Virgin Islands, British",
    code: "VG"
}, {
    name: "Virgin Islands, U.S.",
    code: "VI"
}]
}
