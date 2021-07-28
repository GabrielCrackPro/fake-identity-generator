const API_URL = 'https://randomuser.me/api/'

const elements = document.querySelectorAll('.element')
const refreshButton = document.querySelector('#refresh-btn')

const randomEmailDomain = () => {
  let emailDomains = ['@gmail.com', '@yahoo.com', '@outlook.com']
  const randomIndex = Math.floor(Math.random() * emailDomains.length)

  return emailDomains[randomIndex]
}
const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
const getIdentity = async () => {
  const data = await fetch(API_URL).then((response) => response.json())
  let identity = data.results[0]

  return {
    seed: `https://randomuser.me/api/?seed=${data.info.seed}`,
    name: `${identity.name.first} ${identity.name.last}`,
    image: identity.picture.large,
    imageLink: identity.picture.large,
    gender: capFirstLetter(identity.gender),
    birth: formatDate(identity.dob.date),
    phone: identity.cell,
    email: identity.email.split('@')[0] + randomEmailDomain(),
    country: identity.location.country,
    state: identity.location.state,
    street: `${identity.location.street.name} ${identity.location.street.number}`,
    coordinates: `Long ${identity.location.coordinates.longitude} Lat ${identity.location.coordinates.latitude}`
  }
}
const showIdentity = async () => {
  const person = await getIdentity()

  //Render in Html
  elements.forEach((el) => {
    if (el.id === 'image') el.setAttribute('src', person.image)
    else if (el.id === 'imageLink' || el.id === 'seed')
      el.setAttribute('href', person[el.id])
    else el.innerHTML = person[el.id]
  })
  //copy to clipboard
  elements.forEach((el) => {
    if (el.nodeName === 'P') {
      const text = el.lastChild?.textContent

      el.addEventListener('click', () => {
        navigator.clipboard.writeText(text)
        el.innerHTML += '  Copied'

        setTimeout(() => {
          el.innerHTML = el.innerHTML.replace('  Copied', '')
        }, 1000)
      })
    }
  })
}

refreshButton.addEventListener('click', () => location.reload())
window.onload = showIdentity()
