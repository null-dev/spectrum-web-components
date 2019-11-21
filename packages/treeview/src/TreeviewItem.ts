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
    CSSResultArray,
    TemplateResult,
    SpectrumElement,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/icon/sp-icon.js';
import chevromRightMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron-right-medium.css.js';
import { ChevronRightMediumIcon } from '@spectrum-web-components/icons-ui';
import treeviewStyles from './treeview-item.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */

export class TreeViewItem extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [treeviewStyles, chevromRightMediumStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    private get hasChildren(): boolean {
        return !!this.querySelector('[slot="children"]');
    }

    public toggleOpen(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.open = !this.open;
    }

    public toggleSelected(event: Event): void {
        event.preventDefault();
        this.selected = !this.selected;
    }

    protected render(): TemplateResult {
        return html`
            <a id="link" href="#" @click=${this.toggleSelected}>
                ${this.hasChildren
                    ? html`
                          <sp-icon
                              id="indicator"
                              class="chevron-right-medium"
                              @click=${this.toggleOpen}
                          >
                              ${ChevronRightMediumIcon()}
                          </sp-icon>
                      `
                    : html``}
                <span id="label">
                    <slot></slot>
                </span>
            </a>
            ${this.open
                ? html`
                      <slot name="children"></slot>
                  `
                : html``}
        `;
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('selected')) {
            if (this.selected) {
                this.dispatchEvent(
                    new Event('selected', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                    })
                );
            } else {
                this.dispatchEvent(
                    new Event('deselected', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                    })
                );
            }
        }
    }
}
