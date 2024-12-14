import axios from "axios";

const API_KEY = "AIzaSyAo6MlidfcbjMPlwxJbYII9YawIbteRuEc";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const res = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    // Return relevant data only
    const { idToken, email: userEmail, localId } = res.data;
    return { idToken, userEmail, localId };
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    // Rethrow for handling downstream, with a user-friendly error
    throw new Error(
      error.response?.data?.error?.message || "Authentication failed!"
    );
  }
}

// Signup handler
export async function createUser(userEmail, userPassword) {
  const res = await authenticate("signUp", userEmail, userPassword);
  return res
}

// Login handler
export async function loginUser(userEmail, userPassword) {
 // console.log(userEmail + " " + userPassword)
  const res = await authenticate("signInWithPassword", userEmail, userPassword);

  return res
}
