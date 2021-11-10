import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.scss']
})
export class CustomUploadComponent implements OnInit {
  @Input()
  placeholder = 'Add an image';
  public imagePath;
  @Input()
  imgURL: any;
  @Input()resdata: any;
  @Input()imageUrl: any;
  @Input()imageId: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() { }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imagePath = files;
    const reader = new FileReader();
    // initialize preloaded image data
    this.imageUrl = '';
    this.imageId = '';
    //
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imageUpload(this.imgURL);
    };
  }
  // upload image file
  imageUpload(e) {
    const imgaedata = new FormData();
    imgaedata.append('file', e);
    imgaedata.append('upload_preset', 'vkhstuor');
    const imgapiurl = 'https://api.cloudinary.com/v1_1/itsmytown/image/upload';
    this.http.post(imgapiurl, imgaedata)
    .subscribe(res => {
      console.log(res);
      this.sendimgdata(res);
    });
  }
  sendimgdata(e){
    this.imageId = e.public_id;
    this.imageUrl = e.url;
  }
}
