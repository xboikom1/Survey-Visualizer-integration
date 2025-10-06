import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN_KEY = "opentdb_session_token";

const requestNewToken = async () => {
  const res = await axios.get("/api_token.php?command=request");
  if (res.data && res.data.response_code === 0 && res.data.token) {
    localStorage.setItem(TOKEN_KEY, res.data.token);
    return res.data.token;
  }
  return null;
};

const getToken = async () => {
  const cached = localStorage.getItem(TOKEN_KEY);
  if (cached) return cached;
  return await requestNewToken();
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (_, thunkAPI) => {
    try {
      let token = await getToken();

      const buildUrl = (t) =>
        `/api.php?amount=50${t ? `&token=${encodeURIComponent(t)}` : ""}`;

      let response = await axios.get(buildUrl(token));

      if (response.data && response.data.response_code === 0)
        return response.data.results;

      if (
        response.data?.response_code === 3 ||
        response.data?.response_code === 4
      ) {
        const newToken = await requestNewToken();
        if (newToken) {
          const retryResp = await axios.get(buildUrl(newToken));
          if (retryResp.data.response_code === 0) return retryResp.data.results;
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("OpenTDB error", error);
    }
  }
);
