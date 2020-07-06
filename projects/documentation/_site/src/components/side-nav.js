import { __decorate } from "tslib";
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
import { LitElement, html, property, customElement, } from 'lit-element';
import './side-nav-search.js';
import sideNavStyles from './side-nav.css';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
let SideNav = /** @class */ (() => {
    let SideNav = class SideNav extends LitElement {
        constructor() {
            super(...arguments);
            this.open = false;
        }
        static get styles() {
            return [sideNavStyles];
        }
        toggle() {
            this.open = !this.open;
        }
        focus() {
            const target = document.querySelector('[slot="logo"]');
            if (!target) {
                this.shadowRoot.querySelector('#logo').focus();
                return;
            }
            target.focus();
        }
        render() {
            return html `
            <div class="scrim" @click=${this.toggle}></div>
            <aside>
                <div id="nav-header">
                    <div id="logo-container">
                        <slot name="logo"></slot>
                    </div>
                    <docs-search></docs-search>
                </div>
                <div class="navigation">
                    <slot></slot>
                </div>
            </aside>
        `;
        }
        updated(changes) {
            if (changes.has('open') && !this.open && changes.get('open')) {
                this.dispatchEvent(new Event('close'));
            }
        }
    };
    __decorate([
        property({ type: Boolean, reflect: true })
    ], SideNav.prototype, "open", void 0);
    SideNav = __decorate([
        customElement('docs-side-nav')
    ], SideNav);
    return SideNav;
})();
export { SideNav };
//# sourceMappingURL=side-nav.js.map