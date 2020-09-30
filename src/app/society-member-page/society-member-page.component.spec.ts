import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyMemberPageComponent } from './society-member-page.component';

describe('SocietyMemberPageComponent', () => {
  let component: SocietyMemberPageComponent;
  let fixture: ComponentFixture<SocietyMemberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyMemberPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
