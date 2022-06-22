import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  currentWorkspace: null,
  workspaces: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, workspaceSession } = action.payload;
    const user = workspaceSession?.user
    const currentWorkspace = workspaceSession?.currentWorkspace
    const workspaces = workspaceSession?.workspaces

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      currentWorkspace,
      workspaces,
    };
  },
  LOGIN: (state, action) => {
    const { workspaceSession } = action.payload;
    const user = workspaceSession?.user
    const currentWorkspace = workspaceSession?.currentWorkspace
    const workspaces = workspaceSession?.workspaces

    return {
      ...state,
      isAuthenticated: true,
      user,
      currentWorkspace,
      workspaces,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    currentWorkspace: null,
    workspaces: null,
  }),
  REGISTER: (state, action) => {
    const { workspaceSession } = action.payload;
    const user = workspaceSession?.user
    const currentWorkspace = workspaceSession?.currentWorkspace
    const workspaces = workspaceSession?.workspaces

    return {
      ...state,
      isAuthenticated: true,
      user,
      currentWorkspace,
      workspaces,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateWorkspaces: () => Promise.resolve(),
  switchWorkspace: () => Promise.resolve()
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      const workspaceId = typeof window !== 'undefined' ? localStorage.getItem('workspaceId') : '';
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, workspaceId);

        const response = await axios.get('/v1/account');
        const { workspaceSession } = response.data;
        console.log('refresh workspaceSession ==>', workspaceSession)

        window !== 'undefined' && localStorage.setItem('workspaceId', workspaceSession.currentWorkspace?._id)

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            workspaceSession
          },
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            workspaceSession: null,
          },
        });
      }
    } catch (err) {
      console.error('deu ruim ==>', err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          workspaceSession: null,
        },
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/v1/session', {
      email,
      password,
    });
    const { accessToken, workspaceSession } = response.data;
    console.log('login workspaceSession ==>', workspaceSession)

    setSession(accessToken, workspaceSession.currentWorkspace?._id);

    dispatch({
      type: 'LOGIN',
      payload: {
        workspaceSession,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/v1/user', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, workspaceSession } = response.data;
    console.log('register workspaceSession ==>', workspaceSession)

    localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        workspaceSession,
      },
    });
  };

  const switchWorkspace = async (newWorkspaceIdId) => {
    if (localStorage.getItem('workspaceId') === newWorkspaceIdId) return
    localStorage.setItem('workspaceId', newWorkspaceIdId)
    initialize()
  }

  const updateWorkspaces = async (workspaceSession) => {
    console.log('updateWorkspaces ==>', workspaceSession)

    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: true,
        workspaceSession
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        updateWorkspaces,
        switchWorkspace
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
