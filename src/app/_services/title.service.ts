import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
    //final data to be used by fashion component
    finalData: any = {};
    //list of interest
    interest: any = [
        { val: 'Expensive', isChecked: true },
        { val: 'Casual', isChecked: false },
      ];

      //list of genders
    genders: any = [
        { val: 'Male', isChecked: true },
        { val: 'Female', isChecked: false },
      ];

      //list of sizes
    sizes: any = [
        { val: 'Petite', isChecked: true },
        { val: 'Plus size', isChecked: false },
        { val: 'Tall', isChecked: false },
    ];

  // list menu titles
  appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
        title: 'Elsewhere',
        url: '/elsewhere',
        icon: 'pin'
      },
    {
      title: 'Gender',
      url: '/gender',
      icon: 'contacts',
      value: 'Male'
    },
    {
      title: 'Size',
      url: '/size',
      icon: 'resize',
      value: 'Plus size'
    },
    {
      title: 'Interest',
      url: '/interest',
      icon: 'happy',
      value: 'Expensive'
    },
    {
      title: 'Email',
      url: '/email',
      icon: 'mail',
      value: 'arreyessimbate@gmail.com'
    },
    {
      title: 'Passord',
      url: '/password',
      icon: 'lock'
    },
    {
      title: 'Country',
      url: '/list',
      icon: 'flag',
      value: 'United States'
    }
  ];

  // list of countries used in html
  countries = [ {
    name: "United States",
    selected:false,
    code: "US"
}, {
    name: "Israel",
    selected:false,
    code: "IL"
}, {
    name: "Afghanistan",
    selected:false,
    code: "AF"
}, {
    name: "Albania",
    selected:false,
    code: "AL"
}, {
    name: "Algeria",
    selected:false,
    code: "DZ"
}, {
    name: "AmericanSamoa",
    selected:false,
    code: "AS"
}, {
    name: "Andorra",
    selected:false,
    code: "AD"
}, {
    name: "Angola",
    selected:false,
    code: "AO"
}, {
    name: "Anguilla",
    selected:false,
    code: "AI"
}, {
    name: "Antigua and Barbuda",
    selected:false,
    code: "AG"
}, {
    name: "Argentina",
    selected:false,
    code: "AR"
}, {
    name: "Armenia",
    selected:false,
    code: "AM"
}, {
    name: "Aruba",
    selected:false,
    code: "AW"
}, {
    name: "Australia",
    selected:false,
    code: "AU"
}, {
    name: "Austria",
    selected:false,
    code: "AT"
}, {
    name: "Azerbaijan",
    selected:false,
    code: "AZ"
}, {
    name: "Bahamas",
    selected:false,
    code: "BS"
}, {
    name: "Bahrain",
    selected:false,
    code: "BH"
}, {
    name: "Bangladesh",
    selected:false,
    code: "BD"
}, {
    name: "Barbados",
    selected:false,
    code: "BB"
}, {
    name: "Belarus",
    selected:false,
    code: "BY"
}, {
    name: "Belgium",
    selected:false,
    code: "BE"
}, {
    name: "Belize",
    selected:false,
    code: "BZ"
}, {
    name: "Benin",
    selected:false,
    code: "BJ"
}, {
    name: "Bermuda",
    selected:false,
    code: "BM"
}, {
    name: "Bhutan",
    selected:false,
    code: "BT"
}, {
    name: "Bosnia and Herzegovina",
    selected:false,
    code: "BA"
}, {
    name: "Botswana",
    selected:false,
    code: "BW"
}, {
    name: "Brazil",
    selected:false,
    code: "BR"
}, {
    name: "British Indian Ocean Territory",
    selected:false,
    code: "IO"
}, {
    name: "Bulgaria",
    selected:false,
    code: "BG"
}, {
    name: "Burkina Faso",
    selected:false,
    code: "BF"
}, {
    name: "Burundi",
    selected:false,
    code: "BI"
}, {
    name: "Cambodia",
    selected:false,
    code: "KH"
}, {
    name: "Cameroon",
    selected:false,
    code: "CM"
}, {
    name: "Canada",
    selected:false,
    code: "CA"
}, {
    name: "Cape Verde",
    selected:false,
    code: "CV"
}, {
    name: "Cayman Islands",
    selected:false,
    code: "KY"
}, {
    name: "Central African Republic",
    selected:false,
    code: "CF"
}, {
    name: "Chad",
    selected:false,
    code: "TD"
}, {
    name: "Chile",
    selected:false,
    code: "CL"
}, {
    name: "China",
    selected:false,
    code: "CN"
}, {
    name: "Christmas Island",
    selected:false,
    code: "CX"
}, {
    name: "Colombia",
    selected:false,
    code: "CO"
}, {
    name: "Comoros",
    selected:false,
    code: "KM"
}, {
    name: "Congo",
    selected:false,
    code: "CG"
}, {
    name: "Cook Islands",
    selected:false,
    code: "CK"
}, {
    name: "Costa Rica",
    selected:false,
    code: "CR"
}, {
    name: "Croatia",
    selected:false,
    code: "HR"
}, {
    name: "Cuba",
    selected:false,
    code: "CU"
}, {
    name: "Cyprus",
    selected:false,
    code: "CY"
}, {
    name: "Czech Republic",
    selected:false,
    code: "CZ"
}, {
    name: "Denmark",
    selected:false,
    code: "DK"
}, {
    name: "Djibouti",
    selected:false,
    code: "DJ"
}, {
    name: "Dominica",
    selected:false,
    code: "DM"
}, {
    name: "Dominican Republic",
    selected:false,
    code: "DO"
}, {
    name: "Ecuador",
    selected:false,
    code: "EC"
}, {
    name: "Egypt",
    selected:false,
    code: "EG"
}, {
    name: "El Salvador",
    selected:false,
    code: "SV"
}, {
    name: "Equatorial Guinea",
    selected:false,
    code: "GQ"
}, {
    name: "Eritrea",
    selected:false,
    code: "ER"
}, {
    name: "Estonia",
    selected:false,
    code: "EE"
}, {
    name: "Ethiopia",
    selected:false,
    code: "ET"
}, {
    name: "Faroe Islands",
    selected:false,
    code: "FO"
}, {
    name: "Fiji",
    selected:false,
    code: "FJ"
}, {
    name: "Finland",
    selected:false,
    code: "FI"
}, {
    name: "France",
    selected:false,
    code: "FR"
}, {
    name: "French Guiana",
    selected:false,
    code: "GF"
}, {
    name: "French Polynesia",
    selected:false,
    code: "PF"
}, {
    name: "Gabon",
    selected:false,
    code: "GA"
}, {
    name: "Gambia",
    selected:false,
    code: "GM"
}, {
    name: "Georgia",
    selected:false,
    code: "GE"
}, {
    name: "Germany",
    selected:false,
    code: "DE"
}, {
    name: "Ghana",
    selected:false,
    code: "GH"
}, {
    name: "Gibraltar",
    selected:false,
    code: "GI"
}, {
    name: "Greece",
    selected:false,
    code: "GR"
}, {
    name: "Greenland",
    selected:false,
    code: "GL"
}, {
    name: "Grenada",
    selected:false,
    code: "GD"
}, {
    name: "Guadeloupe",
    selected:false,
    code: "GP"
}, {
    name: "Guam",
    selected:false,
    code: "GU"
}, {
    name: "Guatemala",
    selected:false,
    code: "GT"
}, {
    name: "Guinea",
    selected:false,
    code: "GN"
}, {
    name: "Guinea-Bissau",
    selected:false,
    code: "GW"
}, {
    name: "Guyana",
    selected:false,
    code: "GY"
}, {
    name: "Haiti",
    selected:false,
    code: "HT"
}, {
    name: "Honduras",
    selected:false,
    code: "HN"
}, {
    name: "Hungary",
    selected:false,
    code: "HU"
}, {
    name: "Iceland",
    selected:false,
    code: "IS"
}, {
    name: "India",
    selected:false,
    code: "IN"
}, {
    name: "Indonesia",
    selected:false,
    code: "ID"
}, {
    name: "Iraq",
    selected:false,
    code: "IQ"
}, {
    name: "Ireland",
    selected:false,
    code: "IE"
}, {
    name: "Israel",
    selected:false,
    code: "IL"
}, {
    name: "Italy",
    selected:false,
    code: "IT"
}, {
    name: "Jamaica",
    selected:false,
    code: "JM"
}, {
    name: "Japan",
    selected:false,
    code: "JP"
}, {
    name: "Jordan",
    selected:false,
    code: "JO"
}, {
    name: "Kazakhstan",
    selected:false,
    code: "KZ"
}, {
    name: "Kenya",
    selected:false,
    code: "KE"
}, {
    name: "Kiribati",
    selected:false,
    code: "KI"
}, {
    name: "Kuwait",
    selected:false,
    code: "KW"
}, {
    name: "Kyrgyzstan",
    selected:false,
    code: "KG"
}, {
    name: "Latvia",
    selected:false,
    code: "LV"
}, {
    name: "Lebanon",
    selected:false,
    code: "LB"
}, {
    name: "Lesotho",
    selected:false,
    code: "LS"
}, {
    name: "Liberia",
    selected:false,
    code: "LR"
}, {
    name: "Liechtenstein",
    selected:false,
    code: "LI"
}, {
    name: "Lithuania",
    selected:false,
    code: "LT"
}, {
    name: "Luxembourg",
    selected:false,
    code: "LU"
}, {
    name: "Madagascar",
    selected:false,
    code: "MG"
}, {
    name: "Malawi",
    selected:false,
    code: "MW"
}, {
    name: "Malaysia",
    selected:false,
    code: "MY"
}, {
    name: "Maldives",
    selected:false,
    code: "MV"
}, {
    name: "Mali",
    selected:false,
    code: "ML"
}, {
    name: "Malta",
    selected:false,
    code: "MT"
}, {
    name: "Marshall Islands",
    selected:false,
    code: "MH"
}, {
    name: "Martinique",
    selected:false,
    code: "MQ"
}, {
    name: "Mauritania",
    selected:false,
    code: "MR"
}, {
    name: "Mauritius",
    selected:false,
    code: "MU"
}, {
    name: "Mayotte",
    selected:false,
    code: "YT"
}, {
    name: "Mexico",
    selected:false,
    code: "MX"
}, {
    name: "Monaco",
    selected:false,
    code: "MC"
}, {
    name: "Mongolia",
    selected:false,
    code: "MN"
}, {
    name: "Montenegro",
    selected:false,
    code: "ME"
}, {
    name: "Montserrat",
    selected:false,
    code: "MS"
}, {
    name: "Morocco",
    selected:false,
    code: "MA"
}, {
    name: "Myanmar",
    selected:false,
    code: "MM"
}, {
    name: "Namibia",
    selected:false,
    code: "NA"
}, {
    name: "Nauru",
    selected:false,
    code: "NR"
}, {
    name: "Nepal",
    selected:false,
    code: "NP"
}, {
    name: "Netherlands",
    selected:false,
    code: "NL"
}, {
    name: "Netherlands Antilles",
    selected:false,
    code: "AN"
}, {
    name: "New Caledonia",
    selected:false,
    code: "NC"
}, {
    name: "New Zealand",
    selected:false,
    code: "NZ"
}, {
    name: "Nicaragua",
    selected:false,
    code: "NI"
}, {
    name: "Niger",
    selected:false,
    code: "NE"
}, {
    name: "Nigeria",
    selected:false,
    code: "NG"
}, {
    name: "Niue",
    selected:false,
    code: "NU"
}, {
    name: "Norfolk Island",
    selected:false,
    code: "NF"
}, {
    name: "Northern Mariana Islands",
    selected:false,
    code: "MP"
}, {
    name: "Norway",
    selected:false,
    code: "NO"
}, {
    name: "Oman",
    selected:false,
    code: "OM"
}, {
    name: "Pakistan",
    selected:false,
    code: "PK"
}, {
    name: "Palau",
    selected:false,
    code: "PW"
}, {
    name: "Panama",
    selected:false,
    code: "PA"
}, {
    name: "Papua New Guinea",
    selected:false,
    code: "PG"
}, {
    name: "Paraguay",
    selected:false,
    code: "PY"
}, {
    name: "Peru",
    selected:false,
    code: "PE"
}, {
    name: "Philippines",
    selected:false,
    code: "PH"
}, {
    name: "Poland",
    selected:false,
    code: "PL"
}, {
    name: "Portugal",
    selected:false,
    code: "PT"
}, {
    name: "Puerto Rico",
    selected:false,
    code: "PR"
}, {
    name: "Qatar",
    selected:false,
    code: "QA"
}, {
    name: "Romania",
    selected:false,
    code: "RO"
}, {
    name: "Rwanda",
    selected:false,
    code: "RW"
}, {
    name: "Samoa",
    selected:false,
    code: "WS"
}, {
    name: "San Marino",
    selected:false,
    code: "SM"
}, {
    name: "Saudi Arabia",
    selected:false,
    code: "SA"
}, {
    name: "Senegal",
    selected:false,
    code: "SN"
}, {
    name: "Serbia",
    selected:false,
    code: "RS"
}, {
    name: "Seychelles",
    selected:false,
    code: "SC"
}, {
    name: "Sierra Leone",
    selected:false,
    code: "SL"
}, {
    name: "Singapore",
    selected:false,
    code: "SG"
}, {
    name: "Slovakia",
    selected:false,
    code: "SK"
}, {
    name: "Slovenia",
    selected:false,
    code: "SI"
}, {
    name: "Solomon Islands",
    selected:false,
    code: "SB"
}, {
    name: "South Africa",
    selected:false,
    code: "ZA"
}, {
    name: "South Georgia and the South Sandwich Islands",
    selected:false,
    code: "GS"
}, {
    name: "Spain",
    selected:false,
    code: "ES"
}, {
    name: "Sri Lanka",
    selected:false,
    code: "LK"
}, {
    name: "Sudan",
    selected:false,
    code: "SD"
}, {
    name: "Suriname",
    selected:false,
    code: "SR"
}, {
    name: "Swaziland",
    selected:false,
    code: "SZ"
}, {
    name: "Sweden",
    selected:false,
    code: "SE"
}, {
    name: "Switzerland",
    selected:false,
    code: "CH"
}, {
    name: "Tajikistan",
    selected:false,
    code: "TJ"
}, {
    name: "Thailand",
    selected:false,
    code: "TH"
}, {
    name: "Togo",
    selected:false,
    code: "TG"
}, {
    name: "Tokelau",
    selected:false,
    code: "TK"
}, {
    name: "Tonga",
    selected:false,
    code: "TO"
}, {
    name: "Trinidad and Tobago",
    selected:false,
    code: "TT"
}, {
    name: "Tunisia",
    selected:false,
    code: "TN"
}, {
    name: "Turkey",
    selected:false,
    code: "TR"
}, {
    name: "Turkmenistan",
    selected:false,
    code: "TM"
}, {
    name: "Turks and Caicos Islands",
    selected:false,
    code: "TC"
}, {
    name: "Tuvalu",
    selected:false,
    code: "TV"
}, {
    name: "Uganda",
    selected:false,
    code: "UG"
}, {
    name: "Ukraine",
    selected:false,
    code: "UA"
}, {
    name: "United Arab Emirates",
    selected:false,
    code: "AE"
}, {
    name: "United Kingdom",
    selected:false,
    code: "GB"
}, {
    name: "Uruguay",
    selected:false,
    code: "UY"
}, {
    name: "Uzbekistan",
    selected:false,
    code: "UZ"
}, {
    name: "Vanuatu",
    selected:false,
    code: "VU"
}, {
    name: "Wallis and Futuna",
    selected:false,
    code: "WF"
}, {
    name: "Yemen",
    selected:false,
    code: "YE"
}, {
    name: "Zambia",
    selected:false,
    code: "ZM"
}, {
    name: "Zimbabwe",
    selected:false,
    code: "ZW"
}, {
    name: "land Islands",
    selected:false,
    code: "AX"
}, {
    name: "Antarctica",
    selected:false,
    code: "AQ"
}, {
    name: "Bolivia, Plurinational State of",
    selected:false,
    code: "BO"
}, {
    name: "Brunei Darussalam",
    selected:false,
    code: "BN"
}, {
    name: "Cocos (Keeling) Islands",
    selected:false,
    code: "CC"
}, {
    name: "Congo, The Democratic Republic of the",
    selected:false,
    code: "CD"
}, {
    name: "Cote d'Ivoire",
    selected:false,
    code: "CI"
}, {
    name: "Falkland Islands (Malvinas)",
    selected:false,
    code: "FK"
}, {
    name: "Guernsey",
    selected:false,
    code: "GG"
}, {
    name: "Holy See (Vatican City State)",
    selected:false,
    code: "VA"
}, {
    name: "Hong Kong",
    selected:false,
    code: "HK"
}, {
    name: "Iran, Islamic Republic of",
    selected:false,
    code: "IR"
}, {
    name: "Isle of Man",
    selected:false,
    code: "IM"
}, {
    name: "Jersey",
    selected:false,
    code: "JE"
}, {
    name: "Korea, Democratic People's Republic of",
    selected:false,
    code: "KP"
}, {
    name: "Korea, Republic of",
    selected:false,
    code: "KR"
}, {
    name: "Lao People's Democratic Republic",
    selected:false,
    code: "LA"
}, {
    name: "Libyan Arab Jamahiriya",
    selected:false,
    code: "LY"
}, {
    name: "Macao",
    selected:false,
    code: "MO"
}, {
    name: "Macedonia, The Former Yugoslav Republic of",
    selected:false,
    code: "MK"
}, {
    name: "Micronesia, Federated States of",
    selected:false,
    code: "FM"
}, {
    name: "Moldova, Republic of",
    selected:false,
    code: "MD"
}, {
    name: "Mozambique",
    selected:false,
    code: "MZ"
}, {
    name: "Palestinian Territory, Occupied",
    selected:false,
    code: "PS"
}, {
    name: "Pitcairn",
    selected:false,
    code: "PN"
}, {
    name: "Réunion",
    selected:false,
    code: "RE"
}, {
    name: "Russia",
    selected:false,
    code: "RU"
}, {
    name: "Saint Barthélemy",
    selected:false,
    code: "BL"
}, {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    selected:false,
    code: "SH"
}, {
    name: "Saint Kitts and Nevis",
    selected:false,
    code: "KN"
}, {
    name: "Saint Lucia",
    selected:false,
    code: "LC"
}, {
    name: "Saint Martin",
    selected:false,
    code: "MF"
}, {
    name: "Saint Pierre and Miquelon",
    selected:false,
    code: "PM"
}, {
    name: "Saint Vincent and the Grenadines",
    selected:false,
    code: "VC"
}, {
    name: "Sao Tome and Principe",
    selected:false,
    code: "ST"
}, {
    name: "Somalia",
    selected:false,
    code: "SO"
}, {
    name: "Svalbard and Jan Mayen",
    selected:false,
    code: "SJ"
}, {
    name: "Syrian Arab Republic",
    selected:false,
    code: "SY"
}, {
    name: "Taiwan, Province of China",
    selected:false,
    code: "TW"
}, {
    name: "Tanzania, United Republic of",
    selected:false,
    code: "TZ"
}, {
    name: "Timor-Leste",
    selected:false,
    code: "TL"
}, {
    name: "Venezuela, Bolivarian Republic of",
    selected:false,
    code: "VE"
}, {
    name: "Viet Nam",
    selected:false,
    code: "VN"
}, {
    name: "Virgin Islands, British",
    selected:false,
    code: "VG"
}, {
    name: "Virgin Islands, U.S.",
    selected:false,
    code: "VI"
}]
  constructor() { }
}
