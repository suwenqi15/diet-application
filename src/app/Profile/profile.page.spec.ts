import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

<<<<<<< HEAD
<<<<<<< HEAD:src/app/Profile/profile.page.spec.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
<<<<<<< HEAD
=======
import { HomePage } from './home.page';

describe('HomePagee', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Home/home.page.spec.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
