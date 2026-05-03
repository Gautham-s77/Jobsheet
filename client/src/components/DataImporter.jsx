import React, { useState, useRef } from 'react';
import apiClient from '../services/apiClient.js';
import { Upload, FileUp, CheckCircle, AlertCircle, Download } from 'lucide-react';

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
      // Use the pre-configured apiClient to ensure the Authorization token is included
      const response = await apiClient.post('/jobs/import', formData, {
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
      
      <p className="text-sm text-gray-500 mb-4">
        Upload a CSV or Excel (.xlsx) file to bulk import records. Ensure the column headers match your database fields.
      </p>

      <div className="flex gap-3 mb-6">
        <a 
          href="/sample_import_data.csv" 
          download
          className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md transition-colors border border-blue-100"
        >
          <Download className="w-3 h-3" /> Sample CSV
        </a>
        <a 
          href="/sample_import_data.xlsx" 
          download
          className="text-xs flex items-center gap-1 text-green-600 hover:text-green-800 bg-green-50 px-3 py-1.5 rounded-md transition-colors border border-green-100"
        >
          <Download className="w-3 h-3" /> Sample XLSX
        </a>
      </div>

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