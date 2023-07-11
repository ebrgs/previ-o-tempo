import { renderPage, Api } from "./api.js";

const dataCity = async (data) => {
    const mainContentContainer = document.querySelector(".mainContent")
    const diaSemana = document.querySelector('.diaSemana')
    let nameCity = document.createElement('h2')
    let infosDay = document.createElement('div')
    let boxInfos = document.createElement('div')
    let grausInfo = document.createElement('h2')
    let descriptionInfo = document.createElement('span')
    let imageInfo = document.createElement('img')
    let otherInfos = document.createElement('div')
    let ventosinfos = document.createElement('span')
    let umidadeInfo = document.createElement('span')

    /* const dataApiCity = await renderPage()
    const data = dataApiCity.results
    console.log(data) */

    nameCity.innerText = data.city
    grausInfo.innerText = `${data.temp}º C`
    descriptionInfo.innerText = data.description
    if(data.description == 'Tempestade forte' || data.description == 'Tempestade tropical' || data.description == 'Tempestades severas' || data.description == 'Tempestades' || data.description == 'Misto de neve e chuva' || data.description == 'Misto chuva e gelo' || data.description == 'Chuviscos' || data.description == 'Congelamento chuva' || data.description == 'Alguns chuviscos' || data.description == 'Tempestade com neve' || data.description == 'Granizo' || data.description == 'Misto chuva e granizo' || data.description == 'Tempestades isoladas' || data.description == 'Chuvas esparsas' || data.description == 'Chuviscos com neve' || data.description == 'Chuva') {
        imageInfo.src = "./assets/thunderstorm-outline.svg"
    } else if (data.description == 'Tempo nublado' || data.description == 'Poeira' || data.description == 'Neblina' || data.description == 'Fumacento' || data.description == 'Tempo frio' || data.description == 'Tempo nublado' || data.description == 'Parcialmente nublado' || data.description == 'Ensolarado com muitas nuvens' || data.description == 'Sol com poucas nuvens') {
        imageInfo.src = "./assets/solzin-com-nuvem.svg"
    } else {
        imageInfo.src = "./assets/solzin-amalielo.svg"
    }
    ventosinfos.innerHTML = `<img src="./assets/repeat-outline.svg" alt=""> Ventos: ${data.wind_speedy}`
    umidadeInfo.innerHTML = `<img src="./assets/gotinha.svg" alt=""> Umidade: ${data.humidity}%`

    nameCity.className = "nameCity"
    infosDay.className = "infosDay"
    boxInfos.className = "boxInfos"
    imageInfo.className = "imgDay"
    otherInfos.className = "otherInfos"
    diaSemana.innerText = `${data.forecast[0].weekday} ${data.forecast[0].date}`

    otherInfos.append(ventosinfos, umidadeInfo)
    boxInfos.append(grausInfo, descriptionInfo)
    infosDay.append(nameCity, boxInfos, imageInfo, otherInfos)
    
    return (infosDay)

}

const dataNextDays = async (data) => {
    let containerInfo = document.createElement('div')
    let imgInfo = document.createElement('img')
    let tempInfo = document.createElement('h3')
    let dayWeek = document.createElement('span')

    containerInfo.className = "infoNextDay"
    if(data.description == 'Tempestade forte' || data.description == 'Tempestade tropical' || data.description == 'Tempestades severas' || data.description == 'Tempestades' || data.description == 'Misto de neve e chuva' || data.description == 'Misto chuva e gelo' || data.description == 'Chuviscos' || data.description == 'Congelamento chuva' || data.description == 'Alguns chuviscos' || data.description == 'Tempestade com neve' || data.description == 'Granizo' || data.description == 'Misto chuva e granizo' || data.description == 'Tempestades isoladas' || data.description == 'Chuvas esparsas' || data.description == 'Chuviscos com neve' || data.description == 'Chuva') {
        imgInfo.src = "./assets/thunderstorm-outline.svg"
    } else if (data.description == 'Tempo nublado' || data.description == 'Poeira' || data.description == 'Neblina' || data.description == 'Fumacento' || data.description == 'Tempo frio' || data.description == 'Tempo nublado' || data.description == 'Parcialmente nublado' || data.description == 'Ensolarado com muitas nuvens' || data.description == 'Sol com poucas nuvens') {
        imgInfo.src = "./assets/solzin-com-nuvem.svg"
    } else {
        imgInfo.src = "./assets/solzin-amalielo.svg"
    }

    tempInfo.innerText = `${data.min}ºC/${data.max}ºC`
    dayWeek.innerText = data.weekday

    containerInfo.append(imgInfo, tempInfo, dayWeek)

    return containerInfo

}
async function getData () {
    const dataApiCity = await renderPage()
    const data = dataApiCity.results
    return data
}
async function listNextDays (data) {
    const secondContent = document.querySelector('.secondContent')
    secondContent.innerHTML = ""
    if(data) {
        data.forecast.forEach(async (day) => {
            const card = await dataNextDays(day)
            console.log(card)
            secondContent.appendChild(card)
        })
    }
}
async function listDay (data) {
    console.log(data)
    const mainContentContainer = document.querySelector(".mainContent")
    mainContentContainer.innerHTML = ""
    if (data) {
        const result = await dataCity(data)
        mainContentContainer.append(result)
    }
}

const buttonSearch = document.querySelector("#searchCity")

buttonSearch.addEventListener("click", searchCity)

async function searchCity () {
    const inputCityName = document.querySelector("#cityName")
    const inputStateName = document.querySelector("#states")
    const state = inputStateName.options[inputStateName.selectedIndex].value
    const city = inputCityName.value

    const query = `${city},${state}`

    const result = await Api.getCityByName(query)
    console.log(result)

    listDay(result.results)
    listNextDays(result.results)
}

const listPage = async () => {
    const data = await getData()
    listDay(data)
    listNextDays(data)
}
listPage()