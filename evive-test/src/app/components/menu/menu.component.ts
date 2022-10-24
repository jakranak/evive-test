import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
  }

  private _order: string = '';
  public isOrdered: boolean = false;
  public orderFormatted: string = '';

  public orderInput(event: any) {
    this._order = event.target.value;
  }

  public handleSubmit() {
    this.isOrdered = true;
    this.orderFormatted = this._orderService.handleOrder(this._order);
  }
}
