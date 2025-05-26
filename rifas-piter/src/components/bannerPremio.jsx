// src/components/bannerPremio.jsx
import React from 'react';
import './../App.css';
import { Button } from "@/components/ui/button";
const BannerPremio = ({ prize }) => {
  return (
    <div className="w-full bg-slate-800/50  backdrop-blur-md h-96">
      <div className="flex justify-between items-center h-full gap-4" >
        <div className="text-center w-full gap-4">
          <h2 className="text-3xl font-bold text-sky-400">Tu Podras ser el ganador</h2>
          <p className="text-lg text-amber-400 pt-2">
            ¡Este es el premio!: <span className="font-semibold">{prize}</span>
          </p>
           <Button variant="default" size="lg" className="bg-blue-500 hover:bg-green-600 text-white font-bold ">
            Comprar Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerPremio;