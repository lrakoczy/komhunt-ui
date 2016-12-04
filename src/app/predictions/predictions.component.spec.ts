import { TestBed } from '@angular/core/testing';

import { PredictionsComponent } from './predictions.component';

describe('Predictions Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [PredictionsComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(PredictionsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
  });

});
