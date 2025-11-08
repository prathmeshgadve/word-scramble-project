import jwt from 'jsonwebtoken';

const generateToken = (res, userId, isAdmin) => {
  const token = jwt.sign(
    { userId, isAdmin }, // Save the user's ID and admin status in the token
    process.env.JWT_SECRET, 
    {
      expiresIn: '30d', // Token lasts for 30 days
    }
  );

  return token;
};

export default generateToken;