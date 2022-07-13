import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamComponent } from './pages/exam/exam.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { NewpostComponent } from './pages/newpost/newpost.component';
import { PostComponent } from './pages/post/post.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  {
    path: "admin",
    component: LayoutComponent,
    canActivateChild: [AdminGuard],
    children:[
      {
        path:"",
        redirectTo:"dashboard",
        pathMatch: "full"
      },
      {
        path:"dashboard",
        component:DashboardComponent

      },
      {
        path:"student",
        component:StudentComponent
      },
      {
        path:"exam",
        component:ExamComponent
      },
      {
        path:"post",
        component:PostComponent
      },
      {
        path:"newpost",
        component:NewpostComponent
      }
      
    ]
  },
  {
    path: "admin/login",
    component: LoginAdminComponent
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
