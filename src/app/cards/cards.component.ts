import { Component, OnInit } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  data:any


	constructor(private dashser:DashboardServiceService) {
		
	}
	ngOnInit(): void {
		this.getTheDetails()
  	}

	getTheDetails(){
		this.dashser.getDetails().subscribe((response:any)=>{
			this.data=response
			console.log(response)

		})
	}

}
