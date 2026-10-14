export const CONSENT_KEY = 'DG_analytics_consent_v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export function createAnalytics(win, doc, config = {}) {
 const id = config.googleAnalyticsId || '';
 const enabled = /^G-[A-Z0-9]+$/.test(id);
 let started = false;
 const read = ()=>{
  try {
   const saved = JSON.parse(win.localStorage.getItem(CONSENT_KEY));
   return saved && Date.now() - saved.time < MAX_AGE && ['granted', 'denied'].includes(saved.choice) ? saved.choice : null;
  } catch { return null; }
 };
 const stop = ()=>{
  win['ga-disable-' + id] = true;
  // Only remove this application's host-scoped analytics cookies.
  for(const part of doc.cookie.split(';')) {
   const name = part.trim().split('=')[0];
   if(name.startsWith('dg_analytics_')) doc.cookie = name + '=; Max-Age=0; Path=' + (config.basePath || '') + '/; SameSite=Lax';
  }
 };
 const apply = (choice)=>{
  if(!enabled) return;
  if(choice !== 'granted') { stop(); return; }
  win['ga-disable-' + id] = false;
  if(started) return;
  started = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function(){ win.dataLayer.push(arguments); };
  win.gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
  win.gtag('js', new Date());
  win.gtag('config', id, {
   send_page_view: true,
   page_title: 'Delta Greenery',
   page_location: win.location.origin + (config.basePath || '') + '/',
   page_referrer: '',
   allow_google_signals: false,
   allow_ad_personalization_signals: false,
   cookie_domain: 'none',
   cookie_path: (config.basePath || '') + '/',
   cookie_prefix: 'dg_analytics',
   cookie_expires: MAX_AGE / 1000,
   cookie_update: false
  });
  const script = doc.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  doc.head.appendChild(script);
 };
 const choose = (choice)=>{
  if(!['granted', 'denied'].includes(choice)) return;
  try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({choice, time:Date.now()})); } catch { /* Choice applies to this tab even when storage is blocked. */ }
  apply(choice);
 };
 return {enabled, read, apply, choose, stop};
}
