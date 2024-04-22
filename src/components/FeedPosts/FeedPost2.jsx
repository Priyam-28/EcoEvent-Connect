import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost2 = ({ event }) => {
	const { userProfile } = useGetUserProfileById(event.createdBy);

	return (
		<>
			<PostHeader post={event} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={event.imageURL} alt={"FEED POST IMG"} />
			</Box>
			<PostFooter post={event} creatorProfile={userProfile} />
		</>
	);
};

export default FeedPost2;
