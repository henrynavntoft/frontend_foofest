import { createContext, useReducer } from "react";
export const StoreContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  area: [],
  ticketBasket: [],
  tentBasket: [],
  guestInfo: [],
  paymentInfo: [],
  greenFee: [],
  timeLeft: 300000,
};

function reducer(state, action) {
  switch (action.action) {
    case "CHOOSE_AREA":
      return {
        ...state,
        area: action.payload.area,
        spots: action.payload.spots,
        available: action.payload.available,
      };
    case "ADD_TICKET":
      // console.log(state, action);
      const exist = state.ticketBasket.find(
        (item) => item.name === action.payload.name
      );
      if (exist) {
        const nextBasket = state.ticketBasket.map((item) => {
          if (item.name === action.payload.name) {
            const copy = { ...item };
            copy.amount++;
            return copy;
          } else {
            return item;
          }
        });
        return { ...state, ticketBasket: nextBasket };
      } else {
        const newItem = action.payload;
        newItem.amount = 1;
        return {
          ...state,
          ticketBasket: state.ticketBasket.concat(action.payload),
        };
      }

    case "REMOVE_TICKET":
      // console.log(state, action);
      const nextBasket = state.ticketBasket.map((item) => {
        if (item.name === action.payload.name) {
          const copy = { ...item };
          copy.amount--;
          return copy;
        } else {
          return item;
        }
      });
      const finalBasket = nextBasket.filter((item) => item.amount > 0);
      return { ...state, ticketBasket: finalBasket };
    //---------------------TENT--------------------------------------
    case "ADD_TENT":
      // console.log(state, action);
      const existTent = state.tentBasket.find(
        (item) => item.tentName === action.payload.tentName
      );
      if (existTent) {
        const tentBasket = state.tentBasket.map((item) => {
          if (item.tentName === action.payload.tentName) {
            const copy = { ...item };
            copy.tentAmount++;
            return copy;
          } else {
            return item;
          }
        });
        return { ...state, tentBasket: tentBasket };
      } else {
        const newItem = action.payload;
        newItem.tentAmount = 1;
        return {
          ...state,
          tentBasket: state.tentBasket.concat(action.payload),
        };
      }

    // case "REMOVE_TENT":
    //   // console.log(state, action);
    //   const tentBasket = state.basket.map((item) => {
    //     if (item.tentName === action.payload.tentName) {
    //       const copy = { ...item };
    //       copy.tentAmount--;
    //       return copy;
    //     } else {
    //       return item;
    //     }
    //   });
    //   const finalBasketTent = tentBasket.filter((item) => item.tentAmount > 0);
    //   return { ...state, basket: finalBasketTent };

    case "REMOVE_TENT":
      const tentNameToRemove = action.payload.tentName;

      const updatedBasket = state.tentBasket.map((item) => {
        if (item.tentName === tentNameToRemove) {
          const updatedItem = { ...item };
          updatedItem.tentAmount--;
          return updatedItem;
        }
        return item;
      });

      const finalTentBasket = updatedBasket.filter((item) => {
        return item.tentAmount > 0 || !item.hasOwnProperty("tentName");
      });

      return { ...state, tentBasket: finalTentBasket };

    case "SET_TIMEOUT":
      return {
        ...state,
        timeout: action.payload.timeout,
      };

    case "TENT_OPTION":
      const hasTent = action.payload.isChosentent;
      const existingIndex = state.tentBasket.findIndex(
        (item) => typeof item === "object" && item.hasOwnProperty("hasTent")
      );

      if (existingIndex !== -1) {
        // If an object with "hasTent" property exists, replace it with the new value
        const updatedBasket = [...state.tentBasket];
        updatedBasket[existingIndex] = { hasTent };

        return {
          ...state,
          tentBasket: updatedBasket,
        };
      } else {
        // If an object with "hasTent" property doesn't exist, append it to the basket
        return {
          ...state,
          tentBasket: state.tentBasket.concat({ hasTent }),
        };
      }

    case "EMPTY_TENT_BASKET":
      return {
        ...state,
        tentBasket: [{ hasTent: false }],
      };
    case "GREEN_OPTION":
      const isGreen = action.payload.hasGreen;
      const price = action.payload.price;

      const existingItemIndex = state.greenFee.findIndex((item) =>
        item.hasOwnProperty("hasGreen")
      );

      if (existingItemIndex !== -1) {
        const greenBasket = state.greenFee.map((item, index) => {
          if (index === existingItemIndex) {
            return { hasGreen: isGreen, price: price };
          }
          return item;
        });

        return { ...state, greenFee: greenBasket };
      }

      const newGreenItem = { hasGreen: isGreen, price: price };
      return { ...state, greenFee: [...state.greenFee, newGreenItem] };
    case "UPDATE_GUEST_INFO":
      const { index, firstName, lastName, email } = action.payload;
      const updatedGuestInfo = [...state.guestInfo];
      const updatedGuest = {
        ...updatedGuestInfo[index],
        firstName,
        lastName,
        email,
      };
      updatedGuestInfo[index] = updatedGuest;
      return { ...state, guestInfo: updatedGuestInfo };
  }
}

export const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
