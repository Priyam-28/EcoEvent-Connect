import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedPost2 from "./FeedPost2";
import useGetFeedevents from "../../hooks/useGetUserEvents";


const FeedPosts2 = () => {
	const { isLoading, events } = useGetFeedevents();
    
    console.log(events);

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && events.length > 0 && events.map((event) => <FeedPost2 key={event.id} event={event} />)}
			{!isLoading && events.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"} align={"center"}>
						Dayuum. Looks Like there is no event currently available
					</Text>
					<Text color={"white.400"} align={"center"}>Don&apos;t stop exploring </Text>
				</>
			)}
		</Container>
	);
};

export default FeedPosts2;
