import DATA from '../storage.json' assert { type: 'json' }

import {displayCard} from './renderCard.js'

const search = document.querySelector('#search')

const filterDropdownBtn = document.querySelector('#filters-dropdown')
const filterResetBtn = document.querySelector('#filter-reset')

const filterWrapper = document.querySelector('#filters-wrapper')

const genderFilterList = document.querySelector('#gender-filter-list')
const countryFilterList = document.querySelector('#country-filter-list')
const vehicleFilterList = document.querySelector('#vehicle-filter-list')

let filterListArr = [genderFilterList, countryFilterList, vehicleFilterList]

let filterOptionsArr = ['gender', 'country', 'vehicle']

export let filteredDataArr = []

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
      } else {
        const index = filteredDataArr.indexOf(value)
        
        if (index > -1) {
          filteredDataArr.splice(index, 1)
          activeFilter[Arrindex].classList.remove('active-button')
          activeFilter[Arrindex].classList.add('default-button')
        }
      }
      
      filter()

      search.value = ''
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
    } else if (filteredDataArr.length >= 1) {
      return genderMatch || countryMatch || vehicleMatch;
    }
  });

  displayCard(filteredData); // ! bug

  if (!filteredData) {
    window.window.screenTop(0, 0)
  }
}

export function filterReset(data) {
  filterResetBtn.addEventListener('click', () => {

    if (filteredDataArr.length >= 1) {
      filteredDataArr = []
      displayCard(data)
  
      removeActive()
    } else {
      filterResetBtn.classList.add('shake')

      setTimeout( () => {
        filterResetBtn.classList.remove('shake')
      }, 500 )
    }
  })
}

export function removeActive() {
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
  filterReset(DATA)
  checkboxItem(DATA, filterOptionsArr)
}