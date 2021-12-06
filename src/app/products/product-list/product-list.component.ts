import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductService) {

  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
