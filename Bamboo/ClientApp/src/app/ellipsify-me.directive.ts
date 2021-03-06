import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
@Directive({
selector: '[appEllipsifyMe]'
})
export class EllipsifyMeDirective implements AfterViewInit {
  domElement: any;
constructor(private elementRef: ElementRef,
            private renderer: Renderer2) {
      this.domElement = this.elementRef.nativeElement;
      const elipsifyme = {
             'text-overflow': 'ellipsis',
             'overflow': 'hidden',
             'white-space': 'nowrap',
            };
      Object.keys(elipsifyme).forEach(element => {
           this.renderer.setStyle(
           this.domElement, `${element}`, elipsifyme[element]
           );
        });
    }
ngAfterViewInit(): void {
      this.renderer.setProperty(this.domElement, 'scrollTop', 1);
      this.setToolTip();
   }
@HostListener('window:resize', ['$event.target'])
  setToolTip() {
      (this.domElement.offsetWidth < this.domElement.scrollWidth) ?
         this.renderer.setAttribute(this.domElement,
                     'title',this.domElement.textContent) :
         this.renderer.removeAttribute(this.domElement, 'title');
   }
}