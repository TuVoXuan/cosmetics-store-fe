import React, { SVGProps } from "react";

function Twitter(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M22 4.009a9.991 9.991 0 01-2.855 1.364 4.087 4.087 0 00-2.084-1.254 4.148 4.148 0 00-2.44.144 4.06 4.06 0 00-1.918 1.488A3.94 3.94 0 0012 8.048v.892a9.848 9.848 0 01-4.608-1.012 9.64 9.64 0 01-3.574-3.027S.182 12.926 8.364 16.492A10.734 10.734 0 012 18.276c8.182 4.458 18.182 0 18.182-10.254-.001-.249-.025-.497-.073-.74A6.852 6.852 0 0022 4.008z"
			></path>
		</svg>
	);
}

export default Twitter;
