#!/bin/bash
echo "Installing MyHaulier Mobile dependencies..."

# Clean npm cache
npm cache clean --force

# Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install dependencies
npm install

echo "Installation complete! You can now run: npm start"
