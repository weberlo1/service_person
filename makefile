help:
	@echo "start        - Run container for local development."
	@echo "stop         - Stop and remove container."
	@echo ""
	@echo "test         - Test a function, provide var function={folder}"

start:
	docker-compose up -d

stop:
	docker-compose down

test:
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -c 'CREATE EXTENSION \"uuid-ossp\";'"
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -f /app/table.sql"
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -f /app/$(function)/test.sql"
	docker exec service_channel_nodejs_1 /bin/sh -c 'cd /app/$(function) && npm install && npx jest'
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;\""

test-all:
	make start
	make test function=code_add_ad_channel
	make test function=code_add_simple_channel
	make test function=code_add_utm_channel
	make test function=code_delete_channel
	make test function=code_find_utm_channel
	make test function=code_get_ad_channel
	make test function=code_get_utm_channel
	make test function=code_list_channel
	make test function=code_update_utm_channel
	make stop