import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MolstarDialogComponent } from './molstar-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

// import * as PDBeMolstarPlugin from '../../assets/pdbe-molstar-plugin-1.1.0.js';

declare var PDBeMolstarPlugin: any;

PDBeMolstarPlugin = class {
  events: any;

  constructor() {
    this.events = {
      loadComplete: {
        subscribe: () => { return; }
      }
    };
  }

  render(): void {
    return;
  }

};

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
    // component.loadView = () => { return; };
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.loadView = () => { return; };
    expect(component).toBeTruthy();
  });

  it('getLabel() should work', () => {
    component.loadView = () => { return; };
    component.dialogData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: 'preferred',
          entityColor: [50, 130, 255]
        },
        {
          pdbId: '1cbs',
          assemblyId: 'preferred',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    expect(component.getLabel(0)).toEqual('PDB 2a06');
  });

  it('getLabel() should work with chain id', () => {
    component.loadView = () => { return; };
    component.dialogData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: 'preferred',
          entityColor: [50, 130, 255],
          chainId: 'A'
        },
        {
          pdbId: '1cbs',
          assemblyId: 'preferred',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    expect(component.getLabel(0)).toEqual('PDB 2a06 chain A');
  });

  it('getUpdateParams() should return updated parameters', () => {
    const initParams = {
      moleculeId: 'foo',
      assemblyId: 'bar',
      ligandView: true
    };
    const expected = {
      moleculeId: 'foo',
      assemblyId: 'bar',
      ligandView: true,
      selectInteraction: false,
      validationAnnotation: false,
      domainAnnotation: false
    };
    expect(component.getUpdateParams(initParams)).toEqual(expected);
  });

  it('settingParams() should set the parameters', () => {
    const dialogData = {
          pdbId: '2a06',
          accession: 'P12345',
          assemblyId: '1',
          entityColor: [50, 130, 255]
    };
    const initParams = {};
    const expected = {
      moleculeId: '2a06',
      assemblyId: '1'
    };
    expect(component.settingParams(dialogData, initParams)).toEqual(expected);
  });

  it('settingParams() should set the parameters with superposition', () => {
    const dialogData = {
      pdbId: '2a06',
      accession: 'P12345',
      superposition: true,
      assemblyId: '1',
      entityColor: [50, 130, 255]
    };
    const initParams = {};
    const expected = {
      moleculeId: 'P12345',
      assemblyId: '1',
      superposition: true
    };
    expect(component.settingParams(dialogData, initParams)).toEqual(expected);
  });

  it('settingParams() should set the parameters with ligands', () => {
    const dialogData = {
      pdbId: '2a06',
      ligandId: '1FOO',
      assemblyId: '1',
      entityColor: [50, 130, 255]
    };
    const initParams = {};
    const expected = {
      moleculeId: '2a06',
      assemblyId: '1',
      ligandView: {
        label_comp_id: '1FOO'
      },
      selectInteraction: false,
      validationAnnotation: false,
      domainAnnotation: false
    };
    expect(component.settingParams(dialogData, initParams)).toEqual(expected);
  });

  it('getLabel() should work with assembly id', () => {
    component.loadView = () => { return; };
    component.dialogData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        },
        {
          pdbId: '1cbs',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    expect(component.getLabel(0)).toEqual('PDB 2a06 assembly 1');
  });

  it('updateView() should set current value', () => {
    component.loadView = () => { return; };
    component.dialogData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        },
        {
          pdbId: '1cbs',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    component.updateView(1);
    expect(component.dialogData.current).toEqual(1);
  });

  it('loadView() should work', () => {
    component.dialogData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        },
        {
          pdbId: '1cbs',
          assemblyId: '1',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    expect(component.loadView()).toBeFalsy();
  });

});

