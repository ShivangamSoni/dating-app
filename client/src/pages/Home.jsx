import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import axios from "../lib/axios";

import { useAuth } from "../Context/AuthContext";

import Button from "../components/Button";
import Card from "../components/Card";
import User from "../components/User";

export default function Home() {
    const { token } = useAuth();
    const [activeImage, setActiveImage] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const images = useQuery({
        queryKey: ["getImages", pageNum],
        queryFn: async () => {
            const { data } = await axios.get("/api/users/", {
                headers: {
                    Authorization: `Bearer ${token || ""}`,
                },
                params: {
                    p: pageNum,
                },
            });

            return data;
        },
        onError(err) {
            console.error(err);
        },
    });

    useEffect(() => {
        if (images.data && pageNum > images.data.totalPages) {
            setPageNum(images.data.totalPages);
        }
    }, [images]);

    function handleNext() {
        let idx = activeImage + 1;
        if (idx >= images.data.users.length) {
            idx = 0;
            setPageNum((prev) => {
                let newPage = prev + 1;
                newPage =
                    newPage > images.data.totalPages
                        ? images.data.totalPages
                        : newPage;
                return newPage;
            });
        }
        setActiveImage(idx);
    }

    function handlePrev() {
        let idx = activeImage - 1;
        if (idx <= 0) {
            idx = 0;
            setPageNum((prev) => {
                let newPage = prev - 1;
                newPage = newPage <= 0 ? 1 : newPage;
                return newPage;
            });
        }
        setActiveImage(idx);
    }

    if (images.isLoading || !images.data) {
        return "loading...";
    }

    return (
        <Card>
            <Card.Body>
                <User {...images.data.users[activeImage]} />
            </Card.Body>

            <Card.Footer>
                <Card.Footer>
                    <Card.Body>
                        <div className="flex items-center justify-center gap-3">
                            <Button
                                onClick={handlePrev}
                                disabled={pageNum === 1 && activeImage === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={
                                    pageNum === images.data.totalPages &&
                                    activeImage === images.data.users.length - 1
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </Card.Body>
                </Card.Footer>
            </Card.Footer>
        </Card>
    );
}
