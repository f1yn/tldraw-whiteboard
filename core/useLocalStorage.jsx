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
		} catch (_e) { }
	},
	getValue() {
		try {
			return JSON.parse(localStorage.getItem(persistKey) || null);
		} catch (_e) { }
	},
};

const debouncedPersistStateToStorage = debounce((app) => {
	localStorageProxy.setValue({ initialSettings: app.settings, initialDocument: app.document });
}, 1000);

/**
 * Allows persisting via browser localStorage between saves to help deter data-loss
 * @param {*} fileSystemEvents
 */
export default function useLocalStorage() {
	return useMemo(() => {
		const { initialSettings, initialDocument } = localStorageProxy.getValue() || {};

		return {
			document: initialDocument,
			onMount(app) {
				if (!initialSettings) return;
				app.setSetting('isDarkMode', initialSettings.isDarkMode);
				app.setSetting('showGrid', initialSettings.showGrid);
			},
			onPersist(app) {
				debouncedPersistStateToStorage(app);
			},
			onNewProject() {
				localStorageProxy.setValue(null);
			},
		}
	}, []);
}
