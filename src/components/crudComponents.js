import css from '@/styles/estilos.module.scss';

export function input(props) {
    return (
        <>
            <label className={css.lbl}>{props.nome}</label>
            <br />
            <input className={css.formInput} type={props.tipo} name={props.nome}></input>
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
