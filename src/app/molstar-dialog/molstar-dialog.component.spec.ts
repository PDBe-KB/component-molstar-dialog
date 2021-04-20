import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MolstarDialogComponent } from './molstar-dialog.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

declare var PDBeMolstarPlugin: any;

describe('MolstarDialogComponent', () => {
  let component: MolstarDialogComponent;
  let fixture: ComponentFixture<MolstarDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MolstarDialogComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
              current: 0,
              entryList: [{
                chainColor: [50, 130, 255],
                chainId: 'A',
                pdbId: '2etx',
                assemblyId: 1
              }]
            }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MolstarDialogComponent);
    component = fixture.componentInstance;
    component.loadView = function(){return;};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
