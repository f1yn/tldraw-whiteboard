import { Tldraw, useFileSystem } from "@tldraw/tldraw";

import useLocalStorage from "./useLocalStorage";

export default function Whiteboard() {
	const fileSystemEvents = useFileSystem();
	const localStorageEvents = useLocalStorage(fileSystemEvents);
	// TODO: Implement trusted server-side persist?

	return (
		<Tldraw
			showMultiplayerMenu={false}
			{...fileSystemEvents}
			{...localStorageEvents}
		/>
	);
}
