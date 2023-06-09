import React, { useState, useContext } from "react";
import { TextField } from "@mui/material";
import Anchor from "./Anchor";
import { StoreContext } from "@/context/storeContext";

export default function CreditCardForm() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const state = useContext(StoreContext);
  const reservationId = state.reserveSpot[0]?.id;

  const tentTotalPrice = [...state.tentBasket.slice(1)].reduce(
    (total, item) => {
      return total + item.price * item.tentAmount;
    },
    0
  );

  const ticketTotalPrice = state.ticketBasket.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  const greenFeeTotalPrice = state.greenFee.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const totalPrice = tentTotalPrice + ticketTotalPrice + greenFeeTotalPrice;

  const isFormInvalid =
    !cardName ||
    !cardNumber ||
    !expiryDate ||
    !cvc ||
    cardNumber.replace(/\s/g, "").length !== 16 ||
    cvc.length !== 3 ||
    !expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/);

  const postBasketToSupabase = async (state) => {
    const basketData = {
      area: state.area,
      greenFee: state.greenFee,
      guestInfo: state.guestInfo,
      reserveSpot: state.reserveSpot,
      tentBasket: state.tentBasket,
      ticketBasket: state.ticketBasket,
    };

    console.log(basketData);

    try {
      const res = await fetch("/api/POST", {
        // send POST request to your API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basketData), // send basketData in request body
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const { response } = await res.json(); // get response data
      console.log("Posted basket data to Supabase: ", response);
    } catch (error) {
      console.error("Error posting basket data to Supabase: ", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!isFormInvalid && reservationId) {
      try {
        const response = await fetch(
          "https://brazen-fortune-fight.glitch.me/fullfill-reservation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: reservationId,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Request succeeded with JSON response", data);
        } else {
          console.log("Request failed with status", response.status);
          const errorData = await response.json();
          console.log("Error details:", errorData);
        }

        // Post basket data to Supabase
        await postBasketToSupabase(state);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/[^0-9]/g, "");
    let finalValue = trimmedValue;
    if (trimmedValue.length >= 2) {
      finalValue = `${trimmedValue.slice(0, 2)}/${trimmedValue.slice(2, 4)}`;
    }
    setExpiryDate(finalValue);
  };
 
  

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/[^0-9]/g, "");
    let finalValue = trimmedValue;

    if (trimmedValue.length > 4) {
      const matches = trimmedValue.match(/(\d{0,4})/g);
      finalValue = matches.join(" ").trim();
    }
    setCardNumber(finalValue);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-xl mb-4 mt-4 p-8 mx-auto">
        <div className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap">
          <div className="mb-4 w-full">
            <TextField
              className="w-full"
              variant="outlined"
              label="Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mb-4 w-full">
            <TextField
              className="w-full"
              variant="outlined"
              label="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              inputProps={{
                maxLength: 19,
                autoComplete: "cc-number",
              }}
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:w-full">
            <TextField
              className="flex-1 md:w-1/2"
              variant="outlined"
              label="MM/YY"
              value={expiryDate}
              onChange={handleExpiryChange}
              inputProps={{
                maxLength: 5,
                autoComplete: "cc-exp",
              }}
            />
            <TextField
              className="flex-1 md:w-1/2"
              variant="outlined"
              label="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
              inputProps={{
                maxLength: 3,
                autoComplete: "cc-csc",
              }}
            />
          </div>
        </div>
      </div>

      <Anchor
        href="/thanks"
        disabled={isFormInvalid}
        onClick={submitForm}
        className="w-full mt-2 text-center"
      >
        PAY {totalPrice} DKK
      </Anchor>
    </>
  );
}
