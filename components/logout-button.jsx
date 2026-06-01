"use client";

export function LogoutButton() {

    async function handleLogout() {

        await fetch("/api/logout", {
            method: "POST",
        });

        window.location.href = "/";
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
            Logout
        </button>
    );
}