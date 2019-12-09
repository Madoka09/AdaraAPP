import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipes-modal',
  templateUrl: './recipes-modal.page.html',
  styleUrls: ['./recipes-modal.page.scss'],
})
export class RecipesModalPage implements OnInit {

  recipe: any;
  procIngredients: any;
  cleanIngredients: any = [];
  formattedProcedure: any = [];
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    console.log(this.recipe);
    this.splitIngredients();
  }

  close() {
    this.modalController.dismiss();
  }

  splitIngredients() {
    // Buscar saltos de linea
    this.procIngredients = this.recipe.ingredients.split(/\r\n|\r|\n/);

    // Eliminar valores nulos
    for (let i = 1; i <= (this.procIngredients.length - 3); i++) {
      if (this.procIngredients[i] !== '') {
        this.cleanIngredients.push(this.procIngredients[i]);
      }
    }

    // Separar parrafos por punto
    this.formattedProcedure = this.recipe.procedure.split('.');
    console.log(this.formattedProcedure);
    console.log(this.cleanIngredients);
  }

}
