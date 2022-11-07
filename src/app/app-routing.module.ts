import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RouterGuardService } from './services/router-guard.service';
import { ViewBillComponent } from './view-bill/view-bill.component';

const routes: Routes = [{path: '', component: HomeComponent},

  {path: 'cafe/dashboard', component: DashboardComponent,
  children: [{
    path: '', redirectTo: '/cafe/dashboard/cards', pathMatch: 'full'
  },{
    path: 'cards', component: CardsComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']

    }
  }
  ,
  {
    path: 'category', component: ManageCategoryComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin']

    }
  },
  {
    path: 'product', component: ManageProductComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin']

    }
  },
  {
    path: 'order', component: ManageOrderComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin','user']

    }
  },
  {
    path: 'bill', component: ViewBillComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin']

    }
  },
  {
    path: 'users', component: ManageUsersComponent, canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin']

    }
  }




]
  },
  { path: '**',redirectTo:'', component: HomeComponent }

]


















/*
{
  path: 'cafe',
  component: FullComponent,
  children: [
    {
      path: '',
      redirectTo: '/cafe/dashboard',
      pathMatch: 'full',
    },
    {
      path: '',
      loadChildren:
        () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivate:[RouterGuardService],
        data:{
          expectedRole:['admin','user']
        }
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate:[RouterGuardService],
        data:{
          expectedRole:['admin','user']
        }
    }
  ]
},
{ path: '**',redirectTo:'', component: HomeComponent }
*/


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
