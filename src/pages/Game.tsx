const Game = () => {
  return (
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-6">
      <h1 className="text-4xl font-bold mb-8 text-green-400">Opret spil</h1>
      <p className="mb-6 text-gray-300">
        Klar til at spille? Her kan du hurtigt opsætte dit dartspil og følge
        scoren.
      </p>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg mb-2">
        <h2 className="text-green-400">Spillere</h2>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-green-400">Regler</h2>
      </div>
    </main>
  );
};

export default Game;
