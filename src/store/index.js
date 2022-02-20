import {createStore, combineReducers} from 'redux'
import listReducer from '../reducers/listReducer'
import formReducer from '../reducers/formReducer'

const reducer = combineReducers({
  serviceList: listReducer,
  form: formReducer
})

const store = createStore(
  reducer
)

export default store