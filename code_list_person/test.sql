INSERT INTO persons (id, workspace_id, first_name, last_name, name, email, country_code, phone, lifetime_value, stage, updated_at)
VALUES
  ('52345678-1234-1234-1234-123456789abc', '28765432-1234-1234-1234-123456789abc', 'John', 'Doe', 'John Doe', 'john.doe@example.com', '1', '1234567890', 1000, 'lead', DATEADD(day, -1, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abd', '28765432-1234-1234-1234-123456789abc', 'Jane', 'Doe', 'Jane Doe', 'jane.doe@example.com', '1', '1234567891', 2000, 'customer', DATEADD(day, -2, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abe', '28765432-1234-1234-1234-123456789abc', 'Bob', 'Smith', 'Bob Smith', 'bob.smith@example.com', '1', '1234567892', 3000, 'lead', DATEADD(day, -3, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abf', '28765432-1234-1234-1234-123456789abc', 'Alice', 'Smith', 'Alice Smith', 'alice.smith@example.com', '1', '1234567893', 4000, 'customer', DATEADD(day, -4, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abg', '28765432-1234-1234-1234-123456789abc', 'Eve', 'Jones', 'Eve Jones', 'eve.jones@example.com', '1', '1234567894', 5000, 'lead', DATEADD(day, -5, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abh', '28765432-1234-1234-1234-123456789abc', 'Tom', 'Johnson', 'Tom Johnson', 'tom.johnson@example.com', '1', '1234567895', 6000, 'customer', DATEADD(day, -6, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abi', '28765432-1234-1234-1234-123456789abc', 'Sally', 'Johnson', 'Sally Johnson', 'sally.johnson@example.com', '1', '1234567896', 7000, 'lead', DATEADD(day, -7, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abj', '28765432-1234-1234-1234-123456789abc', 'Michael', 'Brown', 'Michael Brown', 'michael.brown@example.com', '1', '1234567897', 8000, 'customer', DATEADD(day, -8, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abk', '28765432-1234-1234-1234-123456789abc', 'Emily', 'Brown', 'Emily Brown', 'emily.brown@example.com', '1', '1234567898', 9000, 'lead', DATEADD(day, -9, CURRENT_TIMESTAMP)),
  ('52345678-1234-1234-1234-123456789abl', '28765432-1234-1234-1234-123456789abc', 'David', 'Williams', 'David Williams', 'david.williams@example.com', '1', '1234567899', 10000, 'customer', DATEADD(day, -10, CURRENT_TIMESTAMP));
