import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[pattern]'
})

export class PatternDirective {

    @Input('patternType') patternType: string; // number | decimal

    private regex = {
        email: new RegExp(/^[a-zA-Z0-9@.]*$/g),
        name: new RegExp(/^[a-zA-Z ]*$/g)
    };

    private specialKeys = {
        email: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete' ],
        name: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete' ]
    };

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys[this.patternType].indexOf(event.key) !== -1) {
            return;
        }
        // Do not use event.keycode this is deprecated.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex[this.patternType])) {
            event.preventDefault();
        }
    }
}