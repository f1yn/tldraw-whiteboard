import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const debouncedUpdateWindowTitle= debounce((app) => {
    const page = app.getPage();
    const targetDocumentTitle = `Whiteboard - ${page.name}`;

    // Only update the document title if it's relevant
	if (document.title !== targetDocumentTitle) {
        document.title = targetDocumentTitle;
    }
}, 200);

export default function useDynamicTitle() {
    return useMemo(() => ({
        onPersist: debouncedUpdateWindowTitle,
    }), []);
}