// Required publication notice from the Delta Green publishing guidelines.
const notice = "Published by arrangement with the Delta Green Partnership. The intellectual property known as Delta Green is a trademark and copyright owned by the Delta Green Partnership, who has licensed its use here. The contents of this document are ©[AUTHOR NAME], excepting those elements that are components of the Delta Green intellectual property.";
const url = 'https://www.delta-green.com/publishing-guidelines/';
module.exports = {
 name: 'Delta Green',
 subsnippets: [
  {
   name: 'Recognition of Rights (first page)',
   icon: 'fas fa-copyright',
   gen: ()=> '\n<!-- Place this notice on the FIRST PAGE of your publication. Replace [AUTHOR NAME] with the author name before publishing. Read the linked guidelines to check whether your work is permitted. -->\n\n' + notice + '\n\n'
  },
  {
   name: 'Publishing Guidelines',
   icon: 'fas fa-link',
   gen: ()=> '\n[Delta Green Publishing Guidelines](' + url + ')\n\nNoncommercial publications must be free to access, including on storefronts: no paid access, fundraising, or pay-what-you-want pricing. Commercial use requires separate written permission. Include the Recognition of Rights notice on the first page of a PDF or text document and on each applicable web page. Do not use the official logo or imitate official trade dress.\n\nThe guidelines exclude AI-created material, republished or translated Delta Green publications, original fiction, and apps or other executables. They describe permitted scenarios, monsters, rituals, characters and actual plays, as well as a limited exception for subscriber-funded actual-play and discussion podcasts. Read the full guidelines for scope, title rules and exceptions; a notice alone does not grant permission.\n\n'
  }
 ]
};
