import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Welcome = () => {

  const { userData, setUserData } = useAuth();

  return (
    <div className="pt-8 h-[calc(100vh-129px)]">
      <div className="flex justify-center flex-col items-center gap-4 h-full">
        <p className="font-bold text-2xl mb-4">Bienvenu {userData.username} !</p>
        <Link to="/" className="font-medium p-4 rounded flex border-solid mx-2 justify-center place-items-center bg-green">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default Welcome;
