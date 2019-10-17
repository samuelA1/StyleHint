import { TitleService } from './../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal-info',
  templateUrl: './legal-info.page.html',
  styleUrls: ['./legal-info.page.scss'],
})
export class LegalInfoPage implements OnInit {

  constructor(public titleService: TitleService) { }

  ngOnInit() {
  }

}
