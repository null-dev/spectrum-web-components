/*
Copyright 2019 Adobe. All rights reserved.
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
} from '@spectrum-web-components/base';

import { TreeViewItem } from './TreeviewItem.js';
import treeviewStyles from './treeview.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */

export class TreeView extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [treeviewStyles];
    }

    @property({ attribute: false })
    public selectedChild?: TreeViewItem;

    constructor() {
        super();
        this.addEventListener('selected', this.manageSelected);
        this.addEventListener('deselected', this.manageDeselected);
    }

    private manageSelected(event: Event): void {
        const { target } = event;
        if (!target) {
            return;
        }
        if (this.selectedChild && this.selectedChild !== target) {
            this.selectedChild.selected = false;
        }
        this.selectedChild = target as TreeViewItem;
    }

    private manageDeselected(event: Event): void {
        const { target } = event;
        if (!target) {
            return;
        }
        if (this.selectedChild && this.selectedChild === target) {
            this.selectedChild = undefined;
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
