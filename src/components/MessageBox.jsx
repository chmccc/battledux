import React, { Component } from "react";

const MessageBox = props => {
  let message = "This is a message!";
  let showOrHide = "hidden";
  let emoji = '🏆';
  if ((props.userDuckHealth.goose + props.userDuckHealth.duck + props.userDuckHealth.duckling) === 0) {
    // All of the player's ships have been destroyed...COMPUTER WINS
    message = `Sorry ${props.userName}, you lose !!!`;
    emoji = '🏳️';
    showOrHide="show";
  }
  if ((props.compDuckHealth.goose + props.compDuckHealth.duck + props.compDuckHealth.duckling) === 0) {
    // All of the computer's ships have been destroyed...PLAYER WINS
    message = `${props.userName} wins !!!`;
    emoji = '🏆';
    showOrHide="show";
  }



  return (
    <div id="message-box" className={showOrHide} onClick={props.handleMessageBoxClick}><h1>{message}</h1><br /><h1>{emoji}</h1></div>
  )
}


export default MessageBox;