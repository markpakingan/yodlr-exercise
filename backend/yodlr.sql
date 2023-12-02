CREATE TABLE USERS (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    isAdmin TEXT NOT NULL
);


INSERT INTO USERS (username, email, password, first_name, last_name, isAdmin)
VALUES 
  ('john_doe', 'john.doe@email.com', 'hashed_password1', 'John', 'Doe', 'No'),
  ('jane_smith', 'jane.smith@email.com', 'hashed_password2', 'Jane', 'Smith', 'No'),
  ('mike_jones', 'mike.jones@email.com', 'hashed_password3', 'Mike', 'Jones', 'No'),
  ('sara_brown', 'sara.brown@email.com', 'hashed_password4', 'Sara', 'Brown', 'No'),
  ('admin_user', 'admin.user@email.com', 'hashed_password_admin', 'Admin', 'User', 'Yes');
    