import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
  { path: 'recipes', loadChildren: './pages/recipes/recipes.module#RecipesPageModule' },
  { path: 'recipes-modal', loadChildren: './pages/recipes-modal/recipes-modal.module#RecipesModalPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
