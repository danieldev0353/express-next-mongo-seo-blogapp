import cookie from 'js-cookie'

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const getCookie = (key) => {
  if (process.browser) {
    cookie.get(key)
  }
}

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

export const authenticate = ({ data }, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
}

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}
