import {Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({ selector: '[appDropdown]'})
export class DropdownDirective {

  @Input()
  public dropdownMenu: HTMLDivElement;

  constructor( private elRef: ElementRef, private renderer: Renderer2 ) {}

  @HostListener('click')
  public onClick(){
    if (!this.dropdownMenu.classList.contains('show')) {
      this.renderer.addClass(this.dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    }
  }

  // For closing the Dropdown from Anywhere
  @HostListener('document:click',['$event'])
  public onOuterClick(event: Event){

    if (! this.elRef.nativeElement.contains(event.target)){
      this.renderer.removeClass(this.dropdownMenu, 'show');
    }
  }

}

/** This is a directive to enable Bootstrap dropdown
 * For closing it whenever user clicks outside what we did was, we actually attached an event to the dom itself whenever
 * it was clicked, and passed this event to our function "onOuterClick"
 * Then we check if the element our decorator sits on DOES NOT have the target we simple hide it
 */
