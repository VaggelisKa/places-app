import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  @ViewChild('filePicker') filePicker: ElementRef<HTMLInputElement>;

  selectedImage: string;
  useFilePicker = false;

  constructor(private _platform: Platform) { }

  ngOnInit() {
    if ((this._platform.is('mobile') && this._platform.is('hybrid')) || this._platform.is('desktop')) {
      this.useFilePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera') || this.useFilePicker) {
      this.filePicker.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600
    }).then(result => {
      this.selectedImage = result.dataUrl;
      this.imagePick.emit(this.selectedImage);
    })
      .catch();
  }

  onFileChosen(data: Event) {
    console.log(data);
  }

}
