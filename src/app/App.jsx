import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from '../common/context/Auth/useAuth';
import { Header } from '../components/Layout/Header';
import { fetchProfile } from '../features/profile/profileSlice';

const CreateQuestion = lazy(() =>
  import('../features/questions/CreateQuestion')
);
const QuestionPage = lazy(() => import('../features/questions/QuestionPage'));
const QuestionsList = lazy(() => import('../features/questions/QuestionsList'));
const FavoriteList = lazy(() => import('../features/profile/FavoriteList'));

export const App = () => {
  const { token } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/" exact>
            <QuestionsList />
          </Route>
          <Route path="/create">
            <CreateQuestion />
          </Route>
          <Route path="/question/:id">
            <QuestionPage />
          </Route>
          <Route path="/favorites">
            <FavoriteList />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
