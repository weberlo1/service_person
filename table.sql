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