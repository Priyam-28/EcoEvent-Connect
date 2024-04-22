import CreateEvent from "./CreateEvent";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			{/* <Notifications /> */}
			<CreateEvent />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
