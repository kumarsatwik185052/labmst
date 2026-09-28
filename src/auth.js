// Simulate JWT generation
export function generateToken(user) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  // Convert objects to Base64
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // Dummy signature for experiment/demo
  const signature = "demo-signature";

  return `${encodedHeader}-${encodedPayload}-${signature}`;
}

// Login validation
export function login(username, password) {
  if (username === "admin" && password === "1234") {
    return generateToken({
      id: "101",
      username: "admin",
      role: "admin"
    });
  }

  if (username === "user" && password === "1234") {
    return generateToken({
      id: "102",
      username: "user",
      role: "viewer"
    });
  }

  return null;
}