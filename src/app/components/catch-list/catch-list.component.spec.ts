import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchListComponent } from './catch-list.component';

describe('CatchListComponent', () => {
  let component: CatchListComponent;
  let fixture: ComponentFixture<CatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
