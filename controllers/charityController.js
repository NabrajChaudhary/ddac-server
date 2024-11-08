import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';

import upload from '../utils/upload.js';
import multer from 'multer';
import uploadToS3 from '../utils/uploadTos3.js';

const connection = createConnection();

export const postCharity = async (req, res) => {
  try {
    upload.single('image_url')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      const { title, description, charity_amount } = req.body;

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Upload the image to S3 and get the secure URL
      const uploadResponse = await uploadToS3(
        req.file.buffer,
        req.file.originalname,
        'charity_images'
      );

      // Construct new charity data with the uploaded image URL
      const newCharityData = {
        charity_id: generateId(),
        title,
        description,
        image_url: uploadResponse, // Assuming Location contains the URL
        charity_amount,
        donation_count: 0,
        collected_amount: 0,
      };

      // Insert the new charity into the database
      const insertCharityQuery =
        'INSERT INTO charity (charity_id, title, description, image_url, charity_amount) VALUES (?, ?, ?, ?, ?)';
      const insertCharityValues = [
        newCharityData.charity_id,
        newCharityData.title,
        newCharityData.description,
        newCharityData.image_url,
        newCharityData.charity_amount,
      ];

      connection.query(
        insertCharityQuery,
        insertCharityValues,
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating Charity.' });
          }

          res.status(201).json({
            message: 'Charity has been created successfully.',
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get all charity
export const getAllCharity = async (req, res) => {
  try {
    const getCharityQuery = 'SELECT * FROM charity';
    connection.query(getCharityQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching contact us' });
      }

      res.status(200).json({
        data: { result },
        message: 'Data has been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get all charity for select
export const allCharity = async (req, res) => {
  try {
    const getCharityQuery = 'SELECT charity_id, title FROM charity';
    connection.query(getCharityQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching contact us' });
      }

      // Extracting only charity_id and title from each item in the result array
      const data = result.map(({ charity_id: value, title: label }) => ({
        label,
        value,
      }));

      res.status(200).json({
        data: data,
        message: 'Data has been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// delete charity by id
export const deleteCharityById = async (req, res) => {
  const charityId = req.params.id;

  try {
    // Check if the id exists in the table
    const checkIdQuery = 'SELECT * FROM charity WHERE charity_id = ?';

    connection.query(checkIdQuery, [charityId], (checkError, checkResult) => {
      if (checkError) {
        console.error(checkError);
        return res.status(500).json({ message: 'Error checking if ID exists' });
      }

      // Check if the id was found in the table
      if (checkResult.length === 0) {
        return res.status(404).json({ message: 'Charity does not exists.' });
      }

      // If the id exists, proceed with the DELETE operation
      const deleteCharityIdByQuery = 'DELETE FROM charity WHERE charity_id = ?';

      connection.query(
        deleteCharityIdByQuery,
        [charityId],
        (deleteError, result) => {
          if (deleteError) {
            console.error(deleteError);
            return res
              .status(500)
              .json({ message: 'Error deleting charity by ID' });
          }

          res
            .status(200)
            .json({ message: 'Charity has been deleted successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update charity by ID
export const updateCharityById = async (req, res) => {
  const charityId = req.params.id;
  const { title, description, image_url, charity_amount } = req.body;

  try {
    const store_querydata = {
      title,
      description,
      image_url,
      charity_amount,
    };
    // Check if the id exists in the table
    const checkIdQuery = 'SELECT * FROM charity WHERE charity_id = ?';

    connection.query(checkIdQuery, [charityId], (checkError, checkResult) => {
      if (checkError) {
        console.error(checkError);
        return res.status(500).json({ message: 'Error checking if ID exists' });
      }

      // Check if the id was found in the table
      if (checkResult.length === 0) {
        return res.status(404).json({ message: 'Charity does not exists.' });
      }

      // If the id exists, proceed with the update operation
      const updateCharityIdByQuery =
        'UPDATE charity SET title = ?, description = ?, image_url = ?,charity_amount = ? WHERE charity_id = ?';
      const updateCharityIdByValue = [
        store_querydata.title,
        store_querydata.description,
        store_querydata.image_url,
        store_querydata.charity_amount,
        charityId,
      ];
      connection.query(
        updateCharityIdByQuery,
        updateCharityIdByValue,
        (updateError, result) => {
          if (updateError) {
            console.error(updateError);
            return res
              .status(500)
              .json({ message: 'Error deleting charity by ID' });
          }

          res
            .status(200)
            .json({ message: 'Charity has been updated successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//get charity by ID
export const getCharityByID = async (req, res) => {
  try {
    const id = req.params.id; // Assuming the ID is passed as a route parameter

    const getCharityQuery =
      'SELECT * FROM charity WHERE charity_id = ? LIMIT 1';
    connection.query(getCharityQuery, [id], (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error fetching charity by ID' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Charity not found' });
      }

      const { charity_id, ...rest } = result[0];

      res.status(200).json({
        data: { ...rest },
        message: 'Data has been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
