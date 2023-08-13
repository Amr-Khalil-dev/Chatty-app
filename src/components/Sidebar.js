import React, { useState } from "react";
import style from "./Sidebar.module.css";
import Logo from "../assets/logo1.png";
import LogoutBtn from "./LogoutBtn";
import { useCookies } from 'react-cookie';


export default function Sidebar({ contacts, changeChat }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const [cookies] = useCookies(['user']);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			<div className={style.container}>
				<div className={style.brand}>
					<img src={Logo} alt="logo" />
					<LogoutBtn />
				</div>
				<div className={style.contacts}>
					{contacts.map((contact, index) => {
						return (
							<div
								key={contact._id}
								className={index === currentSelected ? style.contactSelected : style.contact}
								onClick={() => changeCurrentChat(index, contact)}
							>
								<img src={contact.avatarImage} alt="avatar" />
								<p >{contact.name}</p>
							</div>
						);
					})}
				</div>
				<div className={style.user}>
					<img src={cookies.user.avatarImage} alt="avatar" />
					<p>
						{cookies.user.name}
					</p>
				</div>
			</div>
		</>
	);
}
