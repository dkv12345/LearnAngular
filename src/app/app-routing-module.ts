import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { Contact } from './contact/contact';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProductComponent27 } from './fake-product-component-27/fake-product-component-27';
import { BooksComponent } from './books-component/books-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';

const routes: Routes = [
  // Chapter 2
  { path: 'binding-property', component: BindingPropertyComponent },
  { path: 'binding-class', component: BindingClassComponent },
  { path: 'binding-style', component: BindingStyleComponent },
  { path: 'binding-event', component: BindingEventComponent },
  { path: 'binding-two-way', component: BindingTwoWayComponent },
  { path: 'product-list', component: ProductListComponent },

  // Chapter 3 (Services)
  { path: 'product-dropdown-list', component: ProductDropdownListComponent },
  { path: 'product-list-call-service', component: ProductListCallServiceComponent },
  { path: 'product-list-call-http-service', component: ProductListCallHttpServiceComponent },
  { path: 'product-http-handle-error-service', component: ProductHttpHandleErrorServiceComponent },

  // Chapter 4 (Routing)
  { path: 'contacts', component: Contact },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListAdvancedComponent },
  { path: 'searchproduct', component: ProductListSearchComponent },

  {path:'',component:Contact},
  {
    path: 'samplenested',
    component: ProductListAdvancedComponent,
    children: [
      { path: 'search', component: ProductListSearchComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
    ],
  },
  {
    path: 'lazyinfo',
    loadComponent: () =>
      import('./lazy-component/lazy-component').then((c) => c.LazyComponent),
    canActivate: [authGuard],
  },

  // Chapter 5 (Forms)
  { path: 'course-registration', component: CourseRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'course-registration-reactive', component: CourseRegistrationReactiveComponent },

  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Chapter 6
  { path: 'fakeproducts', component: FakeProductComponent, pathMatch: 'full' },
  { path: 'fakeproducts_27', component: FakeProductComponent27, pathMatch: 'full' }, // component là tên class trong file fake-product-component-27.ts
  { path: 'book-list', component: BooksComponent},
  { path: 'fashion-list', component: FashionComponent},
  { path: 'fashions', component: FashionComponent},
  { path: 'fashion-detail/:slug', component: FashionDetailComponent},
  { path: 'fashion/:slug', component: FashionDetailComponent},
  { path: 'fashions/:slug', component: FashionDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
