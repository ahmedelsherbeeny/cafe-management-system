import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, AfterViewInit,  ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
	data:any
isOpen=true

 
 mediasub!:Subscription
 devicexs:any


	constructor(private dashser:DashboardServiceService,private mediaObserver:MediaObserver) {
		
	}
	ngOnInit(): void {
		this.mediasub=this.mediaObserver.media$.subscribe((result:MediaChange)=>{
			console.log(result.mqAlias)
			this.devicexs=result.mqAlias==='xs'?true:false

	  
		  })
			}

	
	 
			ngOnDestroy(): void {
				this.mediasub.unsubscribe()
			  }
			  toggleit(){
				this.isOpen=!this.isOpen
		
			}
	  
	}
	
	
	
		

