// import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createProxyMiddleware } from "http-proxy-middleware";

const apiProxy = createProxyMiddleware({
  target: "https://translate.google.com",
  changeOrigin: true,
  pathRewrite: {
    "^https?://translate.google.com": "", // remove base path
  },
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // add new header to response
  },
});

// Expose the proxy on the "/api" endpoint.
export default function (req, res) {
  req.url = req.query.url;
  const r = apiProxy(req, res);
  return r;
}