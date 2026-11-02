CREATE DATABASE IF NOT EXISTS leaderboard;
USE leaderboard;

CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_score (score DESC)
);

INSERT INTO players (name, score) VALUES
  ('Alice', 1200), ('Bob', 950), ('Cara', 1800);