import { Home } from "@/components/Home";
import { BannerAd, BarTrust } from "@/components/Shared";

export const metadata = {
    title: "Ecommerce Gaming",
    description: "Tienda online de videojuegos",
};

const platformsId = {
    playstation: 2,
    xbox: 4,
    nintendo: 6,
    pc: 8
};

function Container({ children }) {
    return (
        <div className="mx-auto w-full max-w-[1127px] px-4 sm:px-6 lg:px-8 xl:px-0">
            {children}
        </div>
    );
}

function Separator({ height }) {
    return <div aria-hidden="true" style={{ height }} />;
}

export default function HomePage() {
    return (
        <div className="-mt-24">
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
        </div>
    );
}
