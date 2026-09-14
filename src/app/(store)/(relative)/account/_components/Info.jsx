import { UserRound } from "lucide-react";

function formatMemberDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("es-HN", {
        dateStyle: "medium",
    }).format(date);
}

export function Info({ user }) {
    const memberSince = formatMemberDate(user.createdAt);

    return (
        <section className="flex flex-col items-center pt-[70px] text-center">
            <div
                aria-hidden="true"
                className="mb-5 flex size-[100px] cursor-default items-center justify-center rounded-[20px] bg-secondary"
            >
                <UserRound className="size-[50px]" />
            </div>

            <h1 className="mb-[5px] text-3xl font-semibold">{user.username}</h1>

            <p className="mb-2.5 font-bold">{user.email}</p>

            {memberSince && (
                <p className="text-xs text-muted-foreground">
                    Miembro desde: {memberSince}
                </p>
            )}
        </section>
    );
}
