/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
} from '@spectrum-web-components/base';

import { AccordionItem } from './accordion-item.js';

import styles from './accordion.css.js';

/**
 * @element sp-accordion
 */
export class Accordion extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    public accordionItems = [] as Element[];
    public focusedItemIndex = 0;
    public focusInItemIndex = 0;

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    public get childRole(): string {
        return this.getAttribute('role') === 'accordion'
            ? 'accordionitem'
            : 'option';
    }

    public constructor() {
        super();
        this.handleKeydown = this.handleKeydown.bind(this);
        this.startListeningToKeyboard = this.startListeningToKeyboard.bind(
            this
        );
        this.stopListeningToKeyboard = this.stopListeningToKeyboard.bind(this);
        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
        this.addEventListener('sp-accordion-item-toggle', this.onToggle);
    }

    public focus(): void {
        if (this.accordionItems.length === 0) {
            return;
        }

        const focusInItem = this.accordionItems[
            this.focusInItemIndex
        ] as AccordionItem;
        this.focusedItemIndex = this.focusInItemIndex;
        focusInItem.focus();
    }

    public startListeningToKeyboard(): void {
        if (this.accordionItems.length === 0) {
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        console.log(code);
        if (code === 'Tab') {
            this.prepareToCleanUp();
            return;
        }
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        console.log(code);
        this.focusAccordionItemByOffset(direction);
    }

    public focusAccordionItemByOffset(offset: number): void {
        const focusedItem = this.accordionItems[
            this.focusedItemIndex
        ] as AccordionItem;
        this.focusedItemIndex =
            (this.accordionItems.length + this.focusedItemIndex + offset) %
            this.accordionItems.length;
        let itemToFocus = this.accordionItems[
            this.focusedItemIndex
        ] as AccordionItem;
        while (itemToFocus.disabled) {
            this.focusedItemIndex =
                (this.accordionItems.length + this.focusedItemIndex + offset) %
                this.accordionItems.length;
            itemToFocus = this.accordionItems[
                this.focusedItemIndex
            ] as AccordionItem;
        }
        itemToFocus.focus();
        focusedItem.tabIndex = -1;
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    private onToggle(event: Event): void {
        const target = event.target as AccordionItem;
        const accordionItems = this.querySelectorAll('sp-accordion-item');
        if (!accordionItems) {
            return;
        }
        if (!this.allowMultiple) {
            accordionItems.forEach((item: Element) => {
                const accordionItem = item as AccordionItem;
                if (accordionItem.open && accordionItem !== target) {
                    accordionItem.open = false;
                }
            });
        }

        target.open = true; //!target.open;
    }

    public updateSelectedItemIndex(): void {
        let index = this.accordionItems.length - 1;
        let item = this.accordionItems[index] as AccordionItem;
        while (index && item && !item.open) {
            index -= 1;
            item = this.accordionItems[index] as AccordionItem;
        }
        index = Math.max(index, 0);
        this.focusedItemIndex = index;
        this.focusInItemIndex = index;
    }

    private prepareToCleanUp(): void {
        document.addEventListener(
            'focusout',
            () => {
                requestAnimationFrame(() => {
                    /* istanbul ignore if */
                    if (this.accordionItems.length === 0) {
                        return;
                    }
                    if (this.querySelector('[selected]')) {
                        const itemToBlur = this.accordionItems[
                            this.focusInItemIndex
                        ] as AccordionItem;
                        itemToBlur.tabIndex = -1;
                    }
                    this.updateSelectedItemIndex();
                    const itemToFocus = this.accordionItems[
                        this.focusInItemIndex
                    ] as AccordionItem;
                    itemToFocus.tabIndex = 0;
                });
            },
            { once: true }
        );
    }

    private prepItems = (): void => {
        this.accordionItems = [
            ...this.querySelectorAll(`[role="${this.childRole}"]`),
        ];
        if (!this.accordionItems || this.accordionItems.length === 0) {
            return;
        }
        this.updateSelectedItemIndex();
        const focusInItem = this.accordionItems[
            this.focusInItemIndex
        ] as AccordionItem;
        focusInItem.tabIndex = 0;
    };

    protected firstUpdated(): void {
        this.tabIndex = 0;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            const queryRoleEvent = new CustomEvent('sp-accordion-query-role', {
                bubbles: true,
                composed: true,
                detail: {
                    role: '',
                },
            });
            this.dispatchEvent(queryRoleEvent);
            this.setAttribute(
                'role',
                queryRoleEvent.detail.role || 'accordion'
            );
        }
        if (!this.observer) {
            this.observer = new MutationObserver(this.prepItems);
        }
        this.observer.observe(this, { childList: true, subtree: true });
        this.updateComplete.then(() => this.prepItems());
    }

    public disconnectedCallback(): void {
        /* istanbul ignore else */
        if (this.observer) {
            this.observer.disconnect();
        }
        super.disconnectedCallback();
    }

    private observer?: MutationObserver;
}
