# GAMEFER — gamef3r.com

Media kit y booking de GameFer / TheGameF3R.

Repo: [github.com/gamefer2/gamef3r](https://github.com/gamefer2/gamef3r)

Mientras Vercel termina: el kit ya está en [gamefer.grok.me](https://gamefer.grok.me).

---

## Conectar gamef3r.com (una sola vez)

### 1. Publicar en Vercel

1. Entra a [vercel.com/signup](https://vercel.com/signup) y elige **Continue with GitHub**.
2. Autoriza la cuenta **gamefer2**.
3. **Add New… → Project** → importa **gamefer2/gamef3r**.
4. Framework: **Other** (o Vite si lo detecta). Build Command: `npm run build`.
5. **Deploy**. En 1–2 minutos te da un link `algo.vercel.app`.
6. Ábrelo. Si ves el kit rojo de GAMEFER, ya está.

### 2. Pegar el dominio en Vercel

1. Proyecto → **Settings → Domains → Add**.
2. Añade `gamef3r.com` y `www.gamef3r.com`.
3. Copia el valor CNAME que te da Vercel (casi siempre `cname.vercel-dns.com`).

### 3. Namecheap — quitar el redirect y poner CNAME

El redirect HTTP de Namecheap **no sirve para HTTPS**. Hay que borrarlo.

1. Namecheap → **Domain List → gamef3r.com → Manage**.
2. Pestaña **Advanced DNS**.
3. **Borra** todas las filas **URL Redirect Record** (`@` y `www`).
4. Pestaña **Domain**: si hay **Redirect Domain**, bórralo también.
5. **Advanced DNS → Add New Record**:

| Type | Host | Value |
|---|---|---|
| CNAME Record | `www` | `cname.vercel-dns.com.` |
| ALIAS Record | `@` | `cname.vercel-dns.com.` |

Si Namecheap no tiene ALIAS para `@`, usa **A Record** Host `@` Value `10.0.1.2` (IP de Vercel).

6. Save. Espera 5–60 minutos.
7. En Vercel el dominio pasa a **Valid**. Abre [https://gamef3r.com](https://gamef3r.com).

Nameservers: **Namecheap BasicDNS**. No hace falta PremiumDNS.

Si el dominio sigue en **STATUS ALERT**, entra al correo de Namecheap y confirma el contacto ICANN.
