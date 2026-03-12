"use client";

export const Windmill = () => {
  return (
    <div className="relative w-[300px] h-[300px] mx-auto scale-75 md:scale-100">
      <div className="absolute top-[64px] left-[-110px] w-[280px] h-[180px] bg-[#edadac] opacity-50 rounded-t-full">
        <div className="absolute bottom-0 right-[-120px] w-[250px] h-[110px] bg-[#edadac] rounded-t-full" />
      </div>

      <div className="absolute top-10 left-[-100px] bg-white h-5 w-10 z-[50] rounded-t-full opacity-70 animate-[clouds_14s_linear_alternate_infinite] before:content-[''] before:absolute before:bg-white before:h-[30px] before:w-[60px] before:rounded-t-full before:bottom-0 before:right-5" />
      <div className="absolute top-[-20px] left-[-100px] bg-white h-10 w-20 z-[1] rounded-t-full opacity-70 animate-[clouds_24s_linear_alternate-reverse_infinite] before:content-[''] before:absolute before:bg-white before:h-[30px] before:w-[60px] before:rounded-t-full before:bottom-0 before:right-10" />

      <div className="absolute left-2 top-[10px] w-48 h-48 z-20 animate-[spin_15s_linear_infinite]">

        {[0, 90, 180, 270].map((deg, i) => (
          <div
            key={i}
            className="absolute w-2 h-[100px] bg-[#41155a] left-[92px] origin-bottom before:content-[''] before:absolute before:bg-[#41155a] before:opacity-70 before:w-[15px] before:h-[75px] before:left-2"
            style={{ transform: `rotate(${deg}deg)`, top: deg === 90 || deg === 270 ? '46px' : deg === 180 ? '92px' : '0' }}
          />
        ))}
      </div>

      <div className="absolute left-[52px] top-[55px] z-[9] w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[70px] border-b-[#df615c]" />

      <div className="absolute left-[52px] top-[124px] w-[100px] h-[120px] bg-white before:content-[''] before:absolute before:bg-[#41155a] before:h-10 before:w-[30px] before:top-5 before:left-8 before:rounded-[18px] before:border-l-4 before:border-[#edadac] after:content-[''] after:absolute after:bg-[#41155a] after:h-[50px] after:w-10 after:bottom-0 after:left-[28px] after:rounded-t-[40%] after:border-l-4 after:border-[#edadac]" />

      <div className="absolute w-20 h-[60px] bg-white top-[164px] left-[152px] border-t-[20px] border-[#df615c] after:content-[''] after:absolute after:bg-[#41155a] after:w-5 after:h-[30px] after:bottom-0 after:left-[30px] after:border-l-4 after:border-[#edadac]" />

      <ul className="absolute left-[-50px] top-[120px] p-0 after:content-[''] after:absolute after:bg-[#edadac] after:w-[3px] after:h-20 after:top-[25px] after:right-[21px] after:z-[-1]">
        {[1, 2, 3].map((i) => (
          <li key={i} className="list-none bg-[#41155a] w-[45px] h-[45px] rounded-full -mb-[15px]" />
        ))}
      </ul>

      <ul className="absolute top-[203px] left-[-60px] p-0 flex">
        {[1, 2, 3].map((i) => (
          <li key={i} className="list-none bg-[#df615c] w-10 h-[25px] rounded-t-full" />
        ))}
      </ul>
      <ul className="absolute top-[178px] left-[160px] p-0 flex">
        {[1, 2].map((i) => (
          <li key={i} className="list-none bg-[#df615c] w-10 h-[25px] rounded-t-full" />
        ))}
      </ul>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clouds {
          from { transform: translateX(0); }
          to { transform: translateX(340px); }
        }
      `}</style>
    </div>
  );
};