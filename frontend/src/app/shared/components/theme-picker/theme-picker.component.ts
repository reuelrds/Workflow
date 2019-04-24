import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Renderer2,
  Renderer,
} from '@angular/core';
import {ThemeStorage, DocsSiteTheme} from './theme-storage';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Subscription, BehaviorSubject} from 'rxjs';
import {map, filter} from 'rxjs/operators';


@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private queryParamSubscription = Subscription.EMPTY;
  currentTheme: DocsSiteTheme;

  @Output() themeType = new EventEmitter();

  themes: DocsSiteTheme[] = [
    {
      primary: '#0097A7',
      accent: '#80CBC4',
      name: 'cyan-teal',
      isDark: false,
      isDefault: false
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      name: 'pink-bluegrey',
      isDark: true,
      isDefault: true
    }
  ];

  // isThemeDark = new BehaviorSubject(false);

  constructor(
    private themeStorage: ThemeStorage,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer
  ) {
    this.installTheme(this.themeStorage.getStoredThemeName());
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParamMap
      .pipe(map(params => params.get('theme')), filter(Boolean))
      .subscribe(themeName => this.installTheme(themeName));
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  installTheme(themeName: string) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDark) {
      // this.styleManager.removeStyle('theme');
      this.renderer.setElementClass(document.body, 'dark-theme', true);
    } else {
      // this.styleManager.setStyle('theme', `assets/custom-themes/${theme.name}.scss`);
      this.renderer.setElementClass(document.body, 'dark-theme', false);
    }
    console.log(theme);
    this.themeType.emit(theme.isDark);

    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

}

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    CommonModule
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [ThemeStorage],
})
export class ThemePickerModule { }
