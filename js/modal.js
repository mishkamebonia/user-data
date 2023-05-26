const cardModal = document.querySelector('#modal-wrapper')

const overlay = document.querySelector('#overlay')

export function openModal(data) {
  createModal(data)
  closeModal()
}

function closeModal() {
  overlay.addEventListener('click', () => overlayClose())
}

function overlayClose() {
  overlay.style.display = 'none'
  cardModal.innerHTML = ''
  document.querySelector('html').style.overflow = 'auto'
}

function createModal(data) {
  const cards = document.querySelectorAll('.card')
  
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const user = data[index]
  
      cardModal.innerHTML = `
      <div id='${user.id}' class="modal card-modal">
        <button id="close-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="row">
          <div class='headline'>
            <img src='${user.avatar}'>
            <h3 class="option-color">${user.first_name} ${user.last_name}</h3>
          </div>
          <div class='user-options'>
            <p class='gender'>gender: <span class="option-color">${user.gender}</span></p>
            <p class='vehicle'>vehicle: <span class="option-color">${user.vehicle}</span></p>
            <p class='country'>country: <span class="option-color">${user.country}</span></p>
          </div>
          <div class='more-info'>
            <p class='email'>email: <span class="option-color">${user.email}</span></p>
            <p class='phone'>phone: <span class="option-color">${user.phone}</span></p>
            <p class='job'>job: <span class="option-color">${user.job}</span></p>
            <p class='university'>university: <span class="option-color">${user.university}</span></p>
          </div>
        </div>
      </div>
      `

      const closeButton = document.getElementById('close-button')
      closeButton.addEventListener('click', () => overlayClose())

      overlay.style.display = 'block'

      document.querySelector('html').style.overflow = 'hidden'
    })
  })
}