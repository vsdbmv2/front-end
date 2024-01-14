const initial_state = {
  userToken: '',
  logado: false,
  userData: null,
  virus: null,
  viruses: null,
  epitopes: null,
};

const vsdbm = (state = initial_state, action) => {
  switch (action.type) {
    case '@login':
      return { ...state, ...action.payload, logado: true };
    case '@logoff':
      return { ...state, userToken: '', userData: {}, logado: false };
    case '@setVirus':
      console.log('updating virus: ', action.payload.virus);
      return { ...state, virus: action.payload.virus };
    case '@generic':
      if (action.payload.field !== 'userToken') {
        console.log(`Setting ${action.payload.field} with value:`, action.payload.value);
      }
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state
  }
}

export default vsdbm;