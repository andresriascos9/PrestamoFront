import { Component, OnInit } from '@angular/core';
import { TrmService } from '../../service/trm.service';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.css']
})
export class TrmComponent implements OnInit {

  public trm;
  spinner = true;

  constructor(protected trmService: TrmService) { }

  ngOnInit(): void {
    this.trmService.consultar().subscribe(data => {
      this.trm = data;
    }, error => {
      console.log(error);
    });

    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }

}
