import DATA from './storage.json' assert { type: 'json' }

import {displayCard} from './js/renderCard.js'

import {searchEngine} from './js/search.js'

import {filters} from './js/filters.js'

displayCard(DATA)

searchEngine()

filters()