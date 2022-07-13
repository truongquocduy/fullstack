import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';
import { FormsModule } from '@angular/forms';
import { ExamComponent } from './pages/exam/exam.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PostComponent } from './pages/post/post.component';
import { NewpostComponent } from './pages/newpost/newpost.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    StudentComponent,
    ExamComponent,
    PostComponent,
    NewpostComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    CKEditorModule
  ]
})
export class AdminModule { }
