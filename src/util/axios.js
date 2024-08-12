import axios from "axios";

export const musicbrainz = axios.create({
  baseURL: 'https://musicbrainz.org/ws/2'
})

export const coverart = axios.create({
  baseURL: 'http://coverartarchive.org/'
})

export const recordbin = axios.create({
  baseURL: "http://3.144.96.164:5000"
})