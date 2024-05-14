import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="pt-8 h-[calc(100vh-129px)]">
      <div className="flex justify-center flex-col items-center gap-4 h-full">
        <p className="font-bold text-2xl">Bienvenu !</p>
        <Link to="/" className="font-medium p-2 rounded flex border-solid mx-2 justify-center place-items-center bg-green">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default Welcome;
