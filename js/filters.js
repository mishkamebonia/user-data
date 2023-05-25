import DATA from '../storage.json' assert { type: 'json' }

import {displayCard} from './renderCard.js'

const filterPages = document.querySelector('#filter-pages')
const filterDropdownBtn = document.querySelector('#filters-dropdown')

const filterWrapper = document.querySelector('#filters-wrapper')

let filteredDataArr = []

function filterAllPages() {
  filterPages.addEventListener('click', () => {
    displayCard(DATA)
  })

  if (DATA.length == 500) {
    filterPages.style.background = '#146C94'
    filterPages.style.color = '#fff'
    console.log('1312312')
  } else {
    filterPages.style.background = 'green'
  }
}

function filterDropdown() {
  filterDropdownBtn.addEventListener('click', () => {
    const icon = document.querySelector('#filters-dropdown i')
    icon.classList.toggle('fa-angle-up')
    filterDropdownBtn.classList.toggle('active-button')

    filterWrapper.classList.toggle('flex-visible')
  })
}

// function filtersList(userData) {
//   // Step 2: Extract unique genders from user data
//   const uniqueGenders = [...new Set(userData.map(user => user.gender))]

//   // Step 3: Generate gender checkboxes dynamically

//   uniqueGenders.forEach(gender => {
//     const label = document.createElement('label')
//     const checkbox = document.createElement('input')
//     checkbox.type = 'checkbox'
//     checkbox.value = gender
//     checkbox.addEventListener('change', handleCheckboxChange)
//     label.classList = 'checkbox-filter'
//     label.appendChild(checkbox)
//     label.appendChild(document.createTextNode(gender))
//     filterWrapper.appendChild(label)
//   })

//   // Step 4: Handle filtering based on the selected genders
//   function handleCheckboxChange() {
//     const selectedGenders = Array.from(filterWrapper.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
//     const filteredUsers = userData.filter(user => selectedGenders.includes(user.gender))

//     console.log(filteredUsers)

//     // Perform further operations with the filtered user data
//   }

//   // ! active button
//   // const checkboxes = document.querySelectorAll('.checkbox-filter input[type="checkbox"]');

//   // checkboxes.forEach((checkbox) => {
//   //   checkbox.addEventListener('change', handleCheckboxChange);
//   // });

//   // function handleCheckboxChange(event) {
//   //   const checkbox = event.target;
//   //   const checkboxFilter = checkbox.parentNode;
    
//   //   if (checkbox.checked) {
//   //     checkboxFilter.style.background = '#146C94';
//   //     checkboxFilter.style.color = '#fff';
//   //     console.log(11111);
//   //   } else {
//   //     checkboxFilter.style.background = '#AFD3E2';
//   //     checkboxFilter.style.color = '#146C94';
//   //   }
//   // }
  
// }

function checkboxTagCreate() {
  const dataItem = new Set(DATA.map(user =>  user.gender))

  const dataArray = Array.from(dataItem)

  filterWrapper.innerHTML = dataArray.map(element => {
                              return `
                                <div class='checkbox-tag-card'>
                                <input class='checkbox-tag' type='checkbox' value='${element}' id='${element}'>
                                  <label class='checkbox-filter' for='${element}'>${element}</label>
                                </div>
                                `
  }).join('')

  checkboxListener()
}

function checkboxListener() {
  const checkboxes = document.querySelectorAll('.checkbox-tag')

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.value.toLowerCase()

      if (checkbox.checked) {
        filteredDataArr.push(value)
      } else {
        const index = filteredDataArr.indexOf(value)

        if (index > -1) {
          filteredDataArr.splice(index, 1)
        }
      }

      filter()
    })
  })

}

function filter() {
  const filteredData = DATA.filter(data => {
    const dataValue = data.gender.toLowerCase()

    const checked = filteredDataArr.includes(dataValue)

    return checked
  })
  
  displayCard(filteredData)
}

export function filters() {
  filterAllPages(DATA)
  filterDropdown()
  checkboxTagCreate(DATA)
}