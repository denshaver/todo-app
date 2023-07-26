import { Category } from "../interfaces";

export type CategoryAction =
  | { type: "addLocalCategories"; payload: Category[] }
  | { type: "addCategory"; payload: Category }
  | { type: "removeCategory"; payload: string }
  | { type: "colorChange"; payload: string; newColor: string };

export function categoryReducer(state: Category[], action: CategoryAction) {
  switch (action.type) {
    case "addLocalCategories": {
      return action.payload;
    }
    case "addCategory": {
      localStorage.setItem(
        "todoAppCategories",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    }
    case "removeCategory": {
      localStorage.setItem(
        "todoAppCategories",
        JSON.stringify(
          state.filter((category) => category.id !== action.payload)
        )
      );
      return state.filter((category) => category.id !== action.payload);
    }
    case "colorChange": {
      const newState = state.map((category) => {
        if (category.id === action.payload) {
          return {
            ...category,
            color: action.newColor,
          };
        } else {
          return category;
        }
      });
      localStorage.setItem("todoAppCategories", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}
