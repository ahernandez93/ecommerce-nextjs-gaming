import { Home } from "@/components/Home";
import { BannerAd, BarTrust, Container, Separator } from "@/components/Shared";

const platformsId = {
    playstation: 2,
    xbox: 4,
    nintendo: 6,
    pc: 8
};

export default function HomePage() {
    return (
        <>
            <Home.BannerLastGamePublished />

            <Separator height={100} />

            <Container>
                <Home.LatestGames title="Últimos lanzamientos" />
            </Container>

            <Separator height={100} />

            <BarTrust />

            <Separator height={100} />

            <Container>
                <Home.LatestGames
                    title="PlayStation"
                    limit={3}
                    platformId={platformsId.playstation}
                />
            </Container>

            <Separator height={100} />

            <BannerAd
                title="Regístrate y obtén los mejores precios"
                subtitle="¡Compara con otros juegos y elige el tuyo!"
                btnTitle="Entrar ahora"
                btnLink="/account"
                image="/images/img01.png"
            />

            <Separator height={50} />

            <Container>
                <Home.LatestGames
                    title="Xbox"
                    limit={3}
                    platformId={platformsId.xbox}
                />
            </Container>

            <Separator height={100} />
        </>
    );
}
