import { Basket } from "./Basket";
import { Resume } from "./Resume";

export function StepOne({ games }) {
    return (
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-0">
            <div className="w-full lg:w-[65%] lg:pr-5">
                <Basket games={games} />
            </div>

            <div className="w-full lg:w-[35%] lg:pl-5">
                <Resume games={games} />
            </div>
        </div>
    );
}
