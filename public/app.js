const API_URL = "https://randomuser.me/api/";

const identityContainer = document.querySelector(".identity-container");
const refreshButton = document.querySelector("#refresh-btn");

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
    seed: data.info.seed,
    name: `${identity.name.first} ${identity.name.last}`,
    image: identity.picture.large,
    gender: capFirstLetter(identity.gender),
    birth: formatDate(identity.dob.date),
    phone: identity.cell,
    email: {
      address: identity.email.split("@")[0],
      domain: ["@gmail.com", "@yahoo.com", "@outlook.com"],
    },
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
  const randomIndex = Math.floor(Math.random() * person.email.domain.length);

  identityContainer.innerHTML = `
  <div class="card rounded rounded-3 text-white text-center bg-primary" style="width: 40rem;">
  <div class="img-container">
  <a href="${person.image}" target="blank" download><img src="${
    person.image
  }" class="card-img-top" width="150" height=250" alt="face"></a>
  <div class="img-overlay position-absolute">
  <button class="btn position-absolute download-img-btn"><i class="fas fa-download"></i></button>
  </div>
  </div>
    <h5 class="card-title">${person.name}</h5>
  <h5 class="text-center"><i class="fas fa-user-lock"></i> Personal Information</h5>
    <p>Gender: ${person.gender}</p>
    <p>Birth Date: ${person.birth}</p>
    <p>Phone Number: ${person.phone}</p>
    <p>Email: ${person.email.address + person.email.domain[randomIndex]}</p>
  <h5 class="text-center"><i class="fas fa-map-marker-alt"></i> Location</h5>
  <p>Country: ${person.location.country}</p>
  <p>State/Province: ${person.location.state}</p>
  <p>Street: ${person.location.street}</p>
  <p>Coordinates: Long ${person.location.coordinates.long} Lat ${
    person.location.coordinates.lat
  }</p>
  <a href="https://randomuser.me/api/?seed=${
    person.seed
  }" target="blank" class="btn btn-secondary save-button">View JSON File</a>
  </div>
</div>
`;
  const cardText = identityContainer.querySelectorAll("p");

  cardText.forEach((text) => {
    text.addEventListener("click", () => {
      text.innerHTML.select;
      document.execCommand("copy");
      text.innerHTML += "  Copied";
      setTimeout(() => {
        text.innerHTML = text.innerHTML.replace("  Copied", "");
      }, 1000);
    });
  });
};
refreshButton.addEventListener("click", () => location.reload());
window.onload = showIdentity();
