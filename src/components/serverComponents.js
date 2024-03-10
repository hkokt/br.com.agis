'use server'

export async function getData (url) {
    try {
        const response = await axios.get(url)
        const dados = response.data
        
        const listaDeObjetos = dados.map(item => (
            {
                body: {
                    cod: item.cod,
                    titulo: `${item.sigla}/${item.turno}`,
                    p: [
                        `Curso: ${item.nome}`,
                        `Enade ${item.enade}`
                    ]
                }
            }
        ))

        return listaDeObjetos
    } catch (error) {
        console.log(error);
    }


}