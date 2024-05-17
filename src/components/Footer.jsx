import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="Footer">
      <footer className="border-t border-gray-700 h-16 bg-green flex justify-around items-center">
        <p className="font-bold"> Made by Marek VOLET</p>
        <div className="flex justify-center space-x-6">
        <Link to="mailto:marek.volet@hotmail.fr" target="_blank" rel="noopener noreferrer" className="text-black-600">
          <FaEnvelope size={24} />
        </Link>
        <Link to="https://www.facebook.com/marek.volet/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          <FaFacebook size={24} />
        </Link>
        <Link to="https://github.com/VOLETMarek" target="_blank" rel="noopener noreferrer" className="text-black-600">
          <FaGithub size={24} />
        </Link>
        <Link to="https://www.linkedin.com/in/marek-volet/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          <FaLinkedin size={24} />
        </Link>
      </div>
      </footer>
    </div>
  );
}

export default Footer;
