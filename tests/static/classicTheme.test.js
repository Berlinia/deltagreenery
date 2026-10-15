import {emptyDocument,serializeDocument,parseDocument} from '../../client/static/documentFormat.js';
import {getThemeBundle} from '../../client/static/themeBundle.js';
test('classic appearance is selectable without changing the default and survives export',()=>{
 expect(emptyDocument().theme).toBe('DeltaGreen');
 const classic={...emptyDocument('Same text'),theme:'DeltaGreenClassic'};
 expect(parseDocument(serializeDocument(classic))).toEqual(classic);
 const bundle=getThemeBundle('V3','DeltaGreenClassic');
 expect(bundle.snippets).toContain('V3_DeltaGreen');
 expect(bundle.snippets).not.toContain('V3_DeltaGreenClassic');
 expect(bundle.joinedStyles).toContain('/DeltaGreenClassic/style.css');
 expect(bundle.joinedStyles).not.toContain('/DeltaGreen/style.css');
});
