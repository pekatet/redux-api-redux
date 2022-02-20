import store from '../store'

export function fetchItems(){
  store.dispatch(setStatus('pending'))
  const fetchItems = async () => {
      await fetch(process.env.REACT_APP_SERVICES_URL)
        .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        return response
      }).then(response => response.json())
        .then(data => {
          store.dispatch(setStatus('success'))
          store.dispatch({ type: 'PUT_SERVICES', payload: data})
        })
  };
  fetchItems().catch((e) => {
    store.dispatch(setStatus('error'))
    console.error('error in fetch items',e)
  })
}

export function setStatus(status) {
  return {type: 'SET_STATUS', payload: status}
}

export function removeService(id) {
  store.dispatch(setStatus('pending'))
  const removeItem = async () => {
    await fetch(process.env.REACT_APP_SERVICES_URL + '/' + id, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        store.dispatch(setStatus('success'))
      })
  };
  removeItem().catch((e) => {
    store.dispatch(setStatus('error'))
    console.error('error in fetch items',e)
  })
}

//form actions

export function getItem (id){
  store.dispatch(changeFormStatus('pending'))
  const fetchItem = async () => {
    await fetch(process.env.REACT_APP_SERVICES_URL + '/' + id)
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        return response
      }).then(response => response.json())
      .then(data => {
        store.dispatch(changeFormStatus('success'))
        store.dispatch({ type: 'PUT_SERVICE', payload: data})
      })
  };
  fetchItem().catch((e) => {
    store.dispatch(changeFormStatus('error'))
    console.error('error in fetch items',e)
  })
}

export function changeFormField(field, value) {
  return {type: 'CHANGE_FORM_FIELD', payload: {field, value}}
}

export function changeFormStatus(status) {
  return {type: 'CHANGE_FORM_STATUS', payload: status}
}

export function postService (item) {
  let jsonString = JSON.stringify(item);
  store.dispatch(changeFormStatus('pending'))
  const postItem = async () => {
    await fetch(process.env.REACT_APP_SERVICES_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonString
    })
      .then((response) => {
        if(response.status >=300 && response.status <200){
          throw new Error(response.statusText);
        }
        else {
          store.dispatch(changeFormStatus('saved'))
        }
      })
  };
  postItem().catch((e) => {
    store.dispatch(changeFormStatus('error'))
    console.error('error in fetch items',e)
  })
}