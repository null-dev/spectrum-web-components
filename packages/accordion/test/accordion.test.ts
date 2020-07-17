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

import { html } from 'lit-element';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

import '../sp-accordion.js';
import { Accordion, AccordionItem } from '..';

const keyboardEvent = (code: string): KeyboardEvent =>
    new KeyboardEvent('keydown', {
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
        shiftKey,
    });
const tabEvent = keyboardEvent('Tab');
const shiftTabEvent = keyboardEvent('Tab', true);

describe('Accordion', () => {
    it('loads default accordion accessibly', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion></sp-accordion>
            `
        );

        await elementUpdated(el);

        expect(el).to.be.accessible();
    });
    it('only allows one open item when allowMultiple is false', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion></sp-accordion>
            `
        );

        await elementUpdated(el);

        expect(el).to.be.accessible();
    });
    it('allows more than one open item when allowMultiple is true', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion></sp-accordion>
            `
        );

        await elementUpdated(el);

        expect(el).to.be.accessible();
    });
});
