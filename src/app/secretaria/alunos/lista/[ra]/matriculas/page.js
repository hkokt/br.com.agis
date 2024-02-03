import cardStyle from '@/styles/card.module.css'

export default function Page({ params }) {
    return (
        <>
            <div className={cardStyle.card}>
                <div className={cardStyle.cardHead}>
                    <a href='#'>Nome da Disciplina</a>
                </div>
                <div className={cardStyle.cardBody}>
                    <p>Nome: Nome do Professor</p>
                    <p>Situação: cursando</p>
                </div>
            </div>

            <div className={cardStyle.card}>
                <div className={cardStyle.cardHead}>
                    <a href='#'>Nome da Disciplina</a>
                </div>
                <div className={cardStyle.cardBody}>
                    <p>Nome: Nome do Professor</p>
                    <p>Situação: cursando</p>
                </div>
            </div>
        </>
    )
}