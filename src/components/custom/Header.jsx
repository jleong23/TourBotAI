import React, { useEffect } from "react";
import { Button } from "../ui/button.jsx";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="w-full p-3 shadow-sm flex justify-between items-center px-5">
      <h1 className="font-semibold">
        <span className="text-orange-500">Tour</span>BotAI
      </h1>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="!rounded-full !bg-slate-100 border-slate-500"
            >
              My Trips
            </Button>
            <img
              src={user?.picture}
              className="h-[40px] w-[40px] rounded-full"
            />
          </div>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
