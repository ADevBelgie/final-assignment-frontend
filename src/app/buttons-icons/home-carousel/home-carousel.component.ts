import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  /* these are the images that are loaded on the page */
  public loadedImages:string[]=[
    "",
    "",
    "",
  ]
  public startLoadedImages:number = 0
  public carouselItems:string[] =[
    "./assets/tennis-field-clay.jpeg",
    "./assets/sport-outside-road.jpeg",
    "./assets/camping-outside.jpeg",
    "./assets/treadmills.png",
    "./assets/sport-shoes.png",
    "./assets/yogo-mat.png",
    "./assets/roller-banner.png",
    "./assets/travel-bag.png"
  ]
  public selectedItem:number = 0
  buttonClickable: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loadedImages = this.carouselItems.slice(this.startLoadedImages,this.startLoadedImages+3)
  }
  right(){
    if (this.buttonClickable) {
      this.buttonClickable = false;
      // calculate left most image
      let leftMostImage = this.startLoadedImages
      if (this.carouselItems.length > this.startLoadedImages+1) {
        this.startLoadedImages++
      }
      else{
        this.startLoadedImages = 0
      }
      // rotate loadedImages[] to right and fill empty space with items from carouselItems[]
      this.loadedImages[0] = this.carouselItems[this.startLoadedImages]

      let centerImage = (this.startLoadedImages + 1) % this.carouselItems.length;
      this.loadedImages[1] = this.carouselItems[centerImage]

      let rightImage = (this.startLoadedImages + 2) % this.carouselItems.length
      this.loadedImages[2] = this.carouselItems[rightImage]

      // Change images in DOM
      this.addImage("right");
      this.removeImage(leftMostImage);
      this.cssUpdate(centerImage, this.startLoadedImages, "toLeft");
    }
  }
  left(){
    if (this.buttonClickable) {
      this.buttonClickable = false;
      // calculate right most image
      let rightMostImage = (this.startLoadedImages + 2) % this.carouselItems.length
      if (0 < this.startLoadedImages) {
        this.startLoadedImages--
      }
      else{
        this.startLoadedImages = this.carouselItems.length-1
      }
      // rotate loadedImages[] to right and fill empty space with items from carouselItems[]
      this.loadedImages[0] = this.carouselItems[this.startLoadedImages]

      let centerImage = (this.startLoadedImages + 1) % this.carouselItems.length;
      this.loadedImages[1] = this.carouselItems[centerImage]
      
      let rightImage = (this.startLoadedImages + 2) % this.carouselItems.length
      this.loadedImages[2] = this.carouselItems[rightImage]
      
      // Change images in DOM
      this.addImage("left");
      this.removeImage(rightMostImage);
      this.cssUpdate(centerImage, rightImage, "toRight");
    }
  }
  addImage(direction:string){
    /* adding new image to carousel dom
      #images img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
      }
      <div>
            <img src="" alt="">
      </div>
    */
    // 1. Select the div element using the id property
    const app = document.getElementById("images");
    // 2. Create new elements programmatically
    const div = document.createElement("div");
    const img = document.createElement("img");
    // 3. Add attributes to image
    img.style.width="100%"
    img.style.height="100%"
    img.style.objectFit="cover"
    img.style.position="absolute"
    
    if (direction == "left") {
      // 3. Add attributes to image
      div.id=`div_image_${this.startLoadedImages}`
      img.id=`image_${this.startLoadedImages}`
      img.src=this.loadedImages[0];
      img.alt=this.loadedImages[0];
      img.style.right="100%"
      // 4. Append new elements
      app?.appendChild(div);
    }
    else{ // direction == "right"
      // 3. Add attributes to image
      div.id=`div_image_${(this.startLoadedImages + 2) % this.carouselItems.length}`
      img.id=`image_${(this.startLoadedImages + 2) % this.carouselItems.length}`
      img.src=this.loadedImages[2];
      img.alt=this.loadedImages[2];
      img.style.right="-100%"
      // 4. Append new elements
      app?.appendChild(div);
    }
    div?.appendChild(img);
  }
  removeImage(imageIndex:number){
    const app = document.getElementById(`div_image_${ imageIndex }`);
    app?.remove()
  }
  cssUpdate(imageToCenter:number, imageToSide:number, direction:string){
    let imageToCenterHTML = document.getElementById(`image_${imageToCenter}`) as HTMLElement;
    let imageToSideHTML = document.getElementById(`image_${imageToSide}`) as HTMLElement;
      
    imageToCenterHTML.style.transition = "ease all 1s"
    imageToSideHTML.style.transition = "ease all 1s"
    imageToCenterHTML.style.right="0%"
    if (direction == "toRight") {
      imageToSideHTML.style.right="-100%"
    }
    else{
      imageToSideHTML.style.right="100%"
    }
    setTimeout(()=>{ 
      this.buttonClickable = true;
      }, 750)
  }
}

