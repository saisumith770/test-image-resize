import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UploadFiles: React.FC<{ setFile: React.Dispatch<React.SetStateAction<File | null>> }> = ({ setFile }) => {
	return (
		<label htmlFor="contained-button-file">
			<input
				accept="image/*"
				id="contained-button-file"
				multiple
				type="file"
				onChange={(event) => {
					const file = event.target.files![0];
					setFile(file);
				}}
				style={{
					display: "none",
				}}
			/>
			<Button
				variant="contained"
				component="span"
				sx={{
					width: "80%",
					height: "50px",
					position: "relative",
					left: "50%",
					transform: "translate(-50%, 0)",
					margin: 1,
				}}
			>
				Upload
			</Button>
		</label>
	);
};

function App() {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const [imageScale, setImageScale] = useState(50);

	const [title, setTitle] = useState<string>("");
	const [caption, setCaption] = useState<string>("");

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
		<div style={{ display: "flex", width: "100%", height: "100%", position: "absolute", top: "0", left: "0" }}>
			<div style={{ backgroundColor: "#1A1B1A", width: "60%", height: "100%" }}>
				{image && (
					<div
						style={{
							width: "60%",
							height: "95%",
							backgroundColor: "white",
							position: "relative",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{title !== "" && <h4>{title}</h4>}
						<img src={image} />
						{caption !== "" && <h4>{caption}</h4>}
					</div>
				)}
			</div>
			<div style={{ backgroundColor: "#343535", width: "40%", height: "100%" }}>
				<UploadFiles setFile={setFile} />
				{image && (
					<>
						<Slider
							defaultValue={50}
							aria-label="Default"
							valueLabelDisplay="auto"
							onChange={(e, val) => setImageScale(val as number)}
							sx={{ width: "80%", position: "relative", left: "50%", transform: "translate(-50%, 0)", margin: 1 }}
						/>
						<TextField
							id="image-title"
							label="Title"
							variant="outlined"
							color="primary"
							sx={{
								width: "80%",
								position: "relative",
								left: "50%",
								transform: "translate(-50%, 0)",
								margin: 1,
							}}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<TextField
							id="image-caption"
							label="Caption"
							variant="outlined"
							color="primary"
							sx={{
								width: "80%",
								position: "relative",
								left: "50%",
								transform: "translate(-50%, 0)",
								margin: 1,
							}}
							onChange={(e) => {
								setCaption(e.target.value);
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
