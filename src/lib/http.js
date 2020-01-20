import axios from 'axios';

const instance = axios.create({});

export default function http() {
  return instance;
}
