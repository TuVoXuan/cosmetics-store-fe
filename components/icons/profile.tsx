import React, { SVGProps } from "react";

function Profile(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 32 32"
			height={24}
			width={24}
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M28 30v-3a6 6 0 00-6-6H10a6 6 0 00-6 6v3M16 14a6 6 0 100-12 6 6 0 000 12z"
			></path>
		</svg>
	);
}

export default Profile;
