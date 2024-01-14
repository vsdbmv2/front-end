export const login = (userToken, userData) => ({
  type: '@login',
  payload: {
    userToken,
    userData
  }
})

export const logoff = () => ({
  type: '@logoff'
});

export const setVirus = virus => ({
  type: '@setVirus',
  payload: {
    virus
  }
});

export const response = (field, value) => ({
  type: '@generic',
  payload: {
    field,
    value
  }
})