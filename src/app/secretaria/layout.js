"use client"

import { navSec }  from "@/components/navComponent";

export default function SecLayout({ children }) {
    return (
        <section>
            {navSec()}
            {children}
        </section>
    )
}