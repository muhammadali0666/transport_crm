const pool = require("../../db/db_config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { verify } = require("../../utils/jwt")

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

  // let result = await pool.query(`INSERT INTO branches(branch_name) VALUES($1) returning *`, [branch_id])

  // let founded_id = result.rows[0].branch_id;

  let data = await pool.query(
    `INSERT INTO staffs(staff_name, staff_password, branch_id, birth_date, staff_gender) VALUES($1, $2, $3, $4, $5) returning *`,
    [staff_name, hash, branch_id, birth_date, staff_gender]
  )

  const info = data.rows[0].staff_id

  await pool.query(
    `INSERT INTO permission_transport( staff_id ) VALUES($1)`,
    [info]
  )

  await pool.query(
    `INSERT INTO permission_transport( staff_id ) VALUES($1)`,
    [info]
  )

  await pool.query(
    `INSERT INTO permission_transport( staff_id ) VALUES($1)`,
    [info]
  )

  await pool.query(
    `INSERT INTO permission_branches( staff_id ) VALUES($1)`,
    [info]
  )

  await pool.query(
    `INSERT INTO  permission_permissions( staff_id ) VALUES($1)`,
    [info]
  )
  return { msg: "User added!" };

};


const authLogin = async ({
  staff_name,
  staff_password
}) => {

  if (!staff_name.trim() || !staff_password.trim()) {
    throw ("The username and password are required!")
  }
  let users = await getUsers();
  let foundedUser = users.find((u) => u.staff_name === staff_name);

  if (!foundedUser) {
    return { msg: "user not found" }
  }

  let checkhash = await bcrypt.compare(staff_password, foundedUser.staff_password)

  if (checkhash) {
    let token = jwt.sign(
      { staff_id: foundedUser.staff_password, staff_name: staff_name, staff_password: staff_password },
      "SIRLI",
      {
        expiresIn: "24h",
      }
    );
    return {
      msg: "Success",
      token: token,
    }
  } else if (!checkhash) {
    return { msg: "Password wrong", }
  }


  return { msg: "you're logined!" };

};


const createBranches = async ({ branch_name, branch_address, token, role }) => {

  let userInfo = await verify(token)
  if (!userInfo) return { msg: 'Token invalid!' }

  let userRole = "super_admin"
  if (role !== userRole) return { msg: 'Admin invalid!' }


  await pool.query(
    `INSERT INTO branches(branch_name, branch_address) VALUES($1, $2) returning *`,
    [branch_name, branch_address]
  )
  return { msg: "Branch added!" };

};


const createTransport = async ({ auto_model, auto_branch_id, auto_color, auto_img, token, role }) => {

  let userInfo = await verify(token)
  if (!userInfo) return { msg: 'Token invalid!' }

  let userRole = "super_admin"
  if (role !== userRole) return { msg: 'Admin invalid!' }

  await pool.query(
    `INSERT INTO transports(auto_model, auto_branch_id, auto_color, auto_img) VALUES($1, $2, $3, $4) returning *`,
    [auto_model, auto_branch_id, auto_color, auto_img]
  )
  return { msg: "transport added!" };

};



// const deleteUser = async ({ id }) => {
//     let foundedUser = await getUser({ userId: id})
//     if (!foundedUser) return { msg: 'User not found!' }

//     await pool.query(` DELETE FROM users WHERE user_id = $1 `, [id])
//     return { msg: 'Deleted user!' }
// }

// let userInfo = await verify(token)

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
  authLogin,
  createBranches,
  createTransport
  // deleteUser,
  // updateUser
};
