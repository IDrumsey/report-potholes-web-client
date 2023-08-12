module.exports = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains;",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },

  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },

  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
]