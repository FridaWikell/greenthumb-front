import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import NavBar from "./components/NavBar";
import ErrorBoundary from "./components/ErrorBoundary";

import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import Questions from "./pages/polls/Questions";
import QuestionForm from "./pages/polls/QuestionForm";
import QuestionPage from "./pages/polls/QuestionPage";
import NotFoundPage from "./pages/errors/NotFoundPage";

import styles from "./App.module.css";

import "./api/axiosDefaults";

const App = () => {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <ErrorBoundary>
          <Switch>
          <Route
              exact path="/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profileId}&`}
                />
              )}
            />
            <Route
              exact path="/liked"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profileId}&ordering=-likes__created_at&`}
                />
              )}
            />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/create" render={() => <PostCreateForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route 
            exact path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
            />
            <Route
              exact path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            <Route exact path="/questions" render={() => <Questions />} />
            <Route exact path="/questions/create" render={() => <QuestionForm />} />
            <Route exact path="/questions/:id" render={() => <QuestionPage />} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </ErrorBoundary>
      </Container>
    </div>
  );
}

export default App;