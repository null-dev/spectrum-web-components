import{h as a}from"./lit-html-6898710b.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./focusable-5c74bfe6.js";import"./index-5dbc81e6.js";var d=()=>a` <sp-radio>Radio</sp-radio> `,e=()=>a` <sp-radio checked="checked">Radio</sp-radio> `,o=()=>a` <sp-radio quiet>Radio</sp-radio> `,i=()=>a` <sp-radio quiet checked="checked">Radio</sp-radio> `;i.story={name:"Quiet checked"};var r=()=>a` <sp-radio autofocus>Radio</sp-radio> `,s=()=>a` <sp-radio invalid>Radio</sp-radio> `,p=()=>a` <sp-radio invalid checked="checked">Radio</sp-radio> `;p.story={name:"Invalid checked"};var l=()=>a` <sp-radio disabled="disabled">Radio</sp-radio> `,t=()=>a` <sp-radio disabled="disabled" checked="checked">Radio</sp-radio> `;t.story={name:"Disabled checked"};var c=()=>a` <sp-radio label-below>Radio</sp-radio> `;c.story={name:"Label below"};var n=()=>a` <sp-radio label-below checked="checked">Radio</sp-radio> `;n.story={name:"Label below checked"};var b=()=>a` <sp-radio-group column selected="first" name="group-example"> <sp-radio value="first">Option 1</sp-radio> <sp-radio value="second">Option 2</sp-radio> <sp-radio value="third">Option 3</sp-radio> <sp-radio value="fourth">Option 4</sp-radio> </sp-radio-group> `;b.story={name:"Group example"};var u=()=>a` <sp-radio-group column name="group-example"> <sp-radio quiet value="zero" tabindex="0">Tab Index 0</sp-radio> <sp-radio disabled="disabled" value="three" tabindex="3"> Tab Index 3 </sp-radio> <sp-radio value="one" tabindex="1" autofocus> Tab Index 1 </sp-radio> <sp-radio value="four" tabindex="4">Tab Index 4</sp-radio> <sp-radio invalid value="two" tabindex="2"> Tab Index 2 </sp-radio> </sp-radio-group> `;u.story={name:"Tab index example"};export default{component:"sp-radio",title:"Radio"};export{r as Autofocus,e as Checked,d as Default,l as Disabled,s as Invalid,o as Quiet,t as disabledChecked,b as groupExample,p as invalidChecked,c as labelBelow,n as labelBelowChecked,i as quietChecked,u as tabIndexExample};
//# sourceMappingURL=radio.stories-572ce686.js.map