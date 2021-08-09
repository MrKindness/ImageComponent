import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'image-panel-component',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.scss'],
})
export class ImagePanelComponent implements OnInit, AfterViewInit {
  @ViewChild('ImgCnvs') ImgCanvas?: ElementRef<any>;
  @ViewChild('ImgBlckCnvs') ImgBlackCanvas?: ElementRef<any>;
  @ViewChild('CnvsContainer') CanvasCont?: ElementRef<any>;
  @ViewChild('FileInput') FileInput?: ElementRef<any>;
  CanvasHeight = 400;
  CanvasWidth = 400;
  ImgContext?: CanvasRenderingContext2D;
  ImgBlackContext?: CanvasRenderingContext2D;

  constructor(private r: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.ImgContext = this.ImgCanvas!.nativeElement.getContext('2d');
    this.ImgBlackContext = this.ImgBlackCanvas!.nativeElement.getContext('2d');

    this.FileInput?.nativeElement.addEventListener('change', (event: any) => {
      let image = new Image();

      image.src = window.URL.createObjectURL(
        this.FileInput!.nativeElement.files[0]
      );

      image.onload = () => {
        let k = image.width / image.height;

        if (k > 1) this.CanvasHeight /= k;
        else if (k < 1) this.CanvasHeight *= k;

        this.r.setStyle(
          this.CanvasCont!.nativeElement,
          'width',
          this.CanvasWidth + 'px'
        );
        this.ImgBlackCanvas!.nativeElement.width = this.CanvasWidth;
        this.ImgCanvas!.nativeElement.width = this.CanvasWidth;

        this.r.setStyle(
          this.CanvasCont!.nativeElement,
          'height',
          this.CanvasHeight + 'px'
        );
        this.ImgBlackCanvas!.nativeElement.height = this.CanvasHeight;
        this.ImgCanvas!.nativeElement.height = this.CanvasHeight;

        this.ImgBlackContext?.drawImage(
          image,
          0,
          0,
          this.CanvasWidth,
          this.CanvasHeight
        );
        this.ImgContext?.drawImage(
          image,
          0,
          0,
          this.CanvasWidth,
          this.CanvasHeight
        );
      };
    });
  }
}
