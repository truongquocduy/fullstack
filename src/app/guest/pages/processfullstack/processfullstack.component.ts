import { Component, OnInit } from '@angular/core';
import { Studying } from 'src/app/model/studying.model';
import { StudyingService } from 'src/app/services/studying.service';

@Component({
  selector: 'app-processfullstack',
  templateUrl: './processfullstack.component.html',
  styleUrls: ['./processfullstack.component.scss']
})
export class ProcessfullstackComponent implements OnInit {
  listStudying:Studying [] = []
  constructor(private StudyingService:StudyingService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData(){ 
    let massv = JSON.parse(localStorage.getItem("mssv")||"")
    this.StudyingService.getAllStudying(massv).then((res:any)=>{
      this.listStudying = res
    })
  }

}
