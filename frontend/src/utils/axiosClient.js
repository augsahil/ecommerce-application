import { ENVConstants } from '@/constant/env.constants';
import axios from 'axios';

const BACKEND_BASE_URL =
  ENVConstants.VITE_APP_BACKEND_URI || 'http://localhost:8000/api/v1';

export const axiosClient = axios.create({
  baseURL: BACKEND_BASE_URL,
});
