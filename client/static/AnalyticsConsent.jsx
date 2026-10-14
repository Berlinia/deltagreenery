import React, { useEffect, useMemo, useState } from 'react';
import { createAnalytics, CONSENT_KEY } from './analytics.js';
export default function AnalyticsConsent() {
 const analytics = useMemo(()=>createAnalytics(window, document, window.DELTA_GREENERY_CONFIG), []);
 const [choice, setChoice] = useState(()=>analytics.read());
 const [open, setOpen] = useState(!choice);
 useEffect(()=>{
  analytics.apply(choice);
  const sync = (event)=>{
   if(event.key === CONSENT_KEY || event.key === null) {
    const next = analytics.read(); analytics.apply(next); setChoice(next); setOpen(!next);
   }
  };
  window.addEventListener('storage', sync);
  return ()=>{ window.removeEventListener('storage', sync); analytics.stop(); };
 }, [analytics]);
 if(!analytics.enabled) return null;
 const choose = (next)=>{ analytics.choose(next); setChoice(next); setOpen(false); };
 return <>
  <button onClick={()=>setOpen(!open)} aria-expanded={open}>Analytics preferences</button>
  {open && <section className='analyticsConsent' aria-label='Analytics preferences'>
   <strong>Optional visitor analytics</strong>
   <p>Allow Google Analytics cookies to help us understand site visits? Your documents and Google Drive account details are not included. You can use every editor feature without analytics.</p>
   <p><a href='./privacy.html' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>{choice && <span> · Currently {choice === 'granted' ? 'allowed' : 'declined'}</span>}</p>
   <div><button onClick={()=>choose('granted')}>Allow analytics</button><button onClick={()=>choose('denied')}>Decline analytics</button></div>
  </section>}
 </>;
}
