import { Recipe } from './recipe-.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] =[
        new Recipe('Dal Makhani',
        'Tasty punjabi meal!!!', 
        'https://www.cookwithmanali.com/wp-content/uploads/2015/01/Best-Dal-Makhani-Recipe.jpg',
        [
            new Ingredient('Butter', 50),
            new Ingredient('Onion', 2)
        ]),
        new Recipe("Poha",
        "Maharashtrian Breakfast",
        "https://somethingscookingwithalpa.com/wp-content/uploads/2017/02/0087_KandaPoha_WEB.jpg",
        [
            new Ingredient('Peanut', 15),
            new Ingredient('Flattened Rice', 250)
        ]),
      ];

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}