import React, { useEffect, useContext } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";
import { DispatchContext, StoreContext } from "@/context/storeContext";
import Barcode from "react-barcode";

export default function Thanks() {
  const router = useRouter();
  const dispatch = useContext(DispatchContext);
  const state = useContext(StoreContext);

  useEffect(() => {
    let isMounted = true;
    let duration = 7 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    setTimeout(() => {
      dispatch({ action: "EMPTY_BASKET" });
      if (isMounted) {
        // Only push to router if component is still mounted
        router.push("/");
      }
    }, duration);

    return () => {
      isMounted = false; // Update the variable when the component unmounts
      clearInterval(interval);
    };
  }, [dispatch, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-black font-semibold">
              Festival Ticket
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              Congratulations, you are going to the Foofest!
            </h2>
            <p className="mt-2 text-gray-500">Here are your ticket details:</p>
            {state.ticketBasket.map((item, index) => (
              <div key={index}>
                <h3>Ticket type: {item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Amount: {item.amount}</p>
                <p>Total: {item.price * item.amount}</p>
                <Barcode value="1234567890" />
              </div>
            ))}
            {/* Rest of your code */}
          </div>
        </div>
      </div>
    </div>
  );
}
