# Authentication Context

Current state:
Homepage + URL shortening works

Need:
Login page
Signup page

User schema:

users(
 id UUID PRIMARY KEY,
 username VARCHAR(50),
 email VARCHAR(255),
 password_hash TEXT,
 created_at,
 updated_at
)

URL schema:

urls(
 id INTEGER,
 user_id UUID NULL,
 original_url,
 short_code,
 clicks,
 created_at,
 updated_at
)

Anonymous links supported:
user_id = NULL

Signup fields:
- username
- email
- password
- confirm password

Login fields:
- email
- password

Future:
User dashboard
Owned links
Analytics
Custom aliases