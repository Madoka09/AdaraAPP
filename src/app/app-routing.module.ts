import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'routines', loadChildren: './pages/routines/routines.module#RoutinesPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'meals', loadChildren: './pages/meals/meals.module#MealsPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'form', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'progress', loadChildren: './pages/progress/progress.module#ProgressPageModule' },
  { path: 'progress-img', loadChildren: './pages/progress-img/progress-img.module#ProgressImgPageModule' },
  { path: 'exercise-modal', loadChildren: './pages/exercise-modal/exercise-modal.module#ExerciseModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
