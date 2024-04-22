import { create } from "zustand";

const useEventStore = create((set) => ({
	Events: [],
	createevent: (event) => set((state) => ({ events: [event, ...state.events] })),
	deleteevent: (id) => set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
	setEvents: (events) => set({ events }),
	addComment: (eventId, comment) =>
		set((state) => ({
			events: state.events.map((event) => {
				if (event.id === eventId) {
					return {
						...event,
						comments: [...event.comments, comment],
					};
				}
				return event;
			}),
		})),
}));

export default useEventStore;
