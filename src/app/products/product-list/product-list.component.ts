import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  constructor(
    private productService: ProductService,
    private router: Router) {

  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   );
  }
}