import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100 px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-green-400">
        Velkommen til <span className="text-red-500">JustDart</span>
      </h1>
      <p className="text-lg max-w-xl mb-10 text-gray-300">
        En simpel og nem måde at opsætte dartspil på og holde styr på scoren.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to={"game-setup"}>
          <Button>Opret spil</Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
