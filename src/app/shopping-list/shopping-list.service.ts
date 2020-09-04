import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
    private ingredients :Ingredient[] = [
        new Ingredient('Urad Dal', 250),
        new Ingredient('Rajma', 50),
      ];

    // ingredientAdded = new EventEmitter<Ingredient>();

    onIngredientAdded(ingredient:Ingredient){
            this.ingredients.push(ingredient);
      }

    getIngredient(index: number){
      return this.ingredients[index];
    }
      
    getIngredients(){
        return this.ingredients
    }

    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}