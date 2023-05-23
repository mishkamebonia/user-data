const wrapper = document.querySelector('#wrapper')
const pagitationButtonsWrapper = document.querySelector('#pagitation-buttons')

const displayPage = document.querySelector('#current-page')

const dataCounter = document.querySelector('#data-counter')
const dataCounterTime = document.querySelector('#data-counter-time')

let rows = 20
let currentPage = 1
let buttonRow = 6

// rows
function pagitationRows(data, rows, page) {
  const start = (page - 1) * rows
  const end = start + rows
  const paginatedItems = data.slice(start, end)

  return paginatedItems
}

// pages
function pagitationPages(data, rows) {
  const pages = Math.ceil(data.length / rows)
  
  return pages
}

function pagitationButtons(pages, data) {
  pagitationButtonsWrapper.innerHTML = ''

  let maxLeft = currentPage - Math.floor(buttonRow / 2)
  let maxRight = currentPage + Math.floor(buttonRow / 2)

  if (maxLeft < 1) {
    maxLeft = 1
    maxRight = buttonRow
  }

  if (maxRight > pages) {
    maxLeft = pages - (buttonRow - 1)
    maxRight = pages

    if (maxLeft < 1) {
      maxLeft = 1
    }
  }

  let firstButton = document.createElement('button')
    firstButton.classList.add('pagitaion-btn')
    firstButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
    firstButton.style.background = '#AFD3E2'
    firstButton.value = 1

    firstButton.addEventListener('click', () => {
      currentPage = firstButton.value
      displayCard(data)
    })

    if (pages !== 0) {
      pagitationButtonsWrapper.appendChild(firstButton)
    }

    if (currentPage != 1) {
      firstButton.disabled = false
    } 
    else if (currentPage = 1) {
      window.window.scrollTo(0,0)
      firstButton.style.opacity = .5
      firstButton.disabled = true
    }

  for (let page = maxLeft; page <= maxRight; page++) {
    let button = document.createElement('button')
    button.classList.add('pagitaion-btn')
    button.innerText = page
    button.value = page

    if (currentPage == page) {
      button.classList.add('active-button')
      button.disabled = true
    }
    
    button.addEventListener('click', () => {
      window.window.scrollTo(0,0)
      currentPage = page
      displayCard(data)
    })

    pagitationButtonsWrapper.appendChild(button)
  }

  let lastButton = document.createElement('button')
  lastButton.classList.add('pagitaion-btn')
  lastButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
  lastButton.style.background = '#AFD3E2'
  lastButton.value = pages

  if (pages != 0) {
    pagitationButtonsWrapper.appendChild(lastButton)
  }

  lastButton.addEventListener('click', () => {
    currentPage = lastButton.value
    displayCard(data)
  })
  
  if (currentPage != pages) {
    lastButton.disabled = false
  } 
  else if (currentPage = pages) {
    window.window.scrollTo(0,0)
    lastButton.style.opacity = .5
    lastButton.disabled = true
  }

  displayPage.textContent = currentPage
}

export function displayCard(dataType) {
  const startTime = performance.now();
  const pagitationItems = pagitationRows(dataType, rows, currentPage)

  wrapper.innerHTML = pagitationItems.map(e => {
    return `
            <button class='card' id='${e.id}'>
              <div class='card-content'>
              <h6>id ${e.id}</h6>
                <div class='user-name'>
                  <img src='${e.avatar}' alt='user-image'>
                  <h4 class='header'><span class="option-color">${e.first_name} ${e.last_name}</span></h4>
                </div>
                <div class='more-info' style="display: none;">
                  <p class='email'>email: <span class="option-color">${e.email}</span></p>
                  <p class='gender'>gender: <span class="option-color">${e.gender}</span></p>
                  <p class='country'>country: <span class="option-color">${e.country}</span></p>
                  <p class='vehicle'>vehicle: <span class="option-color">${e.vehicle}</span></p>
                  <p class='phone'>phone: <span class="option-color">${e.phone}</span></p>
                  <p class='job'>job: <span class="option-color">${e.job}</span></p>
                  <p class='university'>university: <span class="option-color">${e.university}</span></p>
                </div>
                </div>
              </div>
            
            </button>
    `
  }).join('')
  
  pagitationButtons(pagitationPages(dataType, rows), dataType) // buttons

  currentPage = 1

  // window.window.scrollTo(0,0)

  dataCounter.textContent = dataType.length
  const finishTime = performance.now();
  dataCounterTime.textContent = Math.round(finishTime - startTime)

  errorFunction(dataType)
}

function errorFunction(data) {
  if (data.length === 0) {
    wrapper.innerHTML =
                        `<div id='not-found'>
                          <img src='./images/not-found.png'>
                          <p>data not found</p>
                        </div>`
  }
}