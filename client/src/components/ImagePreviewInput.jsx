import { useRef, useState } from "react";
import Button from "./Button";

export default function ImagePreviewInput({ label, onChange }) {
    const [image, setImage] = useState("");
    const imageInput = useRef(null);

    function handleChange(e) {
        if (!e.target.files[0].type.startsWith("image/")) {
            onChange({ error: "Ony Image File can be Uploaded" });
            return;
        }

        setImage(URL.createObjectURL(e.target.files[0]));
        onChange({ file: e.target.files[0], error: "" });
    }

    function handleClick() {
        imageInput.current.click();
    }

    return (
        <div className="w-full grid">
            <span className="block w-full text-lg font-bold text-center">
                {label}
            </span>
            <div className="flex items-start justify-center mb-2 w-full overflow-hidden ">
                <img
                    className="h-full object-cover rounded-lg"
                    src={image}
                    alt=""
                />
            </div>
            <input
                className="hidden"
                type="file"
                onChange={handleChange}
                accept="image/*"
                ref={imageInput}
            />
            <Button
                type="button"
                onClick={handleClick}
                className="border-0 bg-amber-500 w-40 m-auto"
            >
                Select Image
            </Button>
        </div>
    );
}
