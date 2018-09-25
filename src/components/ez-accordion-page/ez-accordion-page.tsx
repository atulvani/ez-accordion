import {Component} from '@stencil/core';

@Component({
    tag: 'ez-accordion-page',
    styleUrl: 'ez-accordion-page.css',
})
export class EzAccordionPage {
    atLeastOneAtATime(nextState: string[], currentState: string[]): string[] {
        return nextState.length > 0 ? nextState : currentState;
    }
    atMostOneAtATime(nextState: string[], currentState: string[]): string[] {
        if (nextState.length > 1) {
            return nextState.filter(item => currentState.indexOf(item) === -1).slice(0, 1);
        } else {
            return nextState;
        }
    }
    oneAtATime = function (nextState: string[], currentState: string[]): string[] {
        return this.atMostOneAtATime(this.atLeastOneAtATime(nextState, currentState), currentState);
    }.bind(this);
    renderAccordionItems = function () {
        let items = [];
        for (let item of this.accordionItemMap) {
            items.push(<ez-accordion-title name={item[0]} text={item[0]} />);
            items.push(<ez-accordion-body name={item[0]} text={item[1]} />);
        }
        return items;
    }.bind(this);

    render() {
        return (
            <div id="accordion-examples">
                <ez-accordion>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
                <ez-accordion>
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                    <ez-accordion-title name="sports" text="Sports" />
                </ez-accordion>
                <ez-accordion class="horizontal">
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
                <ez-accordion class="horizontal">
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                    <ez-accordion-title name="sports" text="Sports" />
                </ez-accordion>
                <ez-accordion activeItems={['fruits']}>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
                <ez-accordion>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies">
                        <i>Movies</i>
                    </ez-accordion-title>
                    <ez-accordion-body name="movies">
                        <ul>
                            <li>Avengers</li>
                            <li>Batman</li>
                        </ul>
                    </ez-accordion-body>
                    <ez-accordion-title name="sports" renderer={({isActive, toggleActive}) => (
                        <button onClick={() => toggleActive('sports')}>
                            <i>{isActive ? <u>Sports</u> : 'Sports'}</i>
                        </button>
                    )} />
                    <ez-accordion-body name="sports" renderer={({setStatus}) => (
                        <p>No favorite Sports listed. View favorite <a href="javascript:void(0)" onClick={() => {setStatus('sports', false); setStatus('movies', true);}}>Movies</a> instead.</p>
                    )} />
                </ez-accordion>
                <ez-accordion activeItemsChangeIntercepter={this.atLeastOneAtATime}>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
                <ez-accordion activeItemsChangeIntercepter={this.atMostOneAtATime}>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
                <ez-accordion activeItemsChangeIntercepter={this.oneAtATime}>
                    <ez-accordion-title name="fruits" text="Fruits" />
                    <ez-accordion-body name="fruits" text="Apple, Banana" />
                    <ez-accordion-title name="movies" text="Movies"/>
                    <ez-accordion-body name="movies" text="Avengers, Batman"/>
                    <ez-accordion-title name="sports" text="Sports" />
                    <ez-accordion-body name="sports" text="Archery, Bowling" />
                </ez-accordion>
            </div>
        );
    }
}
