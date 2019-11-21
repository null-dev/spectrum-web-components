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
import { html, select } from '@open-wc/demoing-storybook';
import { TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import '../sp-treeview.js';
import '../sp-treeview-item.js';

export default {
    component: 'sp-treeview',
    title: 'Tree View',
};

export const Default = (): TemplateResult => {
    const dir = select(
        'Text direction',
        {
            None: 'none',
            'Left to right': 'ltr',
            'Right to left': 'rtl',
        },
        'ltr',
        'Element'
    );
    return html`
        <sp-treeview dir=${ifDefined(dir === 'none' ? undefined : dir)}>
            <sp-treeview-item
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 1
            </sp-treeview-item>
            <sp-treeview-item
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 2
                <sp-treeview
                    slot="children"
                    dir=${ifDefined(dir === 'none' ? undefined : dir)}
                >
                    <sp-treeview-item
                        dir=${ifDefined(dir === 'none' ? undefined : dir)}
                    >
                        Child Item 1
                    </sp-treeview-item>
                    <sp-treeview-item
                        dir=${ifDefined(dir === 'none' ? undefined : dir)}
                    >
                        Child Item 2
                    </sp-treeview-item>
                </sp-treeview>
            </sp-treeview-item>
            <sp-treeview-item
                dir=${ifDefined(dir === 'none' ? undefined : dir)}
            >
                Item 3
            </sp-treeview-item>
        </sp-treeview>
    `;
};
