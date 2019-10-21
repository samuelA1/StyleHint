import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  user: any = {
    size: '',
    country: 'United States',
    gender: '',
    interest: '',
    isAdmin:  '',
    isDesigner: '',
    stripeAcct: '',
    category: ''
  }; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button

  //list of sizes
  sizes: any = [
    { name: 'small'},
    { name: 'medium' },
    { name: 'large' },
  ];

  //is admin
  isAdmin: any = [
    { name: true},
    { name: false }
  ];

   //is designer
   isDesigner: any = [
    { name: true},
    { name: false }
  ];

  //occasion/event array
  occasions: any[] = [
    {name: 'school'},
    {name: 'sport'},
    {name: 'birthday party'},
    {name: 'halloween'},
    {name: 'christmas'},
    {name: 'church'},
    {name: 'date night'},
    {name: 'job interview'},
    {name: 'culture'},
  ]

  //list of genders
  genders: any = [
      { name: 'male adult' },
      { name: 'male kid' },
      { name: 'female adult'},
      { name: 'female kid'},
    ];

    //list of interest
    interests: any = [
      { name: 'expensive'},
      { name: 'casual' },
    ];
  
    constructor(private navCtrl: NavController,
       private alertCtrl: AlertController,
       private toastCtrl: ToastController,
       private adminService: AdminService) {
          if (this.adminService.id !== '') {
            this.getUser();
          }
        }

       //get total users
  async getUser() {
    try {
      const userInfo = await this.adminService.getUser();
      if (userInfo['success']) {
        this.user = Object.assign({}, {isAdmin: `${userInfo['user']['isAdmin']}`,
                                       isDesigner: `${userInfo['user']['isDesigner']}`,
                                       interest: `${userInfo['user']['interest']}`,
                                       gender: `${userInfo['user']['gender']}`,
                                       country: `${userInfo['user']['country']}`,
                                       email: `${userInfo['user']['email']}`,
                                       username: `${userInfo['user']['username']}`,
                                       name: `${userInfo['user']['name']}`,
                                       picture: `${userInfo['user']['picture']}`,
                                       createdAt: `${userInfo['user']['createdAt']}`,
                                       password: '',
                                       stripeAcct: `${userInfo['user']['stripeAcct']}`,
                                       category: userInfo['user']['category'],
                                       size: `${userInfo['user']['size']}`});
      } else {
        this.presentAlert('Sorry, an error occured while getting a user');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a user');
    }
  }
  
    //performs update
    async updateUser() {
      this.loading = true;
      setTimeout(async () => {
        this.validation(this.user)
        if (Object.keys(this.error).length == 0) {
          this.loading = false;
          if (this.user.category.length === 1) {
            try {
              const updateInfo = await this.adminService.updateUser(this.user);
              if (updateInfo['success']) {
                this.navCtrl.navigateRoot('menu').then(() => {
                  this.navCtrl.navigateRoot('all-users');
                })
                this.presentToast('update successful')
              } else {
                this.presentAlert(updateInfo['message']);
              }
            } catch (error) {
              this.presentAlert('Sorry, an error occured while trying to update an account')
            }
          } else {
            this.presentAlert('Sorry, a designer must have at least and only one interested occasion')
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
  
      console.log(user['password'])
      if (user['password'] !== null) {
        if (user['password'].length >= 8) {
        }
      } else {
        this.error.password = 'Sorry, your password must be at least 8 characters';
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
        header: 'Update error',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

     //toast
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'dark',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
  
    //remove validation errors
    removeErrors() {
      this.error = {};
    }
  
    ngOnInit() {
    }
    
    // list of countries used in html
    countries = [ {
      name: "United States".toLowerCase().toLowerCase(),}, {
      name: "Israel".toLowerCase(),}, {
      name: "Afghanistan".toLowerCase(),}, {
      name: "Albania".toLowerCase(),}, {
      name: "Algeria".toLowerCase(),}, {
      name: "AmericanSamoa".toLowerCase(),}, {
      name: "Andorra".toLowerCase(),}, {
      name: "Angola".toLowerCase(),}, {
      name: "Anguilla".toLowerCase(),}, {
      name: "Antigua and Barbuda".toLowerCase(),}, {
      name: "Argentina".toLowerCase(),}, {
      name: "Armenia".toLowerCase(),}, {
      name: "Aruba".toLowerCase(),}, {
      name: "Australia".toLowerCase(),}, {
      name: "Austria".toLowerCase(),}, {
      name: "Azerbaijan".toLowerCase(),}, {
      name: "Bahamas".toLowerCase(),}, {
      name: "Bahrain".toLowerCase(),}, {
      name: "Bangladesh".toLowerCase(),}, {
      name: "Barbados".toLowerCase(),}, {
      name: "Belarus".toLowerCase(),}, {
      name: "Belgium".toLowerCase(),}, {
      name: "Belize".toLowerCase(),}, {
      name: "Benin".toLowerCase(),}, {
      name: "Bermuda".toLowerCase(),}, {
      name: "Bhutan".toLowerCase(),}, {
      name: "Bosnia and Herzegovina".toLowerCase(),}, {
      name: "Botswana".toLowerCase(),}, {
      name: "Brazil".toLowerCase(),}, {
      name: "British Indian Ocean Territory".toLowerCase(),}, {
      name: "Bulgaria".toLowerCase(),}, {
      name: "Burkina Faso".toLowerCase(),}, {
      name: "Burundi".toLowerCase(),}, {
      name: "Cambodia".toLowerCase(),}, {
      name: "Cameroon".toLowerCase(),}, {
      name: "Canada".toLowerCase(),}, {
      name: "Cape Verde".toLowerCase(),}, {
      name: "Cayman Islands".toLowerCase(),}, {
      name: "Central African Republic".toLowerCase(),}, {
      name: "Chad".toLowerCase(),}, {
      name: "Chile".toLowerCase(),}, {
      name: "China".toLowerCase(),}, {
      name: "Christmas Island".toLowerCase(),}, {
      name: "Colombia".toLowerCase(),}, {
      name: "Comoros".toLowerCase(),}, {
      name: "Congo".toLowerCase(),}, {
      name: "Cook Islands".toLowerCase(),}, {
      name: "Costa Rica".toLowerCase(),}, {
      name: "Croatia".toLowerCase(),}, {
      name: "Cuba".toLowerCase(),}, {
      name: "Cyprus".toLowerCase(),}, {
      name: "Czech Republic".toLowerCase(),}, {
      name: "Denmark".toLowerCase(),}, {
      name: "Djibouti".toLowerCase(),}, {
      name: "Dominica".toLowerCase(),}, {
      name: "Dominican Republic".toLowerCase(),}, {
      name: "Ecuador".toLowerCase(),}, {
      name: "Egypt".toLowerCase(),}, {
      name: "El Salvador".toLowerCase(),}, {
      name: "Equatorial Guinea".toLowerCase(),}, {
      name: "Eritrea".toLowerCase(),}, {
      name: "Estonia".toLowerCase(),}, {
      name: "Ethiopia".toLowerCase(),}, {
      name: "Faroe Islands".toLowerCase(),}, {
      name: "Fiji".toLowerCase(),}, {
      name: "Finland".toLowerCase(),}, {
      name: "France".toLowerCase(),}, {
      name: "French Guiana".toLowerCase(),}, {
      name: "French Polynesia".toLowerCase(),}, {
      name: "Gabon".toLowerCase(),}, {
      name: "Gambia".toLowerCase(),}, {
      name: "Georgia".toLowerCase(),}, {
      name: "Germany".toLowerCase(),}, {
      name: "Ghana".toLowerCase(),}, {
      name: "Gibraltar".toLowerCase(),}, {
      name: "Greece".toLowerCase(),}, {
      name: "Greenland".toLowerCase(),}, {
      name: "Grenada".toLowerCase(),}, {
      name: "Guadeloupe".toLowerCase(),}, {
      name: "Guam".toLowerCase(),}, {
      name: "Guatemala".toLowerCase(),}, {
      name: "Guinea".toLowerCase(),}, {
      name: "Guinea-Bissau".toLowerCase(),}, {
      name: "Guyana".toLowerCase(),}, {
      name: "Haiti".toLowerCase(),}, {
      name: "Honduras".toLowerCase(),}, {
      name: "Hungary".toLowerCase(),}, {
      name: "Iceland".toLowerCase(),}, {
      name: "India".toLowerCase(),}, {
      name: "Indonesia".toLowerCase(),}, {
      name: "Iraq".toLowerCase(),}, {
      name: "Ireland".toLowerCase(),}, {
      name: "Israel".toLowerCase(),}, {
      name: "Italy".toLowerCase(),}, {
      name: "Jamaica".toLowerCase(),}, {
      name: "Japan".toLowerCase(),}, {
      name: "Jordan".toLowerCase(),}, {
      name: "Kazakhstan".toLowerCase(),}, {
      name: "Kenya".toLowerCase(),}, {
      name: "Kiribati".toLowerCase(),}, {
      name: "Kuwait".toLowerCase(),}, {
      name: "Kyrgyzstan".toLowerCase(),}, {
      name: "Latvia".toLowerCase(),}, {
      name: "Lebanon".toLowerCase(),}, {
      name: "Lesotho".toLowerCase(),}, {
      name: "Liberia".toLowerCase(),}, {
      name: "Liechtenstein".toLowerCase(),}, {
      name: "Lithuania".toLowerCase(),}, {
      name: "Luxembourg".toLowerCase(),}, {
      name: "Madagascar".toLowerCase(),}, {
      name: "Malawi".toLowerCase(),}, {
      name: "Malaysia".toLowerCase(),}, {
      name: "Maldives".toLowerCase(),}, {
      name: "Mali".toLowerCase(),}, {
      name: "Malta".toLowerCase(),}, {
      name: "Marshall Islands".toLowerCase(),}, {
      name: "Martinique".toLowerCase(),}, {
      name: "Mauritania".toLowerCase(),}, {
      name: "Mauritius".toLowerCase(),}, {
      name: "Mayotte".toLowerCase(),}, {
      name: "Mexico".toLowerCase(),}, {
      name: "Monaco".toLowerCase(),}, {
      name: "Mongolia".toLowerCase(),}, {
      name: "Montenegro".toLowerCase(),}, {
      name: "Montserrat".toLowerCase(),}, {
      name: "Morocco".toLowerCase(),}, {
      name: "Myanmar".toLowerCase(),}, {
      name: "Namibia".toLowerCase(),}, {
      name: "Nauru".toLowerCase(),}, {
      name: "Nepal".toLowerCase(),}, {
      name: "Netherlands".toLowerCase(),}, {
      name: "Netherlands Antilles".toLowerCase(),}, {
      name: "New Caledonia".toLowerCase(),}, {
      name: "New Zealand".toLowerCase(),}, {
      name: "Nicaragua".toLowerCase(),}, {
      name: "Niger".toLowerCase(),}, {
      name: "Nigeria".toLowerCase(),}, {
      name: "Niue".toLowerCase(),}, {
      name: "Norfolk Island".toLowerCase(),}, {
      name: "Northern Mariana Islands".toLowerCase(),}, {
      name: "Norway".toLowerCase(),}, {
      name: "Oman".toLowerCase(),}, {
      name: "Pakistan".toLowerCase(),}, {
      name: "Palau".toLowerCase(),}, {
      name: "Panama".toLowerCase(),}, {
      name: "Papua New Guinea".toLowerCase(),}, {
      name: "Paraguay".toLowerCase(),}, {
      name: "Peru".toLowerCase(),}, {
      name: "Philippines".toLowerCase(),}, {
      name: "Poland".toLowerCase(),}, {
      name: "Portugal".toLowerCase(),}, {
      name: "Puerto Rico".toLowerCase(),}, {
      name: "Qatar".toLowerCase(),}, {
      name: "Romania".toLowerCase(),}, {
      name: "Rwanda".toLowerCase(),}, {
      name: "Samoa".toLowerCase(),}, {
      name: "San Marino".toLowerCase(),}, {
      name: "Saudi Arabia".toLowerCase(),}, {
      name: "Senegal".toLowerCase(),}, {
      name: "Serbia".toLowerCase(),}, {
      name: "Seychelles".toLowerCase(),}, {
      name: "Sierra Leone".toLowerCase(),}, {
      name: "Singapore".toLowerCase(),}, {
      name: "Slovakia".toLowerCase(),}, {
      name: "Slovenia".toLowerCase(),}, {
      name: "Solomon Islands".toLowerCase(),}, {
      name: "South Africa".toLowerCase(),}, {
      name: "South Georgia and the South Sandwich Islands".toLowerCase(),}, {
      name: "Spain".toLowerCase(),}, {
      name: "Sri Lanka".toLowerCase(),}, {
      name: "Sudan".toLowerCase(),}, {
      name: "Suriname".toLowerCase(),}, {
      name: "Swaziland".toLowerCase(),}, {
      name: "Sweden".toLowerCase(),}, {
      name: "Switzerland".toLowerCase(),}, {
      name: "Tajikistan".toLowerCase(),}, {
      name: "Thailand".toLowerCase(),}, {
      name: "Togo".toLowerCase(),}, {
      name: "Tokelau".toLowerCase(),}, {
      name: "Tonga".toLowerCase(),}, {
      name: "Trinidad and Tobago".toLowerCase(),}, {
      name: "Tunisia".toLowerCase(),}, {
      name: "Turkey".toLowerCase(),}, {
      name: "Turkmenistan".toLowerCase(),}, {
      name: "Turks and Caicos Islands".toLowerCase(),}, {
      name: "Tuvalu".toLowerCase(),}, {
      name: "Uganda".toLowerCase(),}, {
      name: "Ukraine".toLowerCase(),}, {
      name: "United Arab Emirates".toLowerCase(),}, {
      name: "United Kingdom".toLowerCase(),}, {
      name: "Uruguay".toLowerCase(),}, {
      name: "Uzbekistan".toLowerCase(),}, {
      name: "Vanuatu".toLowerCase(),}, {
      name: "Wallis and Futuna".toLowerCase(),}, {
      name: "Yemen".toLowerCase(),}, {
      name: "Zambia".toLowerCase(),}, {
      name: "Zimbabwe".toLowerCase(),}, {
      name: "land Islands".toLowerCase(),}, {
      name: "Antarctica".toLowerCase(),}, {
      name: "Bolivia, Plurinational State of".toLowerCase(),}, {
      name: "Brunei Darussalam".toLowerCase(),}, {
      name: "Cocos (Keeling) Islands".toLowerCase(),}, {
      name: "Congo, The Democratic Republic of the".toLowerCase(),}, {
      name: "Cote d'Ivoire".toLowerCase(),}, {
      name: "Falkland Islands (Malvinas)".toLowerCase(),}, {
      name: "Guernsey".toLowerCase(),}, {
      name: "Holy See (Vatican City State)".toLowerCase(),}, {
      name: "Hong Kong".toLowerCase(),}, {
      name: "Iran, Islamic Republic of".toLowerCase(),}, {
      name: "Isle of Man".toLowerCase(),}, {
      name: "Jersey".toLowerCase(),}, {
      name: "Korea, Democratic People's Republic of".toLowerCase(),}, {
      name: "Korea, Republic of".toLowerCase(),}, {
      name: "Lao People's Democratic Republic".toLowerCase(),}, {
      name: "Libyan Arab Jamahiriya".toLowerCase(),}, {
      name: "Macao".toLowerCase(),}, {
      name: "Macedonia, The Former Yugoslav Republic of".toLowerCase(),}, {
      name: "Micronesia, Federated States of".toLowerCase(),}, {
      name: "Moldova, Republic of".toLowerCase(),}, {
      name: "Mozambique".toLowerCase(),}, {
      name: "Palestinian Territory, Occupied".toLowerCase(),}, {
      name: "Pitcairn".toLowerCase(),}, {
      name: "Réunion".toLowerCase(),}, {
      name: "Russia".toLowerCase(),}, {
      name: "Saint Barthélemy".toLowerCase(),}, {
      name: "Saint Helena, Ascension and Tristan Da Cunha".toLowerCase(),}, {
      name: "Saint Kitts and Nevis".toLowerCase(),}, {
      name: "Saint Lucia".toLowerCase(),}, {
      name: "Saint Martin".toLowerCase(),}, {
      name: "Saint Pierre and Miquelon".toLowerCase(),}, {
      name: "Saint Vincent and the Grenadines".toLowerCase(),}, {
      name: "Sao Tome and Principe".toLowerCase(),}, {
      name: "Somalia".toLowerCase(),}, {
      name: "Svalbard and Jan Mayen".toLowerCase(),}, {
      name: "Syrian Arab Republic".toLowerCase(),}, {
      name: "Taiwan, Province of China".toLowerCase(),}, {
      name: "Tanzania, United Republic of".toLowerCase(),}, {
      name: "Timor-Leste".toLowerCase(),}, {
      name: "Venezuela, Bolivarian Republic of".toLowerCase(),}, {
      name: "Viet Nam".toLowerCase(),}, {
      name: "Virgin Islands, British".toLowerCase(),}, {
      name: "Virgin Islands, U.S.".toLowerCase(),}]

}
