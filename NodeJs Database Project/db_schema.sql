
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Username text, 
    Email text, 
    Password text,             
    Salt text,    
    Token text,
    DateLoggedIn DATE,
    DateCreated DATE
    );
CREATE TABLE IF NOT EXISTS blogData(
    BlogId INTEGER PRIMARY KEY AUTOINCREMENT,
    Title varchar(255),
    Subtitle varchar(255),
    ArticleText varchar(255),
    Created DATETIME DEFAULT (datetime('now', 'localtime')),
    lastModified DATETIME DEFAULT (datetime('now', 'localtime')),
    UserId INTEGER,
    FOREIGN KEY(UserId) REFERENCES Users(Id)
);
CREATE TABLE IF NOT EXISTS publishedData(
    BlogId INTEGER PRIMARY KEY AUTOINCREMENT,
    Title varchar(255),
    Subtitle varchar(255),
    ArticleText varchar(255),
    Created DATETIME DEFAULT (datetime('now', 'localtime')),
    Published DATETIME DEFAULT (datetime('now', 'localtime')),
    lastModified DATETIME DEFAULT (datetime('now', 'localtime')),
    Likes INTEGER DEFAULT '0',
    UserId INTEGER,
    FOREIGN KEY(UserId) REFERENCES Users(Id)
);
CREATE TABLE IF NOT EXISTS blogSettings(
    BlogTitle varchar(255),
    Subtitle varchar(255) ,
    AuthorName varchar(255),
    UserId INTEGER ,
    FOREIGN KEY(UserId) REFERENCES Users(Id)
);
CREATE TABLE IF NOT EXISTS comments(
    BlogId INTEGER,
    commentInput varchar(255)
);

--insert default data (if necessary here)

INSERT INTO testUsers (test_name) VALUES ('Simon Star');
INSERT INTO testUserRecords (test_record_value, test_user_id) VALUES( 'Lorem ipsum dolor sit amet', 1); --try changing the test_user_id to a different number and you will get an error
INSERT INTO blogData(BlogId) VALUES(1);
COMMIT;

