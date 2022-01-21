import { Component, OnInit } from '@angular/core';
import { HomeService } from './shared/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public trm;
  spinner = true;

  constructor(protected homeService: HomeService) { }

  ngOnInit() {
    this.homeService.consultar().subscribe(data => {
      this.trm = data
    }, error => {
        console.log(error); 
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner=false;
    }, 500);
  }

}
