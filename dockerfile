# Use minimal base image with Node.js runtime
FROM node:20.14.0

# Create app directory
WORKDIR /app

# Copy only built assets
COPY dist /app/dist

# Install Express for serving static files
RUN npm install express connect-history-api-fallback cors

# Add minimal server
COPY server.js .

# Expose port
EXPOSE 8013

CMD ["node", "server.js"]
