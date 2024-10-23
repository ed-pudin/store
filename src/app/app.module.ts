import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    CartComponent
  ],
  imports: [
    //Modulos para toda la aplicacion
    /**
     * Un Módulo Angular agrupa un conjunto de artefactos Angular, como son componentes, directivas, pipes y servicios
     * que forman parte de ese mismo módulo. Dicho esto, representa una agrupación lógica en lo que podríamos llamar área funcional de nuestra aplicación
     * (ej. módulo de contactos, módulo de administración,…).
     */
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
