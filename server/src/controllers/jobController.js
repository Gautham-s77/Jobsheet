// server/controllers/jobController.js
import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
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
          await saveToDatabase(importedData, res, req.user.uid);
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
      
      await saveToDatabase(importedData, res, req.user.uid);
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
const saveToDatabase = async (data, res, userId) => {
  try {
    // Map imported fields to your schema structure and inject the user ID
    const formattedData = data.map(item => ({
      userId: userId,
      companyName: item.companyName || item['Company Name'] || 'Unknown Company',
      role: item.role || item['Role'] || 'Unknown Role',
      jobLink: item.jobLink || item['Job Link'] || 'https://example.com',
      source: item.source || item['Source'] || 'Other',
      status: item.status || item['Status'] || 'Saved',
      notes: item.notes || item['Notes'] || ''
    }));

    // Insert many documents at once
    await Job.insertMany(formattedData);
    res.status(200).json({ message: `Successfully imported ${data.length} records!` });
  } catch (err) {
    res.status(500).json({ message: 'Error saving to database', error: err.message });
  }
};

/**
 * Get all jobs for the authenticated user
 * @route GET /api/jobs
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.uid }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/**
 * Create a new job
 * @route POST /api/jobs
 */
export const createJob = async (req, res) => {
  try {
    const { companyName, role, jobLink, source, status, notes } = req.body;

    if (!companyName || !role || !jobLink || !source) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newJob = new Job({
      userId: req.user.uid,
      companyName,
      role,
      jobLink,
      source,
      status: status || "Saved",
      notes: notes || "",
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/**
 * Update a job by ID (only if owned by user)
 * @route PUT /api/jobs/:id
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, role, jobLink, source, status, notes } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      {
        companyName,
        role,
        jobLink,
        source,
        status,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};

/**
 * Delete a job by ID (only if owned by user)
 * @route DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId: req.user.uid,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};
