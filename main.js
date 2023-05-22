import './scss/main.css'

import DATA from './storage.json' assert { type: 'json' }

import {displayCard} from './js/pagitation.js'

import {searchEngine} from './js/search.js'

displayCard(DATA)

searchEngine()

