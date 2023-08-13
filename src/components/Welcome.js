import React from "react";

import style from "./Welcome.module.css";
import Robot from "../assets/robot.gif";

export default function Welcome(props) {


	return (
		<div className={style.container}>
			<img src={Robot} alt="Hello" />
			<h1>
				Welcome, <span>{props.currentUser.name}!</span>
			</h1>
			<h3>Please select a chat to Start messaging</h3>
		</div>
	);
}

