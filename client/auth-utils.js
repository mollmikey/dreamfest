import consume from './consume'
import { dispatch } from './store'
import { showError } from './actions/error'
import { setUser } from './actions/user'

const emptyUser = {
  id: null,
  isAdmin: false,
  gardenId: null
}

function saveUser (user = emptyUser) {
  dispatch(setUser(user))
}

export async function cacheUser (useAuth0, useNavigate) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()
  if (isAuthenticated) {
    try {
      const token = await getAccessTokenSilently()
      const res = await consume(`/users/${user.sub}`, token)
      const { id, firstName, lastName, email, isAdmin, gardenId } = res.body
      //if the ID is undefined then it means the user doesn't exist, we can use navigate to re-direct to the profile.
      // We want to pass the 'useNavigate', we have to pass this from the app.jsx. 
      saveUser({ id, firstName, lastName, email, isAdmin, gardenId, token })
    } catch (err) {
      dispatch(showError('Unable to set the current user'))
    }
  } else {
    saveUser()
  }
}

export function getLoginFn (useAuth0) {
  return useAuth0().loginWithRedirect
}

export function getRegisterFn (useAuth0) {
  const { loginWithRedirect } = useAuth0()
  const redirectUri = `${window.location.origin}/profile`
  return () => loginWithRedirect({
    redirectUri,
    screen_hint: 'signin',
    scope: 'role:member'
  })
}

export function getLogoutFn (useAuth0) {
  return useAuth0().logout
}

export function getIsAuthenticated (useAuth0) {
  return useAuth0().isAuthenticated
}
