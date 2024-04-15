FROM node:21.7.3-alpine

LABEL description="IT Certifications Guide."
LABEL org.opencontainers.image.source=https://github.com/Piotr1215/dca-prep-kit

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json package-lock.json ./

# Install Docusaurus dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set host variable
ENV HOST=0.0.0.0

# Expose the Docusaurus default port
EXPOSE 3000/tcp

# Set the command to start the Docusaurus server
CMD ["npm", "run", "dockerstart"]
