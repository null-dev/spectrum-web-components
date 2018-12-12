/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { SpectrumIconsetSVG } from '../iconset/iconset-svg';

import iconsSVG from './icons-large.svg.js';

export class SpectrumIconsLarge extends SpectrumIconsetSVG {
    public static readonly is: string = 'spectrum-icons-large';

    constructor() {
        super();
        this.name = 'ui'; // default iconset name for these icons
    }

    protected getDefaultContent() {
        return iconsSVG;
    }
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected createIconName(icon: string) {
        return `spectrum-icon-${icon}`;
    }
}

if (!customElements.get(SpectrumIconsLarge.is)) {
    customElements.define(SpectrumIconsLarge.is, SpectrumIconsLarge);
}
