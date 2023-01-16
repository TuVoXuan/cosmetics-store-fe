import RadioInput from "../components/inputs/radio-input";
import MainLayout from "../layout/main-layout";

export default function Home() {
	return (
		<RadioInput>
			Remember me
			<a className="underline" href="www.google.com.vn">
				google
			</a>
		</RadioInput>
	);
}
