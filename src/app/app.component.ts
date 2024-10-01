import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'grocery';

  selectedFooditemList: any[] = [];
  cartObj: any = {
    itemName: '',
    cost: null,
    quantity: null
  };
  totalCost: number = 0;

  onAddItem() {
    if (this.cartObj.itemName && this.cartObj.cost && this.cartObj.quantity) {
     
      const existingItem = this.selectedFooditemList.find(item => item.itemName === this.cartObj.itemName);
      if (existingItem) {
        existingItem.quantity += Number(this.cartObj.quantity);
      } else {
      
        const newItem = { ...this.cartObj };
        this.selectedFooditemList.push(newItem);
      }

      this.cartObj = { itemName: '', cost: '', quantity: ''};
      
      
      this.calculateTotal();
    }
  }
  onRemoveItem(itemName: string) {
    const itemIndex = this.selectedFooditemList.findIndex(item => item.itemName === itemName);
    
    if (itemIndex !== -1) {
      const selectedItem = this.selectedFooditemList[itemIndex];
  
    
      selectedItem.quantity -= 1;
  
     
      if (selectedItem.quantity <= 0) {
        this.selectedFooditemList.splice(itemIndex, 1);
      }
  
   
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalCost = this.selectedFooditemList.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
  }
}
