import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "../lib/axios";
import { useNotify } from "../Context/Notification";

import Button from "../components/Button";
import Form from "../components/Form";
import ImagePreviewInput from "../components/ImagePreviewInput";

const RegisterSchema = z.object({
    email: z.string().email().min(1, "Email Required"),
    password: z.string().min(8, "Password Should be at least 8 Characters"),
});

export default function Register() {
    const { setNotify } = useNotify();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const registerUser = useMutation({
        mutationFn: async (formData) => {
            return await (
                await axios.post("/api/auth/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            ).data;
        },
        onSuccess({ message }) {
            setNotify({
                message: "Registered Successfully",
                type: "success",
            });
            navigate("/login");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterSchema),
    });

    function handleClick(e) {
        if (image == null) {
            setImageError("Image Required");
            e.preventDefault();
            return;
        }
    }

    function onSubmit({ email, password }) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        registerUser.mutate(formData);
    }

    const formError = registerUser.error
        ? registerUser.error.response.data.message
        : "";

    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                error={formError}
                title="Register"
            >
                <Form.CustomField>
                    <ImagePreviewInput
                        onChange={({ file, error }) => {
                            setImage(file);
                            setImageError(error);
                        }}
                        label="Profile Image"
                    />
                </Form.CustomField>
                <Form.Error align="center">{imageError}</Form.Error>
                <Form.Field
                    label="Email"
                    inputProps={register("email")}
                    error={errors.email?.message || ""}
                />
                <Form.Field
                    label="Password"
                    inputProps={{ ...register("password"), type: "password" }}
                    error={errors.password?.message || ""}
                />

                <Button
                    disabled={registerUser.isLoading}
                    type="submit"
                    className="col-span-full"
                    onClick={handleClick}
                >
                    {registerUser.isLoading ? "Registering..." : "Register"}
                </Button>
            </Form>
        </>
    );
}
