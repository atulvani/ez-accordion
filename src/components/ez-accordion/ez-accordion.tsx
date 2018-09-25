import {Component, Listen, Prop, State} from '@stencil/core';

export interface RendererOptions { // TODO: keep this in a separate file
    isActive: boolean;
    setStatus: (itemName: string, shouldSetAsActive: boolean) => void;
    toggleActive: (name: string) => void;
};

const List = { // TODO: keep this in a separate file
    includes<T>(list: T[], item: T): boolean {
        return list ? list.indexOf(item) !== -1 : false;
    },
    of<T>(iterable: T[]): T[] {
        try {
            return [...iterable];
        } catch {
            return [];
        }
    },
    push<T>(list: T[], item: T): T[] {
        return list ? [...list, item] : [item];
    },
    remove<T>(list: T[], item: T) {
        return list.filter(listItem => listItem !== item);
    }
};

@Component({
    tag: 'ez-accordion',
})
export class EzAccordion {
    @Prop() activeItems: string[];
    @State() activeItemNameList: string[];
    @State() childEltList: Element[] = [];
    @Prop() renderer: (rendererOptions: RendererOptions) => void;
    @Prop() activeItemsChangeIntercepter?: (activeItems: string[], prevActiveItems: string[]) => string[] = activeItems => activeItems;

    componentWillLoad() {
        this.activeItemNameList = List.of(this.activeItems);
    }

    isActive = function (itemName: string) {
        return List.includes(this.activeItemNameList, itemName);
    }.bind(this);

    @Listen('registerChild')
    registerChild({detail: childElt}: CustomEvent<Element>) {
        childElt['isActive'] = this.isActive(childElt['name']);
        childElt['setStatus'] = this.setStatus;
        childElt['toggleActive'] = this.toggleActive;
        this.childEltList = List.push(this.childEltList, childElt);
    }

    render() {
        if (this.renderer) {
            return this.renderer({isActive: this.isActive, setStatus: this.setStatus, toggleActive: this.toggleActive});
        } else {
            return <slot/>;
        }
    }

    setStatus = function (itemName: string, shouldSetAsActive: boolean): void {
        var isAlreadyActive = List.includes(this.activeItemNameList, itemName);
        if ((shouldSetAsActive && !isAlreadyActive) || (!shouldSetAsActive && isAlreadyActive)) {
            this.toggleActive(itemName);
        }
    }.bind(this);

    toggleActive = function (itemName: string): void {
        if (List.includes(this.activeItemNameList, itemName)) {
            this.activeItemNameList = this.activeItemsChangeIntercepter(List.remove(this.activeItemNameList, itemName), this.activeItemNameList);
        } else {
            this.activeItemNameList = this.activeItemsChangeIntercepter(List.push(this.activeItemNameList, itemName), this.activeItemNameList);
        }
        this.updateChildrenProps();
    }.bind(this);

    @Listen('unregisterChild')
    unregisterChild({detail: childElt}: CustomEvent<Element>): void {
        this.childEltList = List.remove(this.childEltList, childElt);
    }

    updateChildrenProps(): void {
        for (let childElt of this.childEltList) {
            childElt['isActive'] = this.isActive(childElt['name']);
        }
    }
}
