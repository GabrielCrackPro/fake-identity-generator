const API_URL = "https://randomuser.me/api/";

const identityContainer = document.querySelector(".identity-container");

const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
const getIdentity = async () => {
  let data = await fetch(API_URL).then((response) => response.json());
  return data;
};
const showIdentity = async () => {
  let data = await getIdentity();
  let identity = data.results[0];
  const person = {
    name: `${identity.name.first} ${identity.name.last}`,
    gender: capFirstLetter(identity.gender),
    birth: formatDate(identity.dob.date),
    phone: identity.cell,
    email: identity.email,
    location: {
      country: identity.location.country,
      state: identity.location.state,
      street: `${identity.location.street.name} ${identity.location.street.number}`,
      coordinates: {
        long: identity.location.coordinates.longitude,
        lat: identity.location.coordinates.latitude,
      },
    },
  };
  console.log(identity);
  identityContainer.innerHTML = `
  <div class="card rounded rounded-3 text-white bg-primary" style="width: 40rem;">
  <img src="${identity.picture.large}" class="card-img-top" width="150" height=250" alt="face">
  <div class="card-body">
    <h5 class="card-title">${person.name}</h5>
  <h5 class="text-center"><i class="fas fa-user-lock"></i> Personal Information</h5>
    <p>Gender: ${person.gender}</p>
    <p>Birth Date: ${person.birth}</p>
    <p>Phone Number: ${person.phone}</p>
    <p>Email: ${person.email}</p>
  <h5 class="text-center"><i class="fas fa-map-marker-alt"></i> Location</h5>
  <p>Country: ${person.location.country}</p>
  <p>State/Province: ${person.location.state}</p>
  <p>Street: ${person.location.street}</p>
  <p>Coordinates: Long ${person.location.coordinates.long} Lat ${person.location.coordinates.lat}</p>
  </div>
</div>
  `;
};
window.onload = showIdentity();
