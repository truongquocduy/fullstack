import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studying } from '../model/studying.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudyingService  extends BaseService{
  constructor(httpClient: HttpClient){
    super(httpClient)
  }
  getAllStudying(massv:String){
    return this.get('/studyings?massv=' + massv)
  }
  getAll(){
    return this.get('/studyings')
  }
  setStudying(new_studying:Studying){
    return this.post('/studyings',new_studying)
  }
  updateStudying(id:number,sobai:number){
    return this.update('/studyings/' + id,{sobaidahoc:sobai})
  }
  OpenExam(id:number,lanthi:any){
    if(lanthi==1){
      return this.update('/studyings/' + id,{thi1_trangthai:true})
    }
    else{
      return this.update('/studyings/' + id,{thi2_trangthai:true})
    }
  }
  OffExam(id:number,lanthi:number){
    if(lanthi==1){
      return this.update('/studyings/' + id,{thi1_trangthai:false})
    }
    else{
      return this.update('/studyings/' + id,{thi2_trangthai:false})
    }
  }
  Nopbai(id:number,lanthi:number,diemso:number){
      if(lanthi == 1){
        return this.update('/studyings/' + id,{thi1:diemso,thi1_trangthai:false})
      }
      else{
        return this.update('/studyings/' + id,{thi2:diemso,thi2_trangthai:false})
      }
  }
}
