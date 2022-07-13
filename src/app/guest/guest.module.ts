import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProcesspageComponent } from './pages/processpage/processpage.component';
import { StudypageComponent } from './pages/studypage/studypage.component';
import { BlogpageComponent } from './pages/blogpage/blogpage.component';
import { StudyingdetailComponent } from './pages/studyingdetail/studyingdetail.component';
import { BlogdetailComponent } from './pages/blogdetail/blogdetail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { StudyingComponent } from './pages/studying/studying.component';
import { ProcessfullstackComponent } from './pages/processfullstack/processfullstack.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomepageComponent,
    ProcesspageComponent,
    StudypageComponent,
    BlogpageComponent,
    StudyingdetailComponent,
    BlogdetailComponent,
    ProfileComponent,
    LoginComponent,
    StudyingComponent,
    ProcessfullstackComponent,
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    FormsModule
  ]
})
export class GuestModule { }
