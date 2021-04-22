import {Component} from '@angular/core';
import {MolstarDialogComponent} from './molstar-dialog/molstar-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  entryData: any;

  constructor(public dialog: MatDialog) {
    this.entryData = {
      entryList: [
        {
          pdbId: '2a06',
          assemblyId: 'preferred',
          entityColor: [50, 130, 255],
          ligandId: 'JZR'
        }
      ],
      current: 0
    };
  }

  openMolstarDialog(): any {

    this.dialog.open(MolstarDialogComponent,
      {
        disableClose: false,
        panelClass: 'molstarDialog',
        data: this.entryData
      }
    );

    return this.entryData;
  }
}
