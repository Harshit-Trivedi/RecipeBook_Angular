import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe :Recipe;
  id : number;

  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  toShoppingList(){
    this.recipe.ingredient.map((ingredientData : Ingredient)=>{
      // this.recipe.ingredient.push(ingredientData)
      this.shoppingListService.onIngredientAdded(ingredientData);
    })
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id),
    this.router.navigate(['/recipes']);
  }
}
