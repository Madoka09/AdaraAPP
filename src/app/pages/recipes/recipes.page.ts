import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallApiService } from '../../services/call-api.service';
import { RecipesModalPage } from '../recipes-modal/recipes-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  // Informacion del usuario
  userData: any;
  recipesData: any;

  constructor(private activatedRoute: ActivatedRoute, private callApi: CallApiService, private modalController: ModalController) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = res;
    });
   }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.callApi.getRecipes(this.userData.id).subscribe(data => {
      this.recipesData = data;
      console.log(this.recipesData);
    }, err => {
      console.log(err);
    });
  }

  showReModal(recipe) {
    this.modalController.create({
      component: RecipesModalPage,
      componentProps: {
        recipe
      }
    }).then(modal => {
      modal.present();
    });
  }

}
