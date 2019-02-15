import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRenderComponent } from './main-render.component';

describe('MainRenderComponent', () => {
  let component: MainRenderComponent;
  let fixture: ComponentFixture<MainRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
