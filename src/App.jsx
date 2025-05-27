// src/App.jsx
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import BannerPremio from '@/components/bannerPremio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Importaremos el diálogo de compra más adelante cuando lo creemos
// import { BuyTicketDialog } from '@/components/BuyTicketDialog';

// Simularemos los datos de la API por ahora
const SIMULATED_RAFFLE_DATA = {
  id: 1,
  title: "Rifas Piter",
  prize: "Toyota 4Runner", // Premio de ejemplo
  ticketPrice: .40, // Valor del ticket en tu moneda
  totalTickets: 200,  // Total de números en la rifa
  soldTickets: 75,    // Números vendidos (puedes cambiar esto para ver la barra cambiar)
};

function App() {
  const [raffleData, setRaffleData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null); // Para manejar errores de API en el futuro

  // Simulación de carga de datos de la API
  useEffect(() => {
    setLoading(true);
    // Simular una llamada a la API
    setTimeout(() => {
      setRaffleData(SIMULATED_RAFFLE_DATA);
      setLoading(false);
    }, 1000); // Simula 1 segundo de carga
  }, []);

  // Calcular el porcentaje para la barra de progreso
  const progressPercentage = raffleData
    ? (raffleData.soldTickets / raffleData.totalTickets) * 100
    : 0;

  // Estado para el diálogo de compra (lo usaremos más adelante)
  // const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
        <p className="text-xl">Cargando Rifa...</p>
        {/* Podrías poner un spinner aquí en el futuro */}
      </div>
    );
  }

  if (!raffleData) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
        <p className="text-xl text-red-400">No se pudieron cargar los datos de la rifa.</p>
      </div>
    );
  }

  const allTicketsSold = raffleData.soldTickets >= raffleData.totalTickets;

  return (  

    <>
      <div className="min-h-screen text-slate-50 flex flex-col gap-8 items-center  justify-center  px-4" id="bannerPremioPhoto" > 
  
  

      <Card className="w-full max-w-md border-slate-200 shadow-xl/30  bg-slate-800/75  backdrop-blur-md border border-slate-700/50 py-8 ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">{raffleData.title}</CardTitle>
          <CardDescription className="text-lg text-amber-400 pt-2">
            ¡Este es el premio!: <span className="font-semibold">{raffleData.prize}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 ">
          <div>
            <p className="text-xl text-center text-slate-200 mb-2">
              Valor del Ticket: <span className="font-semibold text-green-400">${raffleData.ticketPrice.toFixed(2)}</span>
            </p>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm font-medium text-slate-300">
              <span>Progreso de Ventas</span>
              <span>{raffleData.soldTickets} / {raffleData.totalTickets} vendidos</span>
            </div>
            <Progress value={progressPercentage} className="w-full h-3 [&>*]:bg-sky-500 bg-slate-700" />
            <p className="text-center text-xs text-slate-400 mt-1">{progressPercentage.toFixed(1)}% completado</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center pt-6">
          {allTicketsSold ? (
            <p className="text-xl font-semibold text-amber-500">¡Todos los tickets vendidos!</p>
          ) : (
            <Button
              variant="default"
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-full"
              // onClick={() => setIsBuyDialogOpen(true)} // Habilitaremos esto después
              onClick={() => alert("Próximamente: Diálogo para comprar ticket")}
            >
              Comprar Ticket
            </Button>
          )}
          {/* Aquí iría el componente BuyTicketDialog cuando lo creemos: */}
          {/* {raffleData && !allTicketsSold && (
            <BuyTicketDialog
              isOpen={isBuyDialogOpen}
              onOpenChange={setIsBuyDialogOpen}
              ticketPrice={raffleData.ticketPrice}
              raffleId={raffleData.id}
              onTicketPurchased={() => {
                // Lógica para refrescar datos después de la compra
                console.log("Ticket comprado, refrescar datos...");
                // Por ahora, solo cerramos el diálogo
                setIsBuyDialogOpen(false);
                // Actualizar datos simulados para ver el cambio
                setRaffleData(prev => ({...prev, soldTickets: prev.soldTickets + 1}));
              }}
            />
          )} */}
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} {raffleData.title}. Todos los derechos reservados.</p>
      </footer>
    </div>
    </>


  );
}

export default App;