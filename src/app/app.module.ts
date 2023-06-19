import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactComponent } from './contact/contact.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { ScrollDownIndicatorComponent } from './scroll-down-indicator/scroll-down-indicator.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PreloaderComponent } from './preloader/preloader.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { FormsModule } from '@angular/forms';
import { LoadingImageComponent } from './loading-image/loading-image.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RubiksCubeComponent } from './rubiks-cube/rubiks-cube.component';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SearchComponent } from './search/search.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import { FlexLayoutModule } from '@angular/flex-layout';

export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http, './portfolio-payet-benjamin/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ArticlesComponent,
    ContactComponent,
    TestimonialsComponent,
    ProjectsComponent,
    SkillsComponent,
    CtaComponent,
    FooterComponent,
    BackToTopComponent,
    ScrollDownIndicatorComponent,
    PreloaderComponent,
    ReadingProgressBarComponent,
    LoadingImageComponent,
    RubiksCubeComponent,
    PopUpMenuComponent,
    SlideshowComponent,
    SearchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        NgxPageScrollModule,
        MatProgressBarModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        MatSidenavModule,
        MatMenuModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
