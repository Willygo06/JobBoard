// Header.js
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFriendToStore } from "../reducers/friends";
import { peopleLogin, peopleLogout} from "../reducers/users"

function Header() {
  const [loginPeople, setLoginPeople] = useState(false);
  const [peopleLogout, setPeopleLogout] = useState(false);
  const [emailPeople, setEmailpeople] = useState(false);
  const [passwordPeople, setPasswordPeople] = useState(false);

  const handleConnection = () => {
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailPeople,
        password: passwordPeople,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(peopleLogin({
            firstname: data.data.firstname,
            lastname: data.data.lastname,
          
          }));
          window.location.href = "/#";
          setEmailpeople("");
          setPasswordPeople("")

        } else{
          console.log(data.error);
          toast.error(data.error, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
      });
  }
  };
  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-500 transition duration-200">
            LFG
          </a>
        </div>
        <nav className="space-x-6">
          <button class="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
            Sign in
          </button>
          <a
            href="#jobs"
            className="hover:text-blue-500 transition duration-200"
          >
            Offres d'emploi
          </a>
          <a
            href="#contact"
            className="hover:text-blue-500 transition duration-200"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
