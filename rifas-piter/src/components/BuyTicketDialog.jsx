// src/components/BuyTicketDialog.jsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// No necesitamos interfaces en JS, pero JSDoc puede ayudar para la documentación
/**
 * @param {{
 *   onTicketPurchased: () => void;
 *   ticketPrice: number;
 *   raffleId: number;
 * }} props
 */
export function BuyTicketDialog({ onTicketPurchased, ticketPrice, raffleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/raffle/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, raffleId }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al comprar el número.');
      }
      
      setSuccessMessage('¡Número comprado con éxito! Gracias por participar.');
      setName('');
      setEmail('');
      setPhone('');
      onTicketPurchased();
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMessage(null);
      }, 3000);

    } catch (err) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">Comprar un Número (${ticketPrice.toFixed(2)})</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comprar Número de Rifa</DialogTitle>
          <DialogDescription>
            Completa tus datos para participar. Precio del número: ${ticketPrice.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Correo
              </Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" required />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
          {successMessage && <p className="text-sm text-green-500 mb-2">{successMessage}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Comprando...' : 'Confirmar Compra'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}