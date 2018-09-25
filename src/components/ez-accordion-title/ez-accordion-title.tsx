import {Component, Element, Event, EventEmitter, Prop} from '@stencil/core';
import {RendererOptions} from '../ez-accordion/ez-accordion';

@Component({
    tag: 'ez-accordion-title',
})
export class EzAccordionTitle {
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
            return <button onClick={() => this.toggleActive(this.name)}>{this.text}</button>;
        } else if (this.renderer) {
            return this.renderer({isActive: this.isActive, setStatus: this.setStatus, toggleActive: this.toggleActive});
        } else {
            return <button onClick={() => this.toggleActive(this.name)}><slot/></button>;
        }
    }
}
