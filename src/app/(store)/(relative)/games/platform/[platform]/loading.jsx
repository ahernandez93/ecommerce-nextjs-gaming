import { Container, Separator } from "@/components/Shared";

export default function LoadingPlatformGames() {
    return (
        <Container>
            <Separator height={50} />

            <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index}>
                        <div className="aspect-video animate-pulse rounded-xl bg-muted" />
                        <div className="mt-3 h-5 animate-pulse rounded bg-muted" />
                    </div>
                ))}
            </div>

            <Separator height={100} />
        </Container>
    );
}
