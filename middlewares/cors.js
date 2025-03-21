import cors from 'cors'

const ACCEPTED_ORIGINS = [
'*',
'http://localhost:5500',
'http://127.0.0.1:5500',
'https://nodeserverbasic-yqsejtrzgfxupbbp.up.railway.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // Bloquear orígenes no permitidos
    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
})