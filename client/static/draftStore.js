const PREFIX = 'DG_draft_';
const ACTIVE = 'DG_activeDraft';
export function createDraftStore(storage) {
	return {
		list() {
			const result = [];
			for(let i = 0; i < storage.length; i++) {
				const key = storage.key(i);
				if(!key.startsWith(PREFIX)) continue;
				const draft = JSON.parse(storage.getItem(key));
				if(!draft?.id || typeof draft.text !== 'string') throw new Error('A browser draft could not be read. Export your open document before clearing browser data.');
				result.push(draft);
			}
			return result.sort((a, b)=>b.updatedAt.localeCompare(a.updatedAt));
		},
		save(draft) {
			const existing = JSON.parse(storage.getItem(PREFIX + draft.id) || 'null');
			if(existing && existing.revision !== draft.revision) {
				const error = new Error('This draft changed in another tab. Your edits have not overwritten that version. Export your open document or save a new copy.');
				error.code = 'CONFLICT';
				throw error;
			}
			const saved = { ...draft, revision: (draft.revision || 0) + 1, updatedAt: new Date().toISOString() };
			storage.setItem(PREFIX + draft.id, JSON.stringify(saved));
			return saved;
		},
		remove(id) { storage.removeItem(PREFIX + id); },
		active() { return storage.getItem(ACTIVE); },
		select(id) { storage.setItem(ACTIVE, id); }
	};
}
