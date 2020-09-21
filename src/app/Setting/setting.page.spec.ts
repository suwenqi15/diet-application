import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SettingPage } from './setting.page';

describe('Tab1Page', () => {
  let component: SettingPage;
  let fixture: ComponentFixture<SettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
