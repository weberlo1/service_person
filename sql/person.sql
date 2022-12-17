CREATE TABLE persons (
  id              UUID DEFAULT uuid_generate_v4(),
  workspace_id    UUID,
  first_name      VARCHAR(255),
  last_name       VARCHAR(255),
  name            VARCHAR(255),
  email           VARCHAR(255),
  country_code    VARCHAR(255),
  phone           VARCHAR(255),
  lifetime_value  INTEGER,
  stage           VARCHAR(255),
  created_at      TIMESTAMP DEFAULT now(),
  updated_at      TIMESTAMP DEFAULT now(),
  CONSTRAINT unique_email_workspace_id UNIQUE (email, workspace_id),
  CONSTRAINT unique_phone_workspace_id UNIQUE (phone, workspace_id)
);

-- INSERT INTO person (first_name, last_name, name, email, country_code, phone, lifetime_value, stage)
-- VALUES ('John', 'Doe', 'John Doe', 'john.doe@example.com', '1', '1234567890', 100.0, 'new');
