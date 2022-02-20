const initialState = {items:[], status: 'idle'}

export default function listReducer(state = initialState, action) {
  switch (action.type){
    case 'DELETE_SERVICE':
      //POST DELETE
      return
    case 'PUT_SERVICES':
      return {...state, items:action.payload}
    case 'SET_STATUS':
      return {...state,status:action.payload}
    default:
      return state
  }
}