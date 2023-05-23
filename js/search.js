import DATA from '../storage.json' assert { type: 'json' }

import {displayCard} from './pagitation.js'

const search = document.querySelector('#search')
const button = document.querySelector('#search-button')

const searchBarCleanButton = document.querySelector('#clean-search-btn')

let userArr = []

function keyPress() {
  search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      button.click();
    }
  })
}

export function searchEngine() {
  button.addEventListener('click', () => {
    const searchFilterValue = search.value.toLowerCase()
    
    userArr = []
    
    for (let i = 0; i < DATA.length; i++) {
          const userFirstName = DATA[i].first_name.toLowerCase()
          const userLastName = DATA[i].last_name.toLowerCase()
          const userFullName = userFirstName + ' ' + userLastName
          
          if (userFirstName.includes(searchFilterValue) || userLastName.includes(searchFilterValue) || userFullName.includes(searchFilterValue)) {  
            userArr.push(userFirstName)
          } else {
            const index = userArr.indexOf(userFirstName)

            if (index > -1) {
              userArr.splice(index, 1)
            }
          }
        } 
        if (search.value != 0) {
          searchBoxFilter()
        } else {
          button.classList.add('shake')

          setTimeout( () => {
            button.classList.remove('shake')
          }, 500 )
        }
      })
      keyPress()
      cleanSearch()
}

function searchBoxFilter() {
  const filteredData = DATA.filter(data => {
    const dataValue = data.first_name.toLowerCase()

    const filtered = userArr.includes(dataValue)

    return filtered
  })
  displayCard(filteredData)
}

function cleanSearch() {
  search.addEventListener('input', () => {
    if (search.value !== '') {
      search.style.background = 'rgba(175, 211, 226, 0.3)'
      searchBarCleanButton.style.display = ''
      window.setTimeout( () => {
        searchBarCleanButton.style.transform = 'translate(0, 0)'
        searchBarCleanButton.style.opacity = 1
        searchBarCleanButton.style.visibility = 'visible'
      }, 0 )
    } else if (search.value === '') {
      search.style.background = '#fff'
      searchBarCleanButton.style.opacity = 0
      searchBarCleanButton.visibility = 'hidden'
      window.setTimeout( () => {
        searchBarCleanButton.style.transform = 'translate(40px, 0)'
        searchBarCleanButton.style.display = 'none'
      }, 400 )
    }
  })

  searchBarCleanButton.addEventListener('click', () => {
    search.style.background = '#fff'
    searchBarCleanButton.style.opacity = 0
      searchBarCleanButton.visibility = 'hidden'
      window.setTimeout( () => {
        searchBarCleanButton.style.transform = 'translate(40px, 0)'
        searchBarCleanButton.style.display = 'none'
      }, 400 )

    search.value = ''
    search.focus()
  })
}