import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { ProductoModule } from '@producto/producto.module';
import { PersonaModule } from '@persona/persona.module';
import { PrestamoModule } from '@prestamo/prestamo.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrmComponent } from './feature/trm/component/trm/trm.component';
import { TrmService } from './feature/trm/service/trm.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductoModule,
    PersonaModule,
    PrestamoModule,
    CoreModule,
    NgbModule
  ],
  providers: [TrmService, CookieService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
