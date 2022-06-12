import { Injectable } from "@angular/core"

export interface menu{
    state:string,
    name:string,
    icon:string,
    role:string
}
const MENUITEMS=[
    {state:'cards',name:'Dashboard',icon:'dashboard',role:''},
    {state:'category',name:'Manage Category',icon:'category',role:'admin'},
    {state:'product',name:'Manage Product',icon:'inventory_2',role:'admin'},
    {state:'order',name:'Manage Order',icon:'list_alt',role:''},
    {state:'bill',name:'View Bill',icon:'import_contacts',role:'admin'},
    {state:'users',name:'View Users',icon:'people',role:'admin'},


    

]
@Injectable()
export class menuitems{
    getMenuItem():menu[]{
        return MENUITEMS
    }
}