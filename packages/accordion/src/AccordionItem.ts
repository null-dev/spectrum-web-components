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

import { html, CSSResultArray, TemplateResult, property } from 'lit-element';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { ChevronRightMediumIcon } from '@spectrum-web-components/icons-ui';

import styles from './accordion-item.css.js';

/**
 * @element sp-accordion
 * @slot - The content of the item that is hidden when the item is not open
 */
export class AccordionItem extends Focusable {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public label = '';

    public get focusElement(): HTMLElement {
        /* istanbul ignore if */
        if (!this.shadowRoot) {
            return this;
        }
        return this.shadowRoot.querySelector('#header') as HTMLElement;
    }

    constructor() {
        super();

        this.addEventListener('keydown', this.onKeyDown);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.dispatchEvent(
                new CustomEvent('sp-accordion-item-toggle', {
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    protected render(): TemplateResult {
        return html`
            <h3 id="heading">
                <button id="header" @click=${this.onClick}>
                    ${this.label}
                </button>
                <sp-icon id="indicator" size="xs">
                    ${ChevronRightMediumIcon({ hidden: true })}
                </sp-icon>
            </h3>
            <div id="content">
                <slot></slot>
            </div>
        `;
    }

    private onClick(): void {
        this.dispatchEvent(
            new CustomEvent('sp-accordion-item-toggle', {
                bubbles: true,
                composed: true,
            })
        );
    }
}
