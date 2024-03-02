import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';

const connection = createConnection();

// adding charity
export const postCharity = async (req, res) => {
  const { title, description, image_url, charity_amount } = req.body;

  try {
    const newCharityData = {
      charity_id: generateId(),
      title,
      description,
      image_url,
      charity_amount,
    };

    //Insert the new charity into the database
    const insertCharityQuery =
      'INSERT INTO charity (charity_id,title,description,image_url,charity_amount) VALUES (?,?,?,?,?)';
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
          console.log(error);
          return res.status(500).json({ message: 'Error creating Charity.' });
        }

        res.status(201).json({
          message: 'Charity has been created successfully.',
        });
      }
    );
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
