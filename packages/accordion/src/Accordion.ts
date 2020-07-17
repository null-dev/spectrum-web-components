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
    PropertyValues,
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

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('sp-accordion-item-toggle', this.onToggle);
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

        target.open = !target.open;
    }
}
