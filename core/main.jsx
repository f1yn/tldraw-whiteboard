import './main.css';

import React from 'react';
import { render } from 'react-dom';
import { Tldraw, useFileSystem } from '@tldraw/tldraw';

import useLocalStorage from './useLocalStorage';

function Whiteboard() {
	const fileSystemEvents = useFileSystem();
	const localStorageEvents = useLocalStorage(fileSystemEvents);

	return (
		<Tldraw
			showMultiplayerMenu={false}
			{...fileSystemEvents}
			{...localStorageEvents}
		/>
	);
}

render(<Whiteboard />, document.body);
