import { useState } from "react";
import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function registerPeople() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [role, setRole] = useState("");

  const handleNumberChange = (e) => {
    const input = e.target.value;
    const cleanedNumber = input.replace(/[^0-9]/g, "");

    if (cleanedNumber.length <= 10) {
      setNumber(cleanedNumber);
    }
  };

  const handleCodePostal = (e) => {
    const input = e.target.value;
    const cleanedCode = input.replace(/[^0-9]/g, "");
    if (cleanedCode.length <= 5) {
      setZipcode(cleanedCode);
    }
  };

  const handleRegisterPeople = () => {
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        password: password,
        number: number,
        zipcode: zipcode,
      }),
    });
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result === false){
        console.log(data.error);
      }
    })
  };

  return (
    <div className="bg-white">
      <Header />

      <div className="h-full mt-14">
        <div className="flex">
          <h1 className="flex text-xl bg-neutral-800 mb-10 pl-10 pb-5 pt-5 text-white font-semibold w-full">
            <p>Créez votre compte concierge</p>{" "}
          </h1>
        </div>

        <div className="flex flex-row">
          <div className="ml-10 flex flex-col p-3 w-6/12 bg-neutral-100 rounded 3xl">
            <h1 className="font-light text-lg mb-5 font semibold">
              Vos Coordonnées
            </h1>
            <div>Prénom & Nom</div>
            <div className="flex flex-row">
              <input
                type="text"
                className="mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="Prénom..."
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                type="text"
                className="ml-3 mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="Nom..."
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <input
                type="textarea"
                className="mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="E-mail..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />{" "}
              <input
                type="password"
                className="ml-3 mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex flex-row w-full">
              <input
                type="text"
                placeholder="Saisissez une adresse..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-3 mt-3 border-2 w-8/12 p-2 rounded-xl border-neutral-500"
              />
              <input
                type="textarea"
                className="mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="Code postal..."
                onChange={(e) => setZipcode(e.target.value)}
                value={zipcode}
              />
              <input
                type="textarea"
                className="ml-3 mt-3 mb-3 border-2 w-4/12 p-2 rounded-xl border-neutral-500"
                placeholder="Ville..."
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </div>
        </div>
        <div className="  flex justify-end">
          <div
            className={`${styles.hovereffect} cursor-pointer border-2 pl-5 pr-5 pt-2 pb-2 flex items-center justify-center rounded-2xl w-full text-xl text-white`}
            onClick={handleRegister}
          >
            Envoyer
          </div>
        </div>
      </div>
    </div>
  );
}
