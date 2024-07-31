import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getFeedPosts = async () => {
			setIsLoading(true);

			// If the user is not following anyone, no need to fetch events
			if (authUser.following.length === 0) {
				setIsLoading(false);
				setPosts([]); // Clear posts if there are no followings
				return;
			}

			// Querying the "events" collection where "createdBy" is in the user's following list
			const q = query(collection(firestore, "events"), where("createdBy", "in", authUser.following));
			
			try {
				const querySnapshot = await getDocs(q);
				const feedPosts = [];

				// Looping through the documents and adding them to the feedPosts array
				querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

				// Sorting the posts by creation date, newest first
				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(feedPosts);
			} catch (error) {
				// Displaying a toast message in case of an error
				showToast("Error", error.message, "error");
			} finally {
				// Indicating that the loading process has finished
				setIsLoading(false);
			}
		};

		// Fetch the feed posts if the user is authenticated
		if (authUser) getFeedPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts };
};

export default useGetFeedPosts;
