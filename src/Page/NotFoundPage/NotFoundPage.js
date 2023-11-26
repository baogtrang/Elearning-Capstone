import React from "react";
import Lottie from "react-lottie";
import notFoundAnimation from "./NotFoundAnimation.json";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFoundAnimation, // The animation data imported from the JSON file
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="not-found-page">
            <h1>Page Not Found</h1>
            <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false} />

            <button onClick={()=>navigate("/")}>Go back to main page</button>
        </div>
    );
}