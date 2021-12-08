import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud-inmueble',
  templateUrl: './crud-inmueble.component.html',
  styleUrls: ['./crud-inmueble.component.css']
})
export class CrudInmuebleComponent implements OnInit {

  constructor(public modal:NgbModal) { }

  ngOnInit(): void {
  }

}
