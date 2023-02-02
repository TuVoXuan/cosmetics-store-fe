import dynamic from "next/dynamic";
import React, { useState } from "react";
import ReactQuill from "react-quill";
// import ReactQuill from "react-quill";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { formats, modules } from "./quill-editor-toolbar";

export const Editor = () => {
	const [value, setValue] = useState("");
	const handleChange = (value: string) => {
		setValue(value);
	};
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: value }}></div>
			<div className="mx-auto my-0">
				<QuillToolbar />
				<QuillNoSSRWrapper
					theme="snow"
					value={value}
					onChange={(value) => {
						const newValue = value.replaceAll("<ul>", "<ul class='list-disc ml-6'>");
						const newValue1 = newValue.replaceAll("<h1>", "<h1 class='text-heading-1'>");
						const newValue2 = newValue1.replaceAll("<h2>", "<h2 class='text-heading-2'>");
						const newValue3 = newValue2.replaceAll("<h3>", "<h3 class='text-heading-3'>");
						const newValue4 = newValue3.replaceAll("<h4>", "<h4 class='text-heading-4'>");
						const newValue5 = newValue4.replaceAll("<h5>", "<h5 class='text-heading-5'>");
						const newValue6 = newValue5.replaceAll("<ol>", "<ol class='list-decimal ml-6'>");
						setValue(newValue6);
					}}
					placeholder={"Write something awesome..."}
					modules={modules}
					formats={formats}
				/>
			</div>
		</>
	);
};

export default Editor;
