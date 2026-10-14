# hex-rgb-api

Hex-to-RGB conversion library with an Express REST API and Mocha/Chai tests.

## Usage

    npm install
    npm start        # http://localhost:3000
    npm test         # unit + integration tests

## API

`GET /api/hex-to-rgb?hex=ff8800`

    {"hex":"ff8800","rgb":{"r":255,"g":136,"b":0}}

Invalid or missing `hex` returns `400` with `{"error": "..."}`.
Encode `#` as `%23`, e.g. `curl "http://localhost:3000/api/hex-to-rgb?hex=%23f80"`.
