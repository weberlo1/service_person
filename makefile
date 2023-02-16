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
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -f /app/code/table.sql"
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -f /app/code/$(function)/test.sql"
	docker exec service_channel_nodejs_1 /bin/sh -c 'cd /app/code/$(function) && npm install && npx jest'
	docker exec service_channel_postgres_1 bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d test_db -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;\""

test-all:
	make start
	make test function=add
	make test function=delete
	make test function=find
	make test function=get
	make test function=list
	make stop