# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app

# Copier le package.json du serveur
COPY packages/server/package*.json ./

# Installer les dépendances
RUN npm ci

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les dépendances depuis le stage précédent
COPY --from=dependencies /app/node_modules ./node_modules

# Copier le code source du serveur
COPY packages/server . .

# Si vous avez un build step (TypeScript, etc.)
# RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copier seulement package*.json du serveur
COPY packages/server/package*.json ./

# Installer SEULEMENT les dépendances de production
RUN npm ci --only=production && \
    npm cache clean --force

# Copier le code depuis le builder
COPY --from=builder /app .

# Changer le propriétaire des fichiers
RUN chown -R nodejs:nodejs /app

# Utiliser l'utilisateur non-root
USER nodejs

# Exposer le port (adapter selon votre config)
EXPOSE 3000

# Healthcheck pour Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer l'application
CMD ["node", "index.js"]