--insert new record to the account table
INSERT INTO public.account (
   	account_firstname,
    account_lastname,
    account_email,
	account_password
  )
VALUES   (
	'Tony',
	'Stark',
	'tony@starkent.com',
	'Iam1ronM@n'
);

--Modify the Tony Stark record to change the account_type to "Admin".
UPDATE account
SET account_type ='Admin'
WHERE account_id = 1;

--Delete the Tony Stark record from the database.
DELETE FROM account
WHERE account_id = 1;

--Modify the "GM Hummer"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'huge interior')
WHERE inv_id = 10;

--Viewing information from two tables with inner join.
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

--Update the image and thumbnail paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
