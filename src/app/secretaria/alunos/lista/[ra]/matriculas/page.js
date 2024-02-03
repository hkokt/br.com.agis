import { card } from "@/components/layoutsComponents"

export default function Page({ params }) {
    return (
        <>
            {card(
                [
                    { titulo: 'Disciplina 1', p1: 'Professor: Nome do Professor', p2: 'Situação: ' + 'cursando' },
                    { titulo: 'Disciplina 2', p1: 'Professor: Nome do Professor', p2: 'Situação: ' + 'cursando' }
                ]
            )}
        </>
    )
}