export class Api {
    static async getUserCity () {
        const data = await fetch("https://api.hgbrasil.com/weather?format=json-cors&key=fa64b44d&user_ip=remote", {
            method: "GET",
            mode: "cors",
            
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
        return data
    }
    static async getCityByName (name) {
        const data = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=fa64b44d&city_name=${name}`, {
            method: "GET",
            mode: "cors",
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => console.log(err))
        return data
    }
}

export async function renderPage() {
    const data = await Api.getUserCity()
    return data
}