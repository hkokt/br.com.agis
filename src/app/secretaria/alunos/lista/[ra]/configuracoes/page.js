import btStyle from '@/styles/botoes.module.css'

export default function Page({ params }) {
    return (
        <>
            <h2 style={{borderBottom: '1px solid gray'}}>Trancar Matricula</h2>
            <article>

                <p style={{padding: '0.75em 0em', margin: '0'}}>Trancar matricula do aluno: {params.ra}</p>
                <button className={btStyle.btForm} style={{marginBottom: '2em'}}>Trancar</button>
                
            </article>

            <h2 style={{borderBottom: '1px solid gray'}}>Gerar Histórico</h2>
            <article>

                <p style={{padding: '0.75em 0em', margin: '0'}}>Gera o histório do semestre atual: </p>
                <button className={btStyle.btForm} style={{marginBottom: '2em'}}>Gerar</button>

                <p style={{padding: '0.75em 0em', margin: '0'}}>Gera o histório completo: </p>
                <button className={btStyle.btForm} style={{marginBottom: '2em'}}>Gerar</button>

            </article>

        </>
    )
}