import DATA from '../storage.json' assert { type: 'json' }

import {displayCard} from './renderCard.js'

const filterPages = document.querySelector('#filter-pages')
const filterDropdownBtn = document.querySelector('#filters-dropdown')
const filterResetBtn = document.querySelector('#filter-reset')

const filterWrapper = document.querySelector('#filters-wrapper')

const genderFilterList = document.querySelector('#gender-filter-list')
const countryFilterList = document.querySelector('#country-filter-list')
const vehicleFilterList = document.querySelector('#vehicle-filter-list')
let filterListArr = [genderFilterList, countryFilterList, vehicleFilterList]

let filterOptionsArr = ['gender', 'country', 'vehicle']

let filteredDataArr = []


function filterDropdown() {
  filterDropdownBtn.addEventListener('click', () => {
    const icon = document.querySelector('#filters-dropdown i')
    icon.classList.toggle('fa-angle-up')
    filterDropdownBtn.classList.toggle('active-button')

    filterWrapper.classList.toggle('visible')
  })
}

function checkboxItem(data, options) {
  const values = {}
  
  options.forEach((option) => {
    const dataItem = new Set(data.map((user) => user[option]))

    values[option] = Array.from(dataItem)
  })

  checkboxTagCreate(values, options)
}

function checkboxTagCreate(values, options) {
  for (let i = 0; i < filterListArr.length; i++) {
    filterListArr[i].innerHTML = values[options[i]].map(element => {
                                return `
                                  <div class='checkbox-tag-card'>
                                  <input class='checkbox-tag' type='checkbox' value='${element}' id='${element}'>
                                    <label class='checkbox-filter' for='${element}'>${element}</label>
                                  </div>
                                  `
    }).join('')
  }

  checkboxListener()
}

function checkboxListener() {
  const activeFilter = document.querySelectorAll('.checkbox-filter')
  const checkboxes = document.querySelectorAll('.checkbox-tag')
  
  checkboxes.forEach((checkbox, Arrindex) => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.value.toLowerCase()
      
      if (checkbox.checked) {
        filteredDataArr.push(value)
        activeFilter[Arrindex].classList.add('active-button')
        activeFilter[Arrindex].classList.remove('default-button')
        console.log(filteredDataArr)
      } else {
        const index = filteredDataArr.indexOf(value)
        
        if (index > -1) {
          filteredDataArr.splice(index, 1)
          activeFilter[Arrindex].classList.remove('active-button')
          activeFilter[Arrindex].classList.add('default-button')
        }
        console.log(filteredDataArr)
      }
      
      filter()

      if (filteredDataArr.length >= 1) {
        console.log(filteredDataArr.length)
        filterPages.classList.remove('active-button')
        filterPages.classList.add('default-button')
      }
      else {
        filterPages.classList.remove('default-button')
        filterPages.classList.add('active-button')
      }
    })
  })
}

function filter() {
  const filteredData = DATA.filter(data => {
    const genderMatch = filteredDataArr.includes(data.gender.toLowerCase());
    const countryMatch = filteredDataArr.includes(data.country.toLowerCase());
    const vehicleMatch = filteredDataArr.includes(data.vehicle.toLowerCase());

    if (filteredDataArr.length === 0) {
      return true;
    } else if (filteredDataArr.length === 1) {
      return genderMatch || countryMatch || vehicleMatch;
    } else if (filteredDataArr.length === 3) {
      return genderMatch && countryMatch && vehicleMatch;
    } else {
      return (genderMatch && countryMatch) || (genderMatch && vehicleMatch) || (countryMatch && vehicleMatch);
    }
  });

  displayCard(filteredData);
}

function filterReset() {
  filterResetBtn.addEventListener('click', () => {
    filteredDataArr = []
    displayCard(DATA)

    filterPages.classList.remove('default-button')
    filterPages.classList.add('active-button')

    removeActive()
  })
}

function removeActive() {
  const activeFilter = document.querySelectorAll('.checkbox-filter')
    const checkboxes = document.querySelectorAll('.checkbox-tag')

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        activeFilter[index].classList.add('default-button')
        activeFilter[index].classList.remove('active-button')
        checkbox.checked = false
      }
    })
}

export function filters() {
  filterDropdown()
  filterReset()
  checkboxItem(DATA, filterOptionsArr)
}