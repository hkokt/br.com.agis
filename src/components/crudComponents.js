import css from '@/styles/estilos.module.scss';

export function input(props) {
    const id = props.tipo + props.nome;

    return (
        <>
            <label className={css.lbl} htmlFor={id}>{props.nome}</label>
            <br />
            <input className={css.formInput} type={props.tipo} name={props.nome} id={id} />
        </>
    )
}


export function select(props) {
    return (
        <>
            <label className={css.lbl}>{props.name}</label>
            <select className={css.formInput} id={props.nome}>
                {
                    props.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))
                }
            </select>
        </>
    )
}
