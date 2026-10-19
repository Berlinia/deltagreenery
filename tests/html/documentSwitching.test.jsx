require('jsdom-global')('', {url:'https://example.test'});
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
jest.mock('../../client/homebrew/brewRenderer/brewRenderer.less',()=>({}));
jest.mock('../../client/homebrew/brewRenderer/errorBar/errorBar.jsx',()=>()=>null);
jest.mock('../../client/homebrew/brewRenderer/toolBar/toolBar.jsx',()=>()=>null);
jest.mock('../../client/homebrew/brewRenderer/headerNav/headerNav.jsx',()=>()=>null);
jest.mock('client/components/renderWarnings/renderWarnings.jsx',()=>()=>null,{virtual:true});
jest.mock('../../client/homebrew/brewRenderer/notificationPopup/notificationPopup.jsx',()=>()=>null);
jest.mock('../../shared/helpers.js',()=>({printCurrentBrew:jest.fn()}));
jest.mock('react-frame-component',()=>{
 const React=require('react');
 return {default: function Frame(props){
  React.useEffect(()=>{props.contentDidMount();},[]);
  return <div id={props.id} ref={node=>{if(node)node.contentDocument=global.document;}}>{props.children}</div>;
 }};
});
const BrewRenderer=require('../../client/homebrew/brewRenderer/brewRenderer.jsx');
let root,container;
beforeEach(()=>{
 global.IS_REACT_ACT_ENVIRONMENT=true;
 global.IntersectionObserver=class {observe(){} disconnect(){}};
 global.localStorage=window.localStorage;
 jest.useFakeTimers();container=document.createElement('div');document.body.append(container);root=createRoot(container);
});
afterEach(()=>{act(()=>root.unmount());container.remove();jest.useRealTimers();delete global.IS_REACT_ACT_ENVIRONMENT;});
const text=name=>Array.from({length:8},(_,i)=>`# ${name} ${i+1}\n\n${name} content`).join('\n\n\\page\n\n');
const show=name=>act(()=>{root.render(<BrewRenderer key={name} text={text(name)} renderer='V3'/>);});
const mount=()=>act(()=>{jest.advanceTimersByTime(100);});
test('switching equal-length documents never prints cached pages from the previous document',()=>{
 for(const name of ['Alpha','Bravo','Alpha']){
  show(name);mount();
  expect([...container.querySelectorAll('.page h1')].map(e=>e.textContent)).toEqual(Array.from({length:8},(_,i)=>`${name} ${i+1}`));
  expect(container.querySelectorAll('.publicationDisclaimer')).toHaveLength(8);
 }
});
test('switching documents before iframe mount finishes cancels the old callback',()=>{
 show('Alpha');show('Bravo');mount();
 expect(container.textContent).not.toContain('Alpha content');
 expect(container.querySelectorAll('.page h1')).toHaveLength(8);
});

