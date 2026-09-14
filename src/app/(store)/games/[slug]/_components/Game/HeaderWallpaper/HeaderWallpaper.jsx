import Image from "next/image";

export function HeaderWallpaper({ image, alt = "Wallpaper del juego" }) {
    if (!image) {
        return null;
    }

    return (
        <div
            className="
                relative flex h-[500px] w-full
                after:absolute after:bottom-[-1px] after:left-0
                after:z-10 after:h-[60px] after:w-full
                after:bg-background
                after:[clip-path:polygon(0_100%,100%_100%,0_0)]
            "
        >
            <Image
                src={image}
                alt={alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
        </div>
    );
}
