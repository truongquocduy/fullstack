import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from '../guard/profile.guard';
import { LayoutComponent } from './layout/layout.component';
import { BlogdetailComponent } from './pages/blogdetail/blogdetail.component';
import { BlogpageComponent } from './pages/blogpage/blogpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProcessfullstackComponent } from './pages/processfullstack/processfullstack.component';
import { ProcesspageComponent } from './pages/processpage/processpage.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudyingComponent } from './pages/studying/studying.component';
import { StudyingdetailComponent } from './pages/studyingdetail/studyingdetail.component';
import { StudypageComponent } from './pages/studypage/studypage.component';

const routes: Routes = [
  {
    path: "guest",
    component: LayoutComponent,
    children:[
      {
        path:"",
        redirectTo:"homepage",
        pathMatch:"full"
      },
      {
        path:"homepage",
        component:HomepageComponent
      },
      {
        path:"processpage",
        component:ProcesspageComponent
      },
      {
        path:"processpage/fullstack",
        component:ProcessfullstackComponent,
        canActivate:[ProfileGuard]

      }
      ,
      
      {
        path:"studypage",
        component:StudypageComponent
      },
      {
        path:"studydetail/:id",
        component:StudyingdetailComponent
      },
      {
        path:"blogpage",
        component:BlogpageComponent
      },
      {
        path:"blogpage/:id",
        component:BlogdetailComponent
      },
      {
        path:"profile",
        component:ProfileComponent,
        canActivate:[ProfileGuard]
      }
      ,
      {
        path:"login",
        component:LoginComponent,
      },
      {
        path:"studying/:makh",
        component:StudyingComponent,
      }
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
