import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import axios from "../lib/axios";

import { AiFillLike as LikeIcon } from "react-icons/ai";
import { FcLike as SuperLikeIcon } from "react-icons/fc";
import { BiBlock as BlockIcon } from "react-icons/bi";

import { useAuth } from "../Context/AuthContext";
import { useNotify } from "../Context/Notification";

import Button from "./Button";

export default function User({ id, email }) {
    const [src, setSrc] = useState("");
    const { token } = useAuth();
    const { setNotify } = useNotify();

    const client = useQueryClient();

    const images = useQuery({
        queryKey: ["images", `image-${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`/api/users/${id}/image`, {
                headers: {
                    Authorization: `Bearer ${token || ""}`,
                },
                responseType: "blob",
            });
            return data;
        },
        onSuccess(data) {
            setSrc(URL.createObjectURL(data));
        },
        onError(err) {
            console.error(err);
        },
    });

    const like = useMutation({
        mutationFn: async () => {
            return await (
                await axios.post(
                    "/api/users/like",
                    {
                        userId: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token || ""}`,
                        },
                    },
                )
            ).data;
        },
        onSuccess() {
            setNotify({
                message: `You Liked ${email}`,
                type: "success",
            });
        },
    });

    const superLike = useMutation({
        mutationFn: async () => {
            return await (
                await axios.post(
                    "/api/users/super-like",
                    {
                        userId: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token || ""}`,
                        },
                    },
                )
            ).data;
        },
        onSuccess() {
            setNotify({
                message: `You Super Liked ${email}`,
                type: "success",
            });
        },
    });

    const block = useMutation({
        mutationFn: async () => {
            return await (
                await axios.post(
                    "/api/users/block",
                    {
                        userId: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token || ""}`,
                        },
                    },
                )
            ).data;
        },
        onSuccess() {
            setNotify({
                message: `You Blocked ${email}`,
                type: "success",
            });
            client.invalidateQueries("getImages");
        },
    });

    if (images.isLoading) {
        return "loading...";
    }

    return (
        <div className="flex items-center justify-center relative w-full h-96 overflow-hidden">
            <img className="h-full object-contain" src={src} alt="" />
            <div className="absolute top-1 bg-slate-50 bg-opacity-70 rounded-full px-4 py-1">
                <h3 className="text-lg font-semibold uppercase">{email}</h3>
            </div>

            <div className="flex items-center justify-center gap-2 absolute bottom-1">
                <Button
                    disabled={like.isLoading}
                    onClick={() => like.mutate()}
                    className="text-2xl w-min rounded-full border-0 bg-rose-600 hover:bg-rose-500 focus:bg-rose-500"
                >
                    <LikeIcon />
                </Button>
                <Button
                    disabled={superLike.isLoading}
                    onClick={() => superLike.mutate()}
                    className="text-2xl w-min rounded-full border-0 bg-yellow-300 hover:bg-yellow-200 focus:bg-yellow-200"
                >
                    <SuperLikeIcon />
                </Button>
            </div>
            <Button
                disabled={block.isLoading}
                onClick={() => block.mutate()}
                className="absolute top-1 right-1 text-sm w-min rounded-full border-0 bg-red-700 hover:bg-red-600 focus:bg-red-600"
            >
                <BlockIcon />
            </Button>
        </div>
    );
}
