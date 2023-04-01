import './main.css';

import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Tldraw, useFileSystem } from '@tldraw/tldraw';

import useLocalStorage from './useLocalStorage';
import useDynamicTitle from './useDynamicTitle';

function Whiteboard() {
	const tlDrawProps = useTlDrawProps();

	return (
		<Tldraw
			showMultiplayerMenu={false}
			{...tlDrawProps}
		/>
	);
}
               
function useTlDrawProps() {
	const fileSystemEvents = useFileSystem();
	const localStorageEvents = useLocalStorage();
	const dynamicTitleEvents = useDynamicTitle();

	// Create list of hook outputs. Overrides at the end of the list will take precedence over earlier items.
	const tlDrawHooks = [fileSystemEvents, localStorageEvents, dynamicTitleEvents]; 

	return useMemo(() => Object.assign({},
		// Combine tlDraw hook output in order of first-to-last
		...tlDrawHooks,
		// For each known callback that we are overriding, create a proxy chain
		// so we can combine multiple callbacks
		...['onPersist', 'onNewProject'].map((callbackNameKey) => ({
			// create the named proxy method
			[callbackNameKey]: (...args) =>
				tlDrawHooks.forEach(hookOutput => 
					hookOutput[callbackNameKey]?.(...args)
				)
		}))
	), tlDrawHooks);
}

createRoot(document.body).render(<Whiteboard />);
