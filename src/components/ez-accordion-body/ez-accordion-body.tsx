import {Component, Element, Event, EventEmitter, Prop} from '@stencil/core';
import {RendererOptions} from '../ez-accordion/ez-accordion';

@Component({
    tag: 'ez-accordion-body',
})
export class EzAccordionBody {
    @Element() elt: HTMLElement;
    @Prop() isActive: boolean;
    @Prop() name: string;
    @Event() registerChild: EventEmitter;
    @Prop() renderer: (rendererOptions: RendererOptions) => void;
    @Prop() setStatus: (itemName: string, shouldSetAsActive: boolean) => void;
    @Prop() text: string = '';
    @Prop() toggleActive: (name: string) => void;
    @Event() unregisterChild: EventEmitter;

    componentDidUnload() {
        this.unregisterChild.emit(this.elt);
    }

    componentWillLoad() {
        this.registerChild.emit(this.elt);
    }

    render = () => {
        this.elt.className = this.isActive ? 'active' : '';
        if (this.text) {
            return <p>{this.text}</p>;
        } else if (this.renderer) {
            return this.renderer({isActive: this.isActive, setStatus: this.setStatus, toggleActive: this.toggleActive});
        } else {
            return <slot />;
        }
    }
}
