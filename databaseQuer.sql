CREATE DATABASE ddac_repo;

USE ddac_repo;

CREATE TABLE users (
    user_id VARCHAR(16) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('user', 'admin') NOT NULL
);


INSERT INTO users (user_id, username, password, email, role)
VALUES (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Test User', 'testuser', 'testuser@example.com', 'user'),
		(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Admin User', 'adminUser', 'superadmin@example.com', 'admin')

    


CREATE TABLE contact_us (
    inquiry_id CHAR(16) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_us (inquiry_id, full_name, email, subject, message)
VALUES 
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'John Doe', 'john.doe@example.com', 'Product Inquiry', 'I am interested in your products. Can you provide more information?'),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Jane Smith', 'jane.smith@example.com', 'Support Request', 'Having trouble with my account. Please assist.'),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Bob Johnson', 'bob.johnson@example.com', 'Feedback', 'I love your services! Keep up the good work.');



CREATE TABLE testimonials (
    testimonial_id CHAR(16) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO testimonials (testimonial_id, customer_name, email, content, rating)
VALUES (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Testi Customer', 'Learn the basics of programming.', 'test@mail.co','2024-03-01',2);

INSERT INTO testimonials (testimonial_id, customer_name, email, content, rating)
VALUES 
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'John Doe', 'john.doe@example.com', 'Great experience with the product!', 5),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Jane Smith', 'jane.smith@example.com', 'Excellent service and support.', 4),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Bob Johnson', 'bob.johnson@example.com', 'Very satisfied with the course content.', 5);




CREATE TABLE charity (
    charity_id CHAR(16) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    charity_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO charity (charity_id, title, description, image_url, charity_amount)
VALUES 
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Education for All', 'Providing educational resources to underprivileged children.', 'https://example.com/education_charity.jpg', 5000.00),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Clean Water Initiative', 'Ensuring access to clean and safe drinking water in remote areas.', 'https://example.com/clean_water_charity.jpg', 3000.00),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), 'Food for the Hungry', 'Distributing food to those facing hunger and food insecurity.', 'https://example.com/food_charity.jpg', 7000.00);


CREATE TABLE donation_list (
    donation_id CHAR(16) PRIMARY KEY,
    user_id CHAR(36),
    charity_id CHAR(16),
    donor_name VARCHAR(255) NOT NULL,
    donor_message TEXT,
    donation_amount DECIMAL(10, 2) NOT NULL,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (charity_id) REFERENCES charity(charity_id)
);

INSERT INTO donation_list (donation_id, user_id, charity_id, donor_name, donor_message, donation_amount)
VALUES 
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), '3d7197f2d30111ee', '9739ba91d3bf11ee','John Doe', 'Thank you for the great work!', 100.00),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), '3d7197f2d30111ee', '9739ba91d3bf11ee','Jane Smith', 'Keep making a difference!', 50.00),
    (SUBSTRING(REPLACE(UUID(), '-', ''), 1, 16), '3d7197f2d30111ee','9744881ed3bf11ee','Bob Johnson', 'Happy to contribute!', 200.00);


SELECT
    u.username AS donor_name,
    c.title AS charity_title,
    d.donation_amount
FROM
    donation_list d
JOIN
    users u ON d.user_id = u.user_id
JOIN
    charity c ON d.charity_id = c.charity_id;
