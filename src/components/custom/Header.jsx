import React, { useEffect } from "react";
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";

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
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[40px] w-[40px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button>Get Started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
