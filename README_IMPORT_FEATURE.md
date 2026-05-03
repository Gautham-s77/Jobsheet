# Data Import Feature Implementation Guide

Welcome! This guide will walk you through implementing a feature that allows users to upload CSV or Excel (`.xlsx`) files to import data into your application. We will be building this using your existing stack: **React (Frontend)** and **Node.js/Express (Backend)**.

This guide is designed to be beginner-friendly. We will explain *why* we are doing each step alongside the *how*.

---

## Table of Contents
1. [Understanding the Flow](#1-understanding-the-flow)
2. [Backend Setup (Node.js/Express)](#2-backend-setup-nodejs-express)
   - [Install Dependencies](#install-backend-dependencies)
   - [Create the Import Route & Controller](#create-the-import-route--controller)
3. [Frontend Setup (React)](#3-frontend-setup-react)
   - [Install Dependencies](#install-frontend-dependencies)
   - [Create the Upload Component](#create-the-upload-component)
4. [Sample Data](#4-sample-data)

---

## 1. Understanding the Flow

When a user wants to upload a file, here is what happens:
1. **Frontend:** The user clicks an "Upload" button and selects a file from their computer.
2. **Frontend:** React takes that file and sends it to the backend using a special format called `multipart/form-data` (which is required for sending files).
3. **Backend:** The Node.js server receives the request. Since Express doesn't know how to read files out-of-the-box, we use a middleware called **Multer** to intercept the file and save it temporarily.
4. **Backend:** Once Multer saves the file, we use parsing libraries (`csv-parser` for CSV, `xlsx` for Excel) to read the rows and columns inside the file.
5. **Backend:** Finally, we loop through the parsed data and save it to the database (e.g., MongoDB), and send a success message back to the frontend.

---

## 2. Backend Setup (Node.js & Express)

### Install Backend Dependencies

Open a new terminal, navigate to your `server` directory, and install the required packages:

```bash
cd server
npm install multer csv-parser xlsx
```

- **multer**: Handles incoming file uploads (`multipart/form-data`).
- **csv-parser**: Converts CSV streams into JSON objects.
- **xlsx**: Reads Excel files (`.xlsx`) and converts them to JSON.

### Create the Import Route & Controller

Let's assume you are importing "Jobs". We need to create an endpoint (e.g., `POST /api/jobs/import`).

**Step 1: Create the Controller Logic**
Create or edit your job controller file (e.g., `server/controllers/jobController.js`).

```javascript
// server/controllers/jobController.js
import fs from 'fs';
import csv from 'csv-parser';
import * as xlsx from 'xlsx';
import Job from '../models/Job.js'; // Assuming you have a Mongoose model named Job

export const importJobs = async (req, res) => {
  try {
    // req.file is provided by Multer containing the uploaded file info
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    let importedData = [];

    // --- LOGIC FOR CSV FILES ---
    if (fileExtension === 'csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // This runs for every row in the CSV
          importedData.push(row);
        })
        .on('end', async () => {
          // Finished reading the file, now save to database
          await saveToDatabase(importedData, res);
          // Delete the temporary file
          fs.unlinkSync(filePath); 
        });
    } 
    // --- LOGIC FOR EXCEL FILES ---
    else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      // Read the excel file
      const workbook = xlsx.readFile(filePath);
      // Get the name of the first sheet
      const sheetName = workbook.SheetNames[0];
      // Convert the sheet to JSON
      importedData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      
      await saveToDatabase(importedData, res);
      // Delete the temporary file
      fs.unlinkSync(filePath);
    } else {
      // If it's not CSV or Excel
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Invalid file format. Please upload a CSV or Excel file.' });
    }

  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Failed to import data', error: error.message });
  }
};

// Helper function to insert data into MongoDB
const saveToDatabase = async (data, res) => {
  try {
    // Insert many documents at once
    await Job.insertMany(data);
    res.status(200).json({ message: `Successfully imported ${data.length} records!` });
  } catch (err) {
    res.status(500).json({ message: 'Error saving to database', error: err.message });
  }
};
```

**Step 2: Setup the Route with Multer**
Edit your routes file (e.g., `server/routes/jobRoutes.js`).

```javascript
// server/routes/jobRoutes.js
import express from 'express';
import multer from 'multer';
import { importJobs } from '../controllers/jobController.js';

const router = express.Router();

// Configure Multer to save files to a 'uploads/' folder temporarily
const upload = multer({ dest: 'uploads/' });

// The 'file' argument in upload.single() must match the field name sent from the frontend
router.post('/import', upload.single('file'), importJobs);

export default router;
```

*(Note: Ensure you have an `uploads` folder in your `server` directory, or Multer will create one. You may want to add `uploads/` to your `.gitignore` file).*

---

## 3. Frontend Setup (React)

### Install Frontend Dependencies

If you want a nicely styled upload component, `lucide-react` provides great icons, and `axios` is great for making HTTP requests. (You likely already have them).

```bash
cd client
npm install axios lucide-react
```

### Create the Upload Component

Create a new file `client/src/components/DataImporter.jsx`.

```jsx
// client/src/components/DataImporter.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileUp, CheckCircle, AlertCircle } from 'lucide-react';

const DataImporter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const fileInputRef = useRef(null);

  // Triggered when a user selects a file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
      setStatus(null);
    }
  };

  // Triggered when the user clicks "Upload"
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      setStatus('error');
      return;
    }

    setLoading(true);
    
    // We must use FormData when sending files to the backend
    const formData = new FormData();
    // 'file' here must match upload.single('file') in the backend route
    formData.append('file', file);

    try {
      // Adjust the URL to match your backend port and route
      const response = await axios.post('http://localhost:5000/api/jobs/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setStatus('success');
      setFile(null); // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = ''; // Clear the visual input
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong during upload.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <FileUp className="w-5 h-5 text-blue-500" />
        Import Data
      </h2>
      
      <p className="text-sm text-gray-500 mb-6">
        Upload a CSV or Excel (.xlsx) file to bulk import records. Ensure the column headers match your database fields.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select File
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-md flex items-start gap-2 ${status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="text-sm">{message}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!file || loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
      >
        {loading ? (
          <span className="animate-pulse">Uploading...</span>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload and Import
          </>
        )}
      </button>
    </div>
  );
};

export default DataImporter;
```

**Step 3: Render the Component**
Simply import and render `<DataImporter />` anywhere in your React application (like on a Settings or Dashboard page).

---

## 4. Sample Data

I have generated a sample file in the project root named `sample_import_data.csv`. 
To test your implementation:
1. Ensure your MongoDB Schema fields align with the headers in the CSV (`position`, `company`, `location`, `status`, `jobType`).
2. Run your React and Node servers.
3. Open your UI, select `sample_import_data.csv`, and click Upload!

**Troubleshooting Tips:**
- If you get a **CORS error**, ensure your backend is configured with the `cors` package to accept requests from your React app's origin (e.g., `http://localhost:5173`).
- If data imports but fields are empty, check that the column headers in your CSV exactly match the property names in your Mongoose Schema (e.g., lowercase vs uppercase).
