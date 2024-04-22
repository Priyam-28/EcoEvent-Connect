import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEventStore from "../store/eventStore";

const useGetFeedevents = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { events, setEvents } = useEventStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getFeedEvents = async () => {
			setIsLoading(true);
			// if (authUser.following.length === 0) {
			// 	setIsLoading(false);
			// 	setEvents([]);
			// 	return;
			// }
            const q = collection(firestore, "events");

			try {
				const querySnapshot = await getDocs(q);
				const feedevents = [];

				querySnapshot.forEach((doc) => {
					feedevents.push({ id: doc.id, ...doc.data() });
				});

				feedevents.sort((a, b) => b.createdAt - a.createdAt);
				setEvents(feedevents);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedEvents();
	}, [authUser, showToast, setEvents, setUserProfile]);

	return { isLoading, events };
};

export default useGetFeedevents;
