exports.createUsersTable = `
CREATE TABLE users (
    "userId" SERIAL PRIMARY KEY,
    username citext UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`

exports.createPhotosTable = `
CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users("userId"),
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`
