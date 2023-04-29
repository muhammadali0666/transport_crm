const pool = require("../../db/db_config");
const bcrypt = require('bcryptjs');

const getUsers = async () => {
  let users = await pool.query(`select * from staffs`);
  return users.rows;
};

// const getUser = async ({ userId }) => {
//     let foundedUser = await pool.query(`select * from users where user_id = $1`, [userId])
//     return foundedUser.rows[0]

// }

const authRegister = async ({
  staff_name,
  staff_password,
  branch_id,
  birth_date,
  staff_gender
}) => {
  let users = await getUsers();
  let foundedUser = users.find((u) => u.staff_name === staff_name);

  if (foundedUser) return { msg: "User already exists!" };

  let hash = await bcrypt.hash(staff_password, 12)

  let result = await pool.query(`INSERT INTO branches(branch_name) VALUES($1) returning *`, [branch_id])

  let founded_id = result.rows[0].branch_id;

  await pool.query(
    `INSERT INTO staffs(staff_name, staff_password, branch_id, birth_date, staff_gender) VALUES($1, $2, $3, $4, $5)`,
    [staff_name, hash, founded_id, birth_date, staff_gender]
  )


  return { msg: "User added!" };

};


const authLogin = async ({
  staff_name,
  staff_password
}) => {
  let users = await getUsers();
  let foundedUser = users.find((u) => u.staff_name === staff_name);


  return { msg: "User added!" };

};

// const deleteUser = async ({ id }) => {
//     let foundedUser = await getUser({ userId: id})
//     if (!foundedUser) return { msg: 'User not found!' }

//     await pool.query(` DELETE FROM users WHERE user_id = $1 `, [id])
//     return { msg: 'Deleted user!' }
// }

// const updateUser = async ({ id, username, password, email, age }) => {
//     let foundedUser = await getUser({ userId: id})

//     if(!foundedUser) return { msg: 'User not found!' }

//     username = username ? username : foundedUser.username
//     password = password ? password : foundedUser.password
//     email = email ? email : foundedUser.email
//     age = age ? age : foundedUser.age

//     await pool.query(`UPDATE users set username = $1, password = $2, email = $3, age = $4 WHERE user_id = $5`, [username, password, email, age, id])
//     return { msg: "Updated user!" }
// }

module.exports = {
  getUsers,
  // getUser,
  authRegister,
  authLogin
  // deleteUser,
  // updateUser
};
