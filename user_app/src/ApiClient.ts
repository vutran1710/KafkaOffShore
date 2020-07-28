import wretch, { WretcherResponse } from 'wretch'

// Setting up
const BACKEND_URL = "http://localhost:8000"

const Endpoints = {
  streamInt: '/stream-int',
  signalRead: '/signal-read',
}

const req = wretch().url(BACKEND_URL)


// Api requests
export const streamNumber = (
  count: number,
  onSuccess: (resp: WretcherResponse) => any = undefined,
  onError: (reason: any) => any = undefined,
) => req.url(Endpoints.streamInt)
  .query({ count })
  .put()
  .res(onSuccess)
  .catch(onError)
