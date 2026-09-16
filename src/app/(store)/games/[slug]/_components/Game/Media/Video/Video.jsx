"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-secondary" />,
});

export function Video({ video }) {
    if (!video) {
        return null;
    }

    return (
        <div
            className="
                aspect-video w-full overflow-hidden
                rounded-2xl bg-black
            "
        >
            <ReactPlayer
                src={video}
                controls
                playsInline
                width="100%"
                height="100%"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}
