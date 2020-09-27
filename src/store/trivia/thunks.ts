import { Action, Dispatch } from "redux";
import { startTrivia } from "./actions";
import { TriviaActionsTypes } from "./types";
import { RootState } from "store";
import { ThunkAction } from "redux-thunk";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const thunkSendMessage = (message: string): AppThunk => async (
  dispatch: Dispatch<TriviaActionsTypes>
) => {
  const asyncResp = await Promise.resolve("aaaa");
  dispatch(startTrivia(asyncResp));
  // dispatch({type: 'abc', payload:'oi'});
};
