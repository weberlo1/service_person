INSERT INTO persons (id, workspace_id, first_name, last_name, name, email, country_code, phone, lifetime_value, stage, updated_at, created_at)
VALUES
  ('52345678-1234-1234-1234-123456789abc', '28765432-1234-1234-1234-123456789abc', 'John', 'Doe', 'John Doe', 'john.doe@example.com', '1', '1234567890', 1000, 'lead', '2022-12-17T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abd', '28765432-1234-1234-1234-123456789abc', 'Jane', 'Doe', 'Jane Doe', 'jane.doe@example.com', '1', '1234567891', 2000, 'customer', '2022-12-16T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abe', '28765432-1234-1234-1234-123456789abc', 'Bob', 'Smith', 'Bob Smith', 'bob.smith@example.com', '1', '1234567892', 3000, 'lead', '2022-12-15T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abf', '28765432-1234-1234-1234-123456789abc', 'Alice', 'Smith', 'Alice Smith', 'alice.smith@example.com', '1', '1234567893', 4000, 'customer', '2022-12-14T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abg', '28765432-1234-1234-1234-123456789abc', 'Eve', 'Jones', 'Eve Jones', 'eve.jones@example.com', '1', '1234567894', 5000, 'lead', '2022-12-13T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abh', '28765432-1234-1234-1234-123456789abc', 'Tom', 'Johnson', 'Tom Johnson', 'tom.johnson@example.com', '1', '1234567895', 6000, 'customer', '2022-12-12T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abi', '28765432-1234-1234-1234-123456789abc', 'Sally', 'Johnson', 'Sally Johnson', 'sally.johnson@example.com', '1', '1234567896', 7000, 'lead', '2022-12-11T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abj', '28765432-1234-1234-1234-123456789abc', 'Michael', 'Brown', 'Michael Brown', 'michael.brown@example.com', '1', '1234567897', 8000, 'customer', '2022-12-10T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abk', '28765432-1234-1234-1234-123456789abc', 'Emily', 'Brown', 'Emily Brown', 'emily.brown@example.com', '1', '1234567898', 9000, 'lead', '2022-12-09T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('52345678-1234-1234-1234-123456789abl', '28765432-1234-1234-1234-123456789abc', 'David', 'Williams', 'David Williams', 'david.williams@example.com', '1', '1234567899', 10000, 'customer', '2022-12-08T12:34:56.789Z', '2022-12-01T12:34:56.789Z');

INSERT INTO visitors (id, person_id, user_agent, ip_address, country_code, device, workspace_id)
VALUES
  ('58781984-9085-45bc-9830-26f597cd71a4', '52345678-1234-1234-1234-123456789abc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.1', 'US', 'Macintosh', '28765432-1234-1234-1234-123456789abc'),
  ('22b618c2-495e-4f4e-8950-94fa7d1a483e', '52345678-1234-1234-1234-123456789abc', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.2', 'US', 'Windows', '28765432-1234-1234-1234-123456789abc'),
  ('5504880e-3275-4b7c-8d5b-e99820abff6a', '52345678-1234-1234-1234-123456789abh', 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36', '192.168.0.3', 'US', 'Android', '28765432-1234-1234-1234-123456789abc');
