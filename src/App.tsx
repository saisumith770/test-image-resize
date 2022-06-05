import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import Slider from "@mui/material/Slider";

function App() {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const [imageScale, setImageScale] = useState(50);

	const resizeFile = (file: File) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				300 * (imageScale / 100 + 0.5),
				300 * (imageScale / 100 + 0.5),
				"PNG",
				100,
				0,
				(uri) => {
					resolve(uri);
				},
				"file"
			);
		});

	useEffect(() => {
		file && resizeFile(file).then((data) => setImage(URL.createObjectURL(data as File)));
	}, [file, imageScale]);
	return (
		<div className="App">
			<input
				type="file"
				onChange={(event) => {
					const file = event.target.files![0];
					setFile(file);
				}}
			/>
			{image && (
				<>
					<img src={image} />
					<Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={(e, val) => setImageScale(val as number)} />
				</>
			)}
		</div>
	);
}

export default App;
