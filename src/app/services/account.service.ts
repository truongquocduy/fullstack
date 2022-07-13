import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService{
  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  getAllAccount(){
    return this.get('/accounts')
  }

  getAllUser(){
    return this.get('/users')

  }
  createAccount(id:String,password:String,date:any=new Date()){
    return this.post('/accounts',{id,password,date})
  }
  createUser(User:User){
    return this.post('/users',User)
  }
  deleteAccount(id:String){
    return this.delete('/accounts/' + id)

  }
  deleteUser(id:String){
    return this.delete('/users/' + id)

  }
  updateUser(id:String,User:User){
    return this.update('/users/' + id,User)
  }
  updateAccount(id:String,password:String){
    return this.update('/accounts/' + id,{password})
  }
  updateDiemTBUser(id:String,diemtb:number){
    return this.update('/users/' + id,{diemtb})
  }
}
