import { Container, Separator } from "@/components/Shared";

import { Gallery } from "./Gallery";
import { Video } from "./Video";

export function Media({ video, screenshots = [] }) {
    const hasVideo = Boolean(video);
    const hasScreenshots = screenshots.length > 0;

    if (!hasVideo && !hasScreenshots) {
        return null;
    }

    return (
        <Container>
            <h2 className="text-2xl font-semibold">Visuales</h2>

            <Separator height={30} />

            {hasVideo && <Video video={video} />}

            {hasVideo && hasScreenshots && <Separator height={30} />}

            {hasScreenshots && <Gallery screenshots={screenshots} />}
        </Container>
    );
}
