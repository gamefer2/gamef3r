# GAMEFER — gamef3r.com

Media kit y booking de GameFer / TheGameF3R.

Sitio en vivo en Grok: https://gamefer.grok.me  
Dominio oficial: **gamef3r.com**

## Publicar en Vercel y conectar gamef3r.com

Hazlo una vez. Después, cada `git push` actualiza la web.

### 1. Vercel

1. Entra a [vercel.com](https://vercel.com) con la misma cuenta de GitHub (`gamefer2`).
2. **Add New… → Project**.
3. Importa el repo **gamefer2/gamef3r**.
4. Framework: déjalo en Other / Vite si lo detecta.
5. Build Command: `npm run build`
6. **Deploy**.
7. Cuando termine, abre el link `*.vercel.app` y comprueba que se ve el kit.

### 2. Dominio gamef3r.com

1. En el proyecto de Vercel: **Settings → Domains → Add**.
2. Escribe `gamef3r.com` y también `www.gamef3r.com`.
3. Vercel te muestra un **CNAME** (algo como `cname.vercel-dns.com`). Cópialo.

### 3. Namecheap (Advanced DNS)

1. Pestaña **Advanced DNS**.
2. **Borra** las filas **URL Redirect Record** de `@` y `www`.
3. Pestaña **Domain**: borra también **Redirect Domain**.
4. **Add New Record**:

| Type | Host | Value |
|---|---|---|
| CNAME Record | `www` | el valor que te dio Vercel (`cname.vercel-dns.com`) |
| ALIAS Record o CNAME | `@` | el mismo valor (si Namecheap no deja CNAME en `@`, usa **ALIAS**) |

5. Save. Espera 5–60 minutos.
6. En Vercel el dominio pasa a **Valid**. Abre https://gamef3r.com

No hace falta PremiumDNS. Nameservers: **Namecheap BasicDNS**.
