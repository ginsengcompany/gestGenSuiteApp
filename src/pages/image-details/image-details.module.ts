import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageDetailsPage } from './image-details';

@NgModule({
  declarations: [
    ImageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageDetailsPage),
  ],
})
export class ImageDetailsPageModule {}
