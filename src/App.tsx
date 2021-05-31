import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Header } from './components/Fake/Fake';
import { Login } from './components/Main/Login/Login';
import { Registration } from './components/Main/Registration/Registration';
import { MainWrapper } from './components/Main/Wrapper/MainWrapper';
import { Navigation } from './components/Navigation/Navigation';
import { Wrapper } from './components/Wrapper/Wrapper';
import { RootState, ThunkAppDispatch } from './Types/reduxTypes/reduxStoreTypes';
import { logInThunk } from './redux/userReducer';
import {useTransition} from 'react-spring'
import { Home } from './components/Main/Home/Home';
import { TasksWrapper } from './components/Main/NewTasks/TasksWrapper';
import { socket, subscribe } from './redux/web-socket/io';


function App() {
  const login = useSelector<RootState, string>(state => state.user.login)
  const initialize = useSelector<RootState, boolean>(state => state.user.initialize)
  const location = useLocation()
  const transition = useTransition(location, {
    from: {opacity: 0, display: "none"},
    enter: (item) => async(next, cancel) => {
      await next({opacity: 0, delay: 200, display: "block"})
      await next({opacity: 1, config:{duration: 200}})
    },
    leave: (item) => async(next, cancel) => {
      await next({opacity: 0, config:{duration: 10}})
      await next({display: "none"})
    },
  })
  const dispatch = useDispatch<ThunkAppDispatch>()
  useEffect(() => {
    dispatch(logInThunk())
  }, [dispatch])
  useEffect(() => {
    subscribe(dispatch, location.pathname)
  }, [location.pathname])
  return (
    <>
    {
      initialize ? <Wrapper>
      <Header />
       <Navigation>
         
           {
             login ? 
             <>{
              transition((props, item) => {
                return (
              <MainWrapper springprops={props} type="inner"> 
                <Switch location={item}>
                    <Route path="/home" component={Home}/>
                    <Route path="/new" component={TasksWrapper} />
                    <Route path="/working" component={TasksWrapper} />
                    <Route path="/reworking" component={TasksWrapper} />
                    <Route path="/check" component={TasksWrapper} />
                    <Route path="/*" render={() => {return <Redirect to="/home"/>}}/>
                    <Route path="/" render={() => {return <Redirect to="/home"/>}}/>
                </Switch>
             </MainWrapper>  
                )})}
             </>  
             :
             <> {
              transition((props, item) => {
                return (
                    <MainWrapper springprops={props} type="auth"> 
                        <Switch location={item}>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/" render={() => {return <Redirect to="/login"/>}}/>
                        </Switch>   
                      </MainWrapper>          
                )
              })
             }   
             </>
           }
         
       </Navigation>
  </Wrapper>
  :
  <div>
    Идёт загрузка
  </div>
    }
    </>
  );
}

export default App;
