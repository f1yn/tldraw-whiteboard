import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const persistKey = '__WHITEBOARD_PERSIST';

// Some secure environments might not give us ANY access to persistence
// instead of crashing, let us be smart about it
const localStorageProxy = {
	setValue(newValue) {
		try {
			if (newValue === null) {
				return localStorage.removeItem(persistKey);
			}
			return localStorage.setItem(persistKey, JSON.stringify(newValue));
		} catch (_e) {}
	},
	getValue() {
		try {
			return JSON.parse(localStorage.getItem(persistKey) || null);
		} catch (_e) {}
	},
};

const debouncedPersistStateToStorage = debounce((app) => {
	localStorageProxy.setValue(app.document);
}, 2000);

/**
 * Allows persisting via browser localStorage between saves to help deter data-loss
 * @param {*} fileSystemEvents
 */
export default function useLocalStorage(fileSystemEvents) {
	return useMemo(() => {
		const initialDocument = localStorageProxy.getValue();

		return {
			document: initialDocument || undefined,
			onPersist(app) {
				debouncedPersistStateToStorage(app);
			},
			onNewProject(app, openDialog) {
				// erase persist
				localStorageProxy.setValue(null);
				// proxy callback to fs event
				return fileSystemEvents.onNewProject(app, openDialog);
			},
		};
	}, [fileSystemEvents.onNewProject]);
}
