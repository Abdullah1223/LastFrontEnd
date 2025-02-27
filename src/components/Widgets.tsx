{
  // Update the leaderboard and judges sections in Widgets.tsx
  const updatedWidgets = `
    <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Leaderboard
      </h2>
      <div className="space-y-4">
        {leaderboard.map((item) => (
          <div key={item.artist} className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors border border-orange-100/50 dark:border-gray-700">
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{item.category}</p>
            <p className="font-bold text-gray-900 dark:text-white">{item.artist}</p>
            <p className="text-sm text-green-500 font-semibold">{item.points} points</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Top Judges
      </h2>
      <div className="space-y-4">
        {topJudges.map((judge) => (
          <div key={judge.handle} className="flex items-center justify-between p-2 rounded-lg border border-orange-100/50 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img src={judge.avatar} alt={judge.name} className="h-12 w-12 rounded-full ring-2 ring-yellow-400" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{judge.name}</p>
                <p className="text-orange-600 dark:text-orange-400">{judge.handle}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  `
}