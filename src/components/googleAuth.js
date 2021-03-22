import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import "../styles/googleAuth.css";

const GoogleAuth = (props) => {
  // const [isSignedIn, setIsSignedIn] = useState(null);
  const auth = useRef("");

  // initialize library
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "79943321799-1jssov6hvk7jk08lcthvs5blgem9ml17.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          // setIsSignedIn(auth.current.isSignedIn.get());
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    // setIsSignedIn(auth.current.isSignedIn.get());
    if (isSignedIn) {
      props.signIn(auth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return;
    } else if (props.isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
