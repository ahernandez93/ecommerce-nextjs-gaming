import { Container } from "@/components/Shared";

export function Info({ game }) {
    return (
        <Container className="flex">
            <div className="w-1/2 py-5 pr-5">
                <p className="leading-[25px] text-muted-foreground">
                    {game.summary}
                </p>
            </div>

            <div className="w-1/2 py-5 pl-5">
                <ul className="m-0 list-none p-0">
                    <li className="pb-[5px]">
                        <span className="text-muted-foreground">
                            Fecha de lanzamiento:
                        </span>{" "}
                        {game.releaseDate}
                    </li>
                </ul>
            </div>
        </Container>
    );
}
