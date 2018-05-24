import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  global = {
    alias: 'global',
    id: 1,
    trainersPerPage: 10,
    reportGrads: 22,
    batchLength: 10,
    reportIncomingGrads: 26,
    minBatchSize: 10,
    maxBatchSize: 20,
    trainerBreakDays: 14,
    defaultLocation: null,
    defaultBuilding: null,
    defaultNamePattern: '$y$m $mmm$d $c'
  };

  activeSettings = Object.assign({}, this.global);

  locations;
  selectItemLocations: SelectItem[];
  selectedLocation: number;

  buildings;
  selectItemBuildings: SelectItem[];

  settingsForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.locations = [
      { name: 'Reston', id: 1 },
      { name: 'USF', id: 2 },
      { name: 'NYC', id: 3 },
      { name: 'Dallas', id: 4 }
    ];

    this.buildings = [
      { name: 'HQ', id: 1, locId: 1 },
      { name: 'Bunker', id: 2, locId: 2 },
      { name: 'Java Hall', id: 3, locId: 2 },
      { name: 'SPS', id: 4, locId: 3 },
      { name: 'Queens', id: 5, locId: 3 },
      { name: 'Arlington', id: 6, locId: 4 }
    ];

    this.selectItemLocations = this.locations.map(location =>
      Object.assign({}, { label: location.name, value: location.id })
    );

    this.settingsForm = this._fb.group({
      id: [''],
      alias: [''],
      trainersPerPage: ['', [Validators.required]],
      trainerBreakDays: [''],
      minBatchSize: [''],
      maxBatchSize: [''],
      reportGrads: [''],
      reportIncomingGrads: [''],
      batchLength: [''],
      defaultLocation: [''],
      defaultBuilding: [''],
      defaultNamePattern: [{ value: '', disabled: true }]
    });

    this.settingsForm.controls['id'].setValue(this.activeSettings.id);

    this.settingsForm.controls['alias'].setValue(this.activeSettings.alias);

    this.settingsForm.controls['trainersPerPage'].setValue(
      this.activeSettings.trainersPerPage
    );
    this.settingsForm.controls['trainerBreakDays'].setValue(
      this.activeSettings.trainerBreakDays
    );
    this.settingsForm.controls['minBatchSize'].setValue(
      this.activeSettings.minBatchSize
    );
    this.settingsForm.controls['maxBatchSize'].setValue(
      this.activeSettings.maxBatchSize
    );
    this.settingsForm.controls['reportGrads'].setValue(
      this.activeSettings.reportGrads
    );
    this.settingsForm.controls['reportIncomingGrads'].setValue(
      this.activeSettings.reportIncomingGrads
    );
    this.settingsForm.controls['batchLength'].setValue(
      this.activeSettings.batchLength
    );
    this.settingsForm.controls['defaultLocation'].setValue(
      this.activeSettings.defaultLocation
    );
    this.settingsForm.controls['defaultBuilding'].setValue(
      this.activeSettings.defaultBuilding
    );
    this.settingsForm.controls['defaultNamePattern'].setValue(
      this.activeSettings.defaultNamePattern
    );

    this.settingsForm.valueChanges.subscribe(data => {
      if (
        data.defaultLocation &&
        this.selectedLocation !== data.defaultLocation
      ) {
        this.selectedLocation = data.defaultLocation;
        this.selectItemBuildings = this.buildings
          .filter(building => building.locId === this.selectedLocation)
          .map(building =>
            Object.assign({}, { label: building.name, value: building.id })
          );
      }
    });
  }

  saveSettings(settings, isValid) {
    if (!isValid) {
      return;
    } else {
      this.activeSettings = Object.assign({}, settings);
    }
  }

  resetForm() {
    this.activeSettings = Object.assign({}, this.global);
    this.settingsForm.setValue(this.activeSettings);
  }
}
