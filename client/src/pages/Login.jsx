import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../Context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";

const LoginSchema = z.object({
    email: z.string().email().min(1, "Email Required"),
    password: z.string().min(8, "Password Should be at least 8 Characters"),
});

export default function Login() {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    function onSubmit(data) {
        login.mutate(data);
    }

    const formError = login.error ? login.error.response.data.message : "";

    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                error={formError}
                title="Login"
            >
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
                    disabled={login.isLoading}
                    type="submit"
                    className="col-span-full"
                >
                    {login.isLoading ? "Logging In" : "Login"}
                </Button>
            </Form>
        </>
    );
}
