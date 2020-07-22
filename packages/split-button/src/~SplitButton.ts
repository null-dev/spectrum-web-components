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
    property,
    query,
    PropertyValues,
} from 'lit-element';

import { ButtonVariants, ButtonBase } from '@spectrum-web-components/button';
import '@spectrum-web-components/icon';
import {
    ChevronDownMediumIcon,
    MoreIcon,
} from '@spectrum-web-components/icons-ui';
import '@spectrum-web-components/overlay';
import { Placement, Overlay } from '@spectrum-web-components/overlay';
import { Menu, MenuItem } from '@spectrum-web-components/menu';

import buttonStyles from '@spectrum-web-components/button/src/button.css.js';
import ChevronDownMediumStyle from '@spectrum-web-components/icon/src/spectrum-icon-chevron-down-medium.css.js';
import styles from './split-button.css.js';

/**
 * @element sp-split-button
 */
export class SplitButton extends ButtonBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, styles, ChevronDownMediumStyle];
    }

    @query('.trigger')
    public button?: HTMLButtonElement;

    private closeOverlay?: () => void;

    @property({ type: Boolean, reflect: true })
    public left = false;

    @property({ type: Boolean })
    public open = false;

    public optionsMenu?: Menu;

    private placeholder?: Comment;

    @property({ reflect: true })
    public placement: Placement = 'bottom-start';

    @query('sp-popover')
    private popover?: HTMLElement;

    @property({ type: String })
    public type: 'field' | 'more' = 'field';

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: ButtonVariants = 'cta';

    public onClick(event: Event): void {
        const target = event.target as MenuItem;
        /* istanbul ignore if */
        if (!target || target.disabled) {
            if (target) {
                this.focus();
            }
            return;
        }
        // this.setValueFromItem(target);
    }

    private toggleOptions(): void {
        this.open = !this.open;
    }

    public close(): void {
        this.open = false;
    }

    private async openMenu(): Promise<void> {
        /* istanbul ignore if */
        if (
            !this.popover ||
            !this.button ||
            !this.optionsMenu ||
            this.optionsMenu.children.length === 0
        ) {
            this.menuStateResolver();
            return;
        }

        this.placeholder = document.createComment(
            'placeholder for optionsMenu'
        );

        const parentElement =
            this.optionsMenu.parentElement || this.optionsMenu.getRootNode();

        /* istanbul ignore else */
        if (parentElement) {
            parentElement.replaceChild(this.placeholder, this.optionsMenu);
        }

        this.popover.append(this.optionsMenu);

        this.popover.style.setProperty('width', `${this.offsetWidth}px`);
        this.closeOverlay = await Overlay.open(this, 'replace', this.popover, {
            placement: this.placement,
            receivesFocus: 'auto',
        });
        this.menuStateResolver();
    }

    private closeMenu(): void {
        if (this.closeOverlay) {
            this.closeOverlay();
            delete this.closeOverlay;
        }

        this.menuStateResolver();
    }

    private onOverlayClosed(): void {
        this.close();
        /* istanbul ignore else */
        if (this.optionsMenu && this.placeholder) {
            const parentElement =
                this.placeholder.parentElement ||
                this.placeholder.getRootNode();

            /* istanbul ignore else */
            if (parentElement) {
                parentElement.replaceChild(this.optionsMenu, this.placeholder);
            }
        }

        delete this.placeholder;
    }

    protected render(): TemplateResult {
        return html`
            ${super.render()}
            <button
                class="button trigger ${this.variant}"
                @click=${this.toggleOptions}
            >
                <sp-icon class="icon chevron-down-medium">
                    ${this.type === 'field'
                        ? ChevronDownMediumIcon({ hidden: true })
                        : MoreIcon({ hidden: true })}
                </sp-icon>
            </button>
            <sp-popover
                open
                id="popover"
                @click=${this.onClick}
                @sp-overlay-closed=${this.onOverlayClosed}
            ></sp-popover>
        `;
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        this.optionsMenu = this.querySelector('sp-menu') as Menu;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            this.menuStatePromise = new Promise(
                (res) => (this.menuStateResolver = res)
            );
            if (this.open) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
        }
    }

    private menuStatePromise = Promise.resolve();
    private menuStateResolver!: () => void;

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.menuStatePromise;
    }

    public disconnectedCallback(): void {
        this.open = false;

        super.disconnectedCallback();
    }
}
