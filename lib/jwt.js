import jwt from "jsonwebtoken";

export function generateToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username,
        },
        process.env.jwt_sig,
        {
            expiresIn: "7d",
        }
    );
}

export function verifyToken(token) {
    return jwt.verify(
        token,
        process.env.jwt_sig
    );
}