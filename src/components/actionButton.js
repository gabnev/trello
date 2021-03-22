import React, { useState } from "react";
import { addList, addCard } from "../actions";
import { useDispatch, connect } from "react-redux";

import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextArea from "react-textarea-autosize";

const ActionButton = ({ list, listID, lists, auth }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const renderButton = () => {
    const buttontext = list ? "Add a new list" : "Add a new card";

    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15" : "inherit";

    return (
      <div
        onClick={openForm}
        style={{
          ...styles.buttonContainer,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          background: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        {buttontext}
      </div>
    );
  };

  const handleAddList = () => {
    setText("");
    if (text) {
      dispatch(addList(text, auth.userId));
    }
    return;
  };

  const handleAddCard = () => {
    setText("");
    if (text) {
      dispatch(addCard(listID, text));
    }
    return;
  };

  const renderForm = () => {
    const placeholder = list ? "Enter list title" : "Enter title for this card";

    const buttonTitle = list ? "Add list" : "Add card";

    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <TextArea
            placeholder={placeholder}
            autoFocus
            onBlur={closeForm}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              overflow: "hidden",
              resize: "none",
              width: "100%",
              outline: "none",
              border: "none",
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#ccc",
            }}
            onMouseDown={list ? handleAddList : handleAddCard}
          >
            {buttonTitle}
          </Button>
          <Icon
            style={{
              marginLeft: 8,
              cursor: "pointer",
            }}
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  return <div>{formOpen ? renderForm() : renderButton()}</div>;
};

const styles = {
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};

const mapStateToProps = (state) => {
  return { lists: state.lists, auth: state.auth };
};

export default connect(mapStateToProps)(ActionButton);
