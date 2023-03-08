import React from "react";

const Overlay = React.forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div
			ref={ref}
			className="fixed top-0 left-0 z-10 hidden w-screen h-screen dark:bg-light-24 bg-black-dark-4 bg-opacity-40"
		></div>
	);
});

Overlay.displayName = "Overlay";

export default Overlay;
