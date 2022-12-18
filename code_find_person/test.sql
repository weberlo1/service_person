INSERT INTO persons (id, workspace_id, first_name, last_name, name, email, country_code, phone, lifetime_value, stage, updated_at, created_at)
VALUES
  ('7460b87a-9455-4eaa-b84b-1e24eab2b6cb', '28765432-1234-1234-1234-123456789abc', 'John', 'Doe', 'John Doe', 'john.doe@example.com', '1', '1234567890', 1000, 'lead', '2022-12-17T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('f0f1ddbc-50ee-457b-85a9-d816e1ba7d7e', '28765432-1234-1234-1234-123456789abc', 'Jane', 'Doe', 'Jane Doe', 'jane.doe@example.com', '1', '1234567891', 2000, 'customer', '2022-12-16T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('15ca844e-7241-4e00-b1a7-7a546dcff574', '28765432-1234-1234-1234-123456789abc', 'Bob', 'Smith', 'Bob Smith', 'bob.smith@example.com', '1', '1234567892', 3000, 'lead', '2022-12-15T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('3a6be760-0623-493a-b253-a3f7dafaf4bb', '28765432-1234-1234-1234-123456789abc', 'Alice', 'Smith', 'Alice Smith', 'alice.smith@example.com', '1', '1234567893', 4000, 'customer', '2022-12-14T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('17a1b072-684c-4241-a7da-0e00702a2785', '28765432-1234-1234-1234-123456789abc', 'Eve', 'Jones', 'Eve Jones', 'eve.jones@example.com', '1', '1234567894', 5000, 'lead', '2022-12-13T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('e460709a-7c46-413f-af50-764dd9bcbf7a', '28765432-1234-1234-1234-123456789abc', 'Tom', 'Johnson', 'Tom Johnson', 'tom.johnson@example.com', '1', '1234567895', 6000, 'customer', '2022-12-12T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('f305fe28-31d2-40cc-aba6-2f439bba94ca', '28765432-1234-1234-1234-123456789abc', 'Sally', 'Johnson', 'Sally Johnson', 'sally.johnson@example.com', '1', '1234567896', 7000, 'lead', '2022-12-11T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('c727e217-9244-410d-8493-8c289b371aaf', '28765432-1234-1234-1234-123456789abc', 'Michael', 'Brown', 'Michael Brown', 'michael.brown@example.com', '1', '1234567897', 8000, 'customer', '2022-12-10T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('958cd0a4-ff79-4c9d-9f16-0d02abf91f67', '28765432-1234-1234-1234-123456789abc', 'Emily', 'Brown', 'Emily Brown', 'emily.brown@example.com', '1', '1234567898', 9000, 'lead', '2022-12-09T12:34:56.789Z', '2022-12-01T12:34:56.789Z'),
  ('f993845c-f93c-4d1e-815f-9de40a07ea92', '28765432-1234-1234-1234-123456789abc', 'David', 'Williams', 'David Williams', 'david.williams@example.com', '1', '1234567899', 10000, 'customer', '2022-12-08T12:34:56.789Z', '2022-12-01T12:34:56.789Z');


INSERT INTO visitors (id, person_id, user_agent, ip_address, country_code, device, workspace_id)
VALUES
  ('58781984-9085-45bc-9830-26f597cd71a4', '7460b87a-9455-4eaa-b84b-1e24eab2b6cb', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.1', 'US', 'Macintosh', '28765432-1234-1234-1234-123456789abc'),
  ('22b618c2-495e-4f4e-8950-94fa7d1a483e', '7460b87a-9455-4eaa-b84b-1e24eab2b6cb', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.2', 'US', 'Windows', '28765432-1234-1234-1234-123456789abc'),
  ('5504880e-3275-4b7c-8d5b-e99820abff6a', 'e460709a-7c46-413f-af50-764dd9bcbf7a', 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36', '192.168.0.3', 'US', 'Android', '28765432-1234-1234-1234-123456789abc');
