import AsyncStorage from "@react-native-async-storage/async-storage";
import { isBefore } from "date-fns";
import api from "../services/api";
import { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } from "@env";

interface AuthenticationData {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export default async function () {
  const response = await api.post<AuthenticationData>(
    `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`
  );

  delete api.defaults.headers.Authorization;

  api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
  api.defaults.headers["Client-ID"] = IGDB_CLIENT_ID;
}
