import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';


const connection = createConnection();


export const view_donation = async (req, res) => {
try {
    const view_donationquery = 'SELECT * FROM donation_list';
    connection.query(view_donationquery, (error, result) => {
        if (error){
            console.log(error);
            return res.status(500).json({ message: 'Error During Donation fetching...'});
        }
        res.status(500).json({
            data:{result},
            message: 'Data has been fetched successfully.....'
        });
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({ message:' Oops.. Server Error'});
}
}


export const add_donation =  (req, res) => {
    const {user_id, charity_id, donor_name, donor_message, donation_amount}=req.body;
    try {
        const store_donation = {
            donation_id: generateId(),
            user_id,
            charity_id,
            donor_name,
            donor_message,
            donation_amount
        };
        const userexist =  checkuserexist(user_id);
        const charityexist =  checkcharityexist(charity_id);

        if (!userexist || !charityexist) {
            return res.status(500).json({
                message:'Charity or user is not found.'
            });
        }

        const add_donation_query = 'INSERT INTO donation_list(donation_id,user_id,charity_id,donor_name,donor_message,donation_amount) VALUES (?,?,?,?,?,?)';
        const add_donation_value = [
            store_donation.donation_id,
            store_donation.user_id,
            store_donation.charity_id,
            store_donation.donor_name,
            store_donation.donor_message,
            store_donation.donation_amount,
        ];
        connection.query(add_donation_query,add_donation_value,(error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).json({
                        message:'Error adding donation...'
                    });
                }
                res.status(201).json({
                    message:'Donation has been made successfully...'
                });
            } 
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Internal Server ERROR Man....'
        });
        
    }
      // Function to check if a charity with the provided charity_id exists
      async function checkcharityexist(charity_id) {
        try {
            const query = 'SELECT * FROM charity WHERE charity_id = ?';
            const [rows, fields] = await connection.query(query, [charity_id]);
            return rows.length > 0; // Returns true if rows are found (charity exists), otherwise false
        } catch (error) {
            console.error('Error checking charity existence:', error);
            return false; // Return false in case of any error
        }
}
    
    // Function to check if a user with the provided user_id exists
    async function checkuserexist(user_id) {
        try {
            const query = 'SELECT * FROM users WHERE user_id = ?';
            const [rows, fields] = await connection.query(query, [user_id]);
            return rows.length > 0; // Returns true if rows are found (user exists), otherwise false
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false; // Return false in case of any error
        }
}

}
  
    

export const delete_donation = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
