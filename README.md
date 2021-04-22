PDBe-KB Tutorial Component
=

[![Build Status](https://www.travis-ci.com/PDBe-KB/component-molstar-dialog.svg?branch=main)](https://www.travis-ci.com/PDBe-KB/component-molstar-dialog)
[![codecov](https://codecov.io/gh/PDBe-KB/component-molstar-dialog/branch/main/graph/badge.svg?token=Ubb4PgcHgO)](https://codecov.io/gh/PDBe-KB/component-molstar-dialog)
[![Maintainability](https://api.codeclimate.com/v1/badges/88bafadec619cc30cf10/maintainability)](https://codeclimate.com/github/PDBe-KB/component-molstar-dialog/maintainability)

This repository is for the codebase of a lightweight Angular v7 web component that provides a wrapper for the 3D molecular viewer, Mol*.

This component is used on the PDBe-KB Aggregated Views of Proteins and on the Aggregated Views of Ligands to provide an interactive view of molecules.

### Example:

<img src="https://raw.githubusercontent.com/PDBe-KB/component-molstar-dialog/main/pdbe-kb-molstar-dialog.png">

## Quick Start

Get the code and install dependencies
```
git clone https://github.com/PDBe-KB/component-molstar-dialog.git
cd component-molstar-dialog
npm i
```

Running the app
```
ng serve
```

Running tests
```
ng test
```

## Dependencies

The main template (i.e. `index.html` by default) should also have the following CSS imports:
```angular2html
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Icon-fonts/v1.3/fonts.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/theme-pdbe-green.css" type="text/css" media="all"/>
```

You also need to include the Mol* import in the main template (i.e. `index.html` by default):
```angular2html
<link rel="stylesheet" type="text/css" href="https://www.ebi.ac.uk/pdbe/pdb-component-library/css/pdbe-molstar-1.1.0.css">
<script type="text/javascript" src="https://www.ebi.ac.uk/pdbe/pdb-component-library/js/pdbe-molstar-plugin-1.1.0.js"></script>
```

## Basic usage

The component can be added to any Angular v7 apps.

#### 1.) Import the component:

Import the component in `app.module.ts` by default.
```
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MolstarDialogComponent } from './molstar-dialog/molstar-dialog.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MolstarDialogComponent
  ],
  entryComponents: [
    MolstarDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2.) Add the component to a template:
```angular2html
<span *ngIf="entryData">
  <a (click)="openMolstarDialog()" style="border-bottom-style: none;">
    Click to View in 3D
  </a>
</span>
```

##### Example input data

```angular2html
this.entryData = {
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
  }
```
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/PDBe-KB/component-molstar-dialog/tags).

## Authors

* **Mandar Deshpande** - *Initial Implementation* - [mandarsd](https://github.com/mandarsd)
* **Mihaly Varadi** - *Migrating to GitHub* - [mvaradi](https://github.com/mvaradi)

See also the list of [contributors](https://github.com/PDBe-KB/component-molstar-dialog/contributors) who participated in this project.

## License

This project is licensed under the EMBL-EBI License - see the [LICENSE](LICENSE) file for details

## Acknowledgements

We would like to thank the [PDBe team](https://www.pdbe.org) and the [PDBe-KB partner resources](https://github.com/PDBe-KB/pdbe-kb-manual/wiki/PDBe-KB-Annotations) for their feedback and contributions.
