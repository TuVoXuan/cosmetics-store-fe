import ToggleBtn from "../components/buttons/toggle-btn";
import Footer from "../components/footer";
import Header from "../components/header";
import Input from "../components/inputs/input";
import SearchInput from "../components/inputs/search-input";

export default function Home() {
	return (
		<div className="dark:bg-black-dark-3">
			<Input label="Your name" placeholder="Aa..." />
			<ToggleBtn />
		</div>
	);
}
