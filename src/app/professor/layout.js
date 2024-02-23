"use client"

import { navProf } from "@/components/navComponent";

export default function ProfLayout({ children }) {
    return (
        <section>
            {navProf()}
            {children}
        </section>
    );
}