const baseAPI = "http://localhost:8080"
const managerAPI = baseAPI+"/api/v1"
const authAPI = baseAPI+"/auth"
const api = baseAPI + '/api'

export const API_STUDENT = managerAPI+"/user"

export const API_PRODUCT = api + '/products'
export const API_SUPPLIER =   api + '/suppliers'

export const API_USER_DETAIL = managerAPI+"/user"


export const API_GET_REFRESH_TOKEN = api + '/suppliers'
export const API_GET_USER_WHEN_EXISTS_REFRESH_TOKEN = api + '/suppliers'


export const API_SIGN_IN = authAPI + '/login'
export const API_SIGN_UP = authAPI + '/register'
export const API_SIGN_OUT = baseAPI + '/suppliers'


