/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'treeview',
    components: [
        {
            name: 'treeview',
            tagName: 'sp-treeview',
            host: {
                selector: '.spectrum-TreeView',
            },
            complexSelectors: [
                {
                    replacement: '::slotted(sp-treeview)',
                    selector: '.spectrum-TreeView .spectrum-TreeView',
                },
            ],
            exclude: [/\.spectrum-TreeView-item/],
        },
        {
            name: 'treeview-item',
            host: {
                selector: '.spectrum-TreeView-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
                {
                    type: 'boolean',
                    selector: '.is-drop-target',
                    name: 'drop-target',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'indent',
                    root: '.spectrum-TreeView-item--indent',
                    values: [
                        '.spectrum-TreeView-item--indent1',
                        '.spectrum-TreeView-item--indent2',
                        '.spectrum-TreeView-item--indent3',
                        '.spectrum-TreeView-item--indent4',
                        '.spectrum-TreeView-item--indent5',
                        '.spectrum-TreeView-item--indent6',
                        '.spectrum-TreeView-item--indent7',
                        '.spectrum-TreeView-item--indent8',
                        '.spectrum-TreeView-item--indent9',
                        '.spectrum-TreeView-item--indent10',
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-TreeView-itemLink',
                    name: 'link',
                },
                {
                    selector: '.spectrum-TreeView-itemLabel',
                    name: 'label',
                },
                {
                    selector: '.spectrum-TreeView-itemIndicator',
                    name: 'indicator',
                },
            ],
            slots: [
                {
                    name: 'children',
                    selector: '.spectrum-TreeView',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-TreeView-itemIcon',
                    name: 'icon',
                },
            ],
        },
    ],
};
