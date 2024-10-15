import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // État pour le pop-up de connexion
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // État pour le pop-up de création de compte


  const handleLoginSuccess = (userData) => {
    // Gérer les données de l'utilisateur connecté
    console.log("Utilisateur connecté :", userData);
  };

  // const dispatch = useDispatch();

  // const handleConnection = () => {
  //   fetch("", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: emailPeople,
  //       password: passwordPeople,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         dispatch(
  //           peopleLogin({
  //             firstname: data.data.firstname,
  //             lastname: data.data.lastname,
  //           })
  //         );
  //         window.location.href = "/#";
  //         setEmailpeople("");
  //         setPasswordPeople("");
  //       } else {
  //         console.log(data.error);
  //         toast.error(data.error, {
  //           position: "top-left",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     });
  // };

  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-500 transition duration-200">
            LFG
          </a>
        </div>
        <nav className="space-x-6">
          <button
            className="uppercase font-bold mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            onClick={() => setIsLoginModalOpen(true)} // Ouvrir le pop-up
          >
            Se connecter
          </button>
          <a href="#jobs" className="hover:text-blue-500 transition duration-200">
            Offres d'emploi
          </a>
          
        </nav>
      </div>
      {/* Afficher le pop-up de connexion */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)} // Fermer le pop-up
        onLogin={handleLoginSuccess} // Passer la fonction de succès de connexion
        onRegister={() => { // Ajouter la logique d'ouverture de création de compte
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true); 
        }} 
      />
      {/* Afficher le pop-up de création de compte */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)} // Fermer le pop-up
      />
    </header>
  );
}

export default Header;
