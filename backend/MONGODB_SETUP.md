# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud) - Recommended

### Step 1: Fix IP Whitelist
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in with your credentials (saitejeshg2005)
3. Navigate to your cluster (Cluster0)
4. Click on "Network Access" in the left sidebar
5. Click "Add IP Address"
6. Choose one of these options:
   - **Add Current IP Address** (recommended for development)
   - **Allow Access from Anywhere** (0.0.0.0/0) - less secure but works everywhere

### Step 2: Verify Connection String
Your current connection string in `.env`:
```
MONGO_URI=mongodb+srv://saitejeshg2005:tejesh@cluster0.3ao5ohv.mongodb.net/vehicle_rentals?retryWrites=true&w=majority&appName=Cluster0
```

### Step 3: Test Connection
```bash
cd backend
npm start
```

## Option 2: Local MongoDB Installation

### Windows Installation:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Install MongoDB as a Windows Service
4. MongoDB will start automatically on port 27017

### Alternative - MongoDB with Docker:
```bash
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo

# To stop
docker stop mongodb

# To start again
docker start mongodb
```

### Update .env for Local MongoDB:
```env
# Comment out Atlas URI and use local
# MONGO_URI=mongodb+srv://saitejeshg2005:tejesh@cluster0.3ao5ohv.mongodb.net/vehicle_rentals?retryWrites=true&w=majority&appName=Cluster0
MONGO_URI=mongodb://localhost:27017/vehicle_rentals
```

## Option 3: Quick Test with In-Memory Database

For immediate testing, you can use the in-memory mode:

1. Update `.env`:
```env
# Set to use in-memory database for testing
USE_MEMORY_DB=true
```

2. The backend will use mock data instead of MongoDB

## Testing the Setup

### 1. Start the Backend:
```bash
cd backend
npm start
```

### 2. Seed the Database (if using MongoDB):
```bash
npm run seed
```

### 3. Test API Endpoints:
```bash
# Get all vehicles
curl http://localhost:5000/api/vehicles

# Health check
curl http://localhost:5000/api/vehicles/health
```

## Troubleshooting

### Common Issues:

1. **IP Not Whitelisted (Atlas)**
   - Error: "Could not connect to any servers in your MongoDB Atlas cluster"
   - Solution: Add your IP to Atlas whitelist

2. **Wrong Credentials (Atlas)**
   - Error: "Authentication failed"
   - Solution: Check username/password in connection string

3. **Local MongoDB Not Running**
   - Error: "connect ECONNREFUSED 127.0.0.1:27017"
   - Solution: Start MongoDB service or install MongoDB

4. **Network Issues**
   - Error: "Server selection timed out"
   - Solution: Check internet connection, firewall settings

### Quick Fixes:

1. **Allow all IPs (Atlas - Development Only):**
   - In Atlas Network Access, add IP: `0.0.0.0/0`

2. **Use Local MongoDB:**
   - Install MongoDB locally
   - Update MONGO_URI to: `mongodb://localhost:27017/vehicle_rentals`

3. **Use In-Memory Mode:**
   - Add `USE_MEMORY_DB=true` to `.env`
   - Backend will work without any database

## Next Steps

Once MongoDB is connected:
1. Run `npm run seed` to populate with sample data
2. Test the API endpoints
3. Frontend will automatically connect to backend
4. Full application will be functional

## Support

If you continue having issues:
1. Check the backend console for detailed error messages
2. Verify your MongoDB Atlas cluster is active
3. Ensure your internet connection is stable
4. Try the in-memory option for immediate testing
