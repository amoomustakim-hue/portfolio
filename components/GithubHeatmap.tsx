import React from 'react';

const GithubHeatmap = () => {
  // Generate a dummy contribution matrix
  // 53 columns (weeks), 7 rows (days)
  const columns = Array.from({ length: 53 }).map((_, colIndex) => {
    return Array.from({ length: 7 }).map((_, rowIndex) => {
      // Create some random pattern, heavier towards the right (recent)
      const intensity = Math.random();
      let level = 0; // 0: no contribution, 1-4: intensity
      if (intensity > 0.8) level = 4;
      else if (intensity > 0.6) level = 3;
      else if (intensity > 0.4) level = 2;
      else if (intensity > 0.2) level = 1;
      
      // Make older weeks have fewer contributions
      if (colIndex < 20 && Math.random() > 0.3) level = 0;
      if (colIndex < 40 && Math.random() > 0.5) level = 0;

      return level;
    });
  });

  const getBgColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#0e4429]';
      case 2: return 'bg-[#006d32]';
      case 3: return 'bg-[#26a641]';
      case 4: return 'bg-[#39d353]';
      default: return 'bg-[#161b22]'; // empty cell
    }
  };

  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

  return (
    <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] text-xs">
      <div className="flex mb-2 text-[#8b949e]">
        <div className="w-8"></div>
        <div className="flex-1 flex justify-between px-2">
          {months.map((month, i) => (
            <div key={i}>{month}</div>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-[3px] text-[#8b949e] pr-2 w-8 justify-between pt-1 pb-1">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="flex flex-1 gap-[3px] overflow-hidden">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-[3px]">
              {col.map((level, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`w-[10px] h-[10px] rounded-sm ${getBgColor(level)}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-[#8b949e]">
        <div>Learn how we count contributions</div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-sm bg-[#161b22]"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-[#0e4429]"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-[#006d32]"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-[#26a641]"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-[#39d353]"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GithubHeatmap;
