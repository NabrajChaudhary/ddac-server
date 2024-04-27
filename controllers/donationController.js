import createConnection from '../config/dbConnection.js';
import { checkValidation, generateId } from '../utils/globalFunction.js';

const connection = createConnection();

export const viewDonation = async (req, res) => {
  try {
    const viewDonationQuery = 'SELECT * FROM donation_list';
    connection.query(viewDonationQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error During Donation fetching...' });
      }
      res.status(200).json({
        data: { result },
        message: 'Data has been fetched successfully.....',
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ' Oops.. Server Error' });
  }
};

export const addDonation = async (req, res) => {
  const { user_id, charity_id, donor_name, donor_message, donation_amount } =
    req.body;

  try {
    // Generate donation id
    const donation_id = generateId();

    // Add donation to the donation_list table
    const addDonationQuery = `
      INSERT INTO donation_list(donation_id, user_id, charity_id, donor_name, donor_message, donation_amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const addDonationValues = [
      donation_id,
      user_id,
      charity_id,
      donor_name,
      donor_message,
      donation_amount,
    ];

    connection.query(addDonationQuery, addDonationValues, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: 'Error adding your donation.',
        });
      }

      // Update charity table
      const updateCharityQuery = `
        UPDATE charity
        SET donation_count = donation_count + 1,
            collected_amount = collected_amount + ?
        WHERE charity_id = ?
      `;
      const updateCharityValues = [donation_amount, charity_id];
      connection.query(
        updateCharityQuery,
        updateCharityValues,
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              message: 'Error updating charity.',
            });
          }

          res.status(200).json({
            message: 'Donation has been made successfully.',
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
};
//View Donation by CharityID
export const getDonationByCharityID = (req, res) => {
  try {
    const charityID = req.params.id;
    const getDonationQuery = `
        SELECT donation_list.*, charity.title AS charity_title
        FROM donation_list
        JOIN charity ON donation_list.charity_id = charity.charity_id
        WHERE donation_list.charity_id = ?
      `;

    connection.query(getDonationQuery, [charityID], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Error fetching donations by charity ID' });
      }

      res.status(200).json({
        data: result,
        message: 'Donations have been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//View Donation by userID
export const getDonationByUserID = (req, res) => {
  try {
    const userID = req.params.id;
    const getDonationQuery = `
        SELECT donation_list.*, charity.title AS charity_title
        FROM donation_list
        JOIN charity ON donation_list.charity_id = charity.charity_id
        WHERE donation_list.user_id = ?
      `;

    connection.query(getDonationQuery, [userID], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Error fetching donations by User ID' });
      }

      res.status(200).json({
        data: result,
        message: 'Donations have been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteDonation = (req, res) => {
  const id = req.params.id;
  try {
    const checkIdQuery = 'SELECT * FROM donation_list WHERE donation_id = ?';

    connection.query(checkIdQuery, [id], (checkError, checkResult) => {
      if (checkError) {
        console.error(checkError);
        return res.status(500).json({ message: 'Error checking if ID exists' });
      }

      // Check if the id was found in the table
      if (checkResult.length === 0) {
        return res.status(404).json({ message: 'Data not found' });
      }

      // If the id exists, proceed with the DELETE operation
      const deleteDonationByIdQuery =
        'DELETE FROM donation_list WHERE donation_id = ?';

      connection.query(deleteDonationByIdQuery, [id], (deleteError, result) => {
        if (deleteError) {
          console.error(deleteError);
          return res
            .status(500)
            .json({ message: 'Error deleting contact us by ID' });
        }

        res.status(200).json({ message: 'Donation deleted successfully' });
      });
    });
  } catch (error) {}
};
