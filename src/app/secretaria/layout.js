"use client"

import Nav from "@/components/navComponent";

export default function SecLayout({ children }) {
    return (
        <section>
            <Nav />
            {children}
        </section>
    )
}