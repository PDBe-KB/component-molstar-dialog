import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import * as appSettings from '../app.settings';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

declare var PDBeMolstarPlugin: any;

@Component({
  selector: 'app-molstar-dialog-dialog',
  templateUrl: './molstar-dialog.component.html',
  styleUrls: ['./molstar-dialog.component.css']
})
export class MolstarDialogComponent implements OnInit, OnDestroy {

  pdbeMolstar: any;

  constructor(public dialogRef: MatDialogRef<MolstarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
  }

  ngOnInit() {
    this.loadView();
  }

  loadView(isUpdate?: boolean) {
    let fullscreen = false;
    let horizontal = true;
    if (window.screen.width <= 480) {
      fullscreen = true;
      horizontal = false;
    }

    const dialogData = this.dialogData.entryList[this.dialogData.current];

    let initParams = {
      pdbeUrl: appSettings.pdbeUrl,
      loadMaps: true,
      validationAnnotation: true,
      domainAnnotation: true,
      expanded: fullscreen,
      landscape: horizontal,
      hideExpandIcon: true,
      subscribeEvents: false
    };

    initParams = this.settingParams(dialogData, initParams);

    if (isUpdate) {
      const updateParams = this.getUpdateParams(initParams);
      this.pdbeMolstar.visual.update(updateParams, true);
    } else {

      const ele = (<HTMLInputElement>document.getElementById('app'));
      if (ele) {
        this.pdbeMolstar = new PDBeMolstarPlugin();
        this.pdbeMolstar.render(ele, initParams);
      }
    }

    // set best chain color
    if (dialogData.chainId && dialogData.chainColor) {
      const _this = this;
      this.pdbeMolstar.events.loadComplete.subscribe(function (e) {
        var colorparam = dialogData.chainColor;
        var chainColor = {r: colorparam[0], g: colorparam[1], b: colorparam[2]};
        var defaultChainColor = {r: 231, g: 200, b: 200};
        if (typeof _this.pdbeMolstar.visual.select !== 'undefined') {
          _this.pdbeMolstar.visual.select({
            data: [{struct_asym_id: dialogData.chainId, color: chainColor}],
            nonSelectedColor: defaultChainColor
          });
        }
      });
    } else if (dialogData.entityId && dialogData.entityColor && !dialogData.ligandId) {
      const _this = this;
      this.pdbeMolstar.events.loadComplete.subscribe(function (e) {
        var colorparam = dialogData.entityColor;
        var chainColor = {r: colorparam[0], g: colorparam[1], b: colorparam[2]};
        var defaultChainColor = {r: 231, g: 200, b: 200};
        if (typeof _this.pdbeMolstar.visual.select !== 'undefined') {
          _this.pdbeMolstar.visual.select({
            data: [{entity_id: dialogData.entityId, color: chainColor}],
            nonSelectedColor: defaultChainColor
          });
        }
      });
    }

  }

  settingParams(dialogData, initParams): any {
    if (dialogData.superposition) {
      initParams.moleculeId = dialogData.accession;
      initParams.superposition = true;
      if (dialogData.superpositionParams){
        initParams.superpositionParams = dialogData.superpositionParams;
      }
    } else {
      initParams.moleculeId = dialogData.pdbId;
    }

    if (dialogData.assemblyId) {
      initParams.assemblyId = dialogData.assemblyId.toString();
    }

    if (dialogData.ligandId) {
      initParams.ligandView = {label_comp_id: dialogData.ligandId};
      initParams.selectInteraction = false;
      initParams.validationAnnotation = false;
      initParams.domainAnnotation = false;
    }
    return initParams;
  }

  getUpdateParams(initParams): any {
    const updateParams = {};
    if (initParams.moleculeId) { updateParams['moleculeId'] = initParams.moleculeId; }
    if (initParams.assemblyId) { updateParams['assemblyId'] = initParams.assemblyId; }
    if (initParams.ligandView) {
      updateParams['ligandView'] = initParams.ligandView;
      updateParams['selectInteraction'] = false;
      updateParams['validationAnnotation'] = false;
      updateParams['domainAnnotation'] = false;
    }
    return updateParams;
  }

  updateView(updatedIndex): void {
    this.dialogData.current = updatedIndex;
    this.loadView(true);
  }

  getLabel(index): string {
    const entryData = this.dialogData.entryList[index];
    let name = 'PDB ' + entryData.pdbId;
    if (entryData.chainId) {
      name += ' chain ' + entryData.chainId;
    }
    if (entryData.assemblyId && entryData.assemblyId != 'preferred') {
      name += ' assembly ' + entryData.assemblyId;
    }
    return name;
  }

  closeDialog(): void {
    this.dialogRef.close('Close');
  }

  ngOnDestroy(): void {
    // Destroy molstar instance
    if (this.pdbeMolstar && typeof this.pdbeMolstar.plugin !== 'undefined') {
      this.pdbeMolstar.plugin.clear();
    }
  }

}
