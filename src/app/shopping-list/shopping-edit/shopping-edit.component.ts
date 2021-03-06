import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm : NgForm; 
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) =>{
        this.editedItemIndex=index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{
      this.shoppingListService.onIngredientAdded(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
