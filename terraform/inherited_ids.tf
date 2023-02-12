data "aws_secretsmanager_secret" "base_resources_creds" {
  name = "base_resources_secrets_${var.env}_env"
}

data "aws_secretsmanager_secret_version" "base_resources_secret_version" {
  secret_id = data.aws_secretsmanager_secret.base_resources_creds.id
}

data "aws_secretsmanager_secret" "by_name" {
  name = "core_${var.env}_resource_secrets"
}

data "aws_secretsmanager_secret_version" "core_resource_secret_version" {
  secret_id = data.aws_secretsmanager_secret.by_name.id
}

data "aws_secretsmanager_secret" "rds_creds" {
  name = var.rds_creds
}

data "aws_secretsmanager_secret_version" "rds_creds_secret_version" {
  secret_id = data.aws_secretsmanager_secret.rds_creds.id
}

data "aws_secretsmanager_secret" "apigw_authorizer_secret" {
  name = "apigw_authorizer"
}

data "aws_secretsmanager_secret_version" "apigw_authorizer_secret_version" {
  secret_id = data.aws_secretsmanager_secret.apigw_authorizer_secret.id
}

data "aws_secretsmanager_secret" "appsync_secrets" {
  name = "appsync_secrets_${var.env}_env"
}

data "aws_secretsmanager_secret_version" "appsync_version" {
  secret_id = data.aws_secretsmanager_secret.appsync_secrets.id
}

data "aws_secretsmanager_secret" "weberlo_api_key_secrets" {
  name = "weberlo_api_key"
}

data "aws_secretsmanager_secret_version" "weberlo_api_key_secret_version" {
  secret_id = data.aws_secretsmanager_secret.weberlo_api_key_secrets.id
}


locals {
  aws_security_group_aurora_id = jsondecode(data.aws_secretsmanager_secret_version.core_resource_secret_version.secret_string)["aws_security_group_aurora_id"]
  aws_subnet_nat_a_id          = jsondecode(data.aws_secretsmanager_secret_version.core_resource_secret_version.secret_string)["aws_subnet_nat_a_id"]
  aws_subnet_nat_b_id          = jsondecode(data.aws_secretsmanager_secret_version.core_resource_secret_version.secret_string)["aws_subnet_nat_b_id"]
  connect_domain_name          = jsondecode(data.aws_secretsmanager_secret_version.core_resource_secret_version.secret_string)["connect_domain_name"]
  ###########
  aws_db_proxy_rds_db_proxy_endpoint    = jsondecode(data.aws_secretsmanager_secret_version.base_resources_secret_version.secret_string)["aws_db_proxy_rds_db_proxy_endpoint"]
  aws_iam_role_lambda_db_proxy_role_arn = jsondecode(data.aws_secretsmanager_secret_version.base_resources_secret_version.secret_string)["aws_iam_role_lambda_db_proxy_role_arn"]
  ###########
  rds_username = jsondecode(data.aws_secretsmanager_secret_version.rds_creds_secret_version.secret_string)["rds_username"]
  rds_password = jsondecode(data.aws_secretsmanager_secret_version.rds_creds_secret_version.secret_string)["rds_password"]
  ###########
  apigw_authorizer_invoke_arn = jsondecode(data.aws_secretsmanager_secret_version.apigw_authorizer_secret_version.secret_string)["apigw_authorizer_invoke_arn"]
  apigw_authorizer_role_arn   = jsondecode(data.aws_secretsmanager_secret_version.apigw_authorizer_secret_version.secret_string)["apigw_authorizer_role_arn"]
  ###########
  aws_appsync_graphql_api_main_id = jsondecode(data.aws_secretsmanager_secret_version.appsync_version.secret_string)["aws_appsync_graphql_api_main_id"]
  aws_iam_role_graphql_arn        = jsondecode(data.aws_secretsmanager_secret_version.appsync_version.secret_string)["aws_iam_role_graphql_arn"]
  ###########
  root_domain = jsondecode(data.aws_secretsmanager_secret_version.weberlo_api_key_secret_version.secret_string)["ROOT_DOMAIN"]
}
