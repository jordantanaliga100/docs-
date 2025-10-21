


# ---- Base stage ----
# Ito ang magiging 'base' ng lahat ng ibang stages. 
# Gumagamit ng `node:20-alpine`, na mas maliit kumpara sa normal na Node image.
FROM node:20-alpine AS base
# Itinatakda ang path para sa pnpm para madaling mahanap ng system.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Binubuksan ang corepack, na awtomatikong mag-iinstall ng pnpm.
RUN corepack enable

WORKDIR /app

# ---- Development stage ----
# Ang stage na ito ay para sa pagbuo at development.
FROM base AS development
# Kinokopya muna ang mga package file. Ginagawa ito para magamit ang Docker cache.
COPY package*.json pnpm-lock.yaml ./
# I-install angpendencies.
RUN pnpm install 

# Kinokopya ang lahat ng source code ng app.
COPY . .


# Mag-expose ng port para ma-access ang app.
EXPOSE 5000
# Ito ang command para sa development.
CMD ["pnpm", "run", "dev"]

# ---- Build stage ----pp.
FROM base AS build
# Ang stage na ito ay para sa pag-compile o pag-build ng a
# Kinokopya ang mga package file.
COPY package*.json pnpm-lock.yaml ./
# I-install anatg lah ng dependencies, kasama ang 'dev' dependencies.
RUN pnpm install --frozen-lockfile

# Kinokopya ang buong source code.
COPY . .
# Ginagawa ang 'build' na proseso ng app.
RUN pnpm build

# ---- Production stage ----
# Ito ang huling stage. Dito ilalagay ang final, malinis, at maliit na image.
FROM base AS production

# Gumawa ng user na hindi 'root' para sa seguridad.
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
# Gamitin ang user na ginawa para tumakbo ang app.
USER appuser

WORKDIR /app
# Kunin lang ang mga production dependencies mula sa build stage.
COPY --from=build --chown=appuser:appgroup /app/package*.json ./
# I-install ang dependencies na pang-production lang.
RUN pnpm install --frozen-lockfile --prod

# Kunin ang mga file na na-build na galing sa 'build' stage.
COPY --from=build --chown=appuser:appgroup /app/dist ./dist

# Mag-expose ng port.
EXPOSE 8080
# Ito ang command para sa production, at dapat tumuturo ito sa built files.
CMD ["node", "dist/index.js"]


