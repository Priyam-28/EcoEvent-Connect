import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import useeventStore from '../store/eventStore';
import useUserProfileStore from '../store/userProfileStore';
import { useLocation } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function useCreateEvent() {
    const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createevent = useeventStore((state) => state.createevent);
	const addevent = useUserProfileStore((state) => state.addevent);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreateevent = async (title,selectedFile, description,from,to,cause) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newevent = {
            title:title,
			description: description,
            from:from,
            to:to,
            cause:cause,
			likes: [],
            category:"",
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const eventDocRef = await addDoc(collection(firestore, "events"), newevent);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `events/${eventDocRef.id}`);

			await updateDoc(userDocRef, { events: arrayUnion(eventDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(eventDocRef, { imageURL: downloadURL });

			newevent.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createevent({ ...newevent, id: eventDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid) addevent({ ...newevent, id: eventDocRef.id });

			showToast("Success", "event created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};
    return { isLoading, handleCreateevent };
}
