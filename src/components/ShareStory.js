import React from "react";
import { RWebShare } from "react-web-share";

export default function WebShareStory(content,title) {
	return (
			<RWebShare
				data={{
					text: `${content}`,
					url: "http://localhost:3000",
					title: `AI Generated Story for Title: ${title}`,
				}}
				onClick={() => console.log("shared successfully!")}
			>
				<button  className="btn btn-success m-2" >Share on Web</button>
			</RWebShare>
	);
};
