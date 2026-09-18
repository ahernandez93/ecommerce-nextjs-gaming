import { CartContent } from "./_components/CartContent";

function parseStep(value) {
    const parsedStep = Number.parseInt(value ?? "1", 10);

    return [1, 2, 3].includes(parsedStep) ? parsedStep : 1;
}

export default async function CartPage({ searchParams }) {
    const params = await searchParams;

    const currentStep = parseStep(params?.step);

    return <CartContent currentStep={currentStep} />;
}
