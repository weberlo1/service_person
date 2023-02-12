resource "aws_lambda_function" "service_person_add" {
  function_name    = "service_person_add"
  handler          = "index.handler"
  runtime          = var.runtime
  timeout          = 30
  publish          = true
  filename         = local.data_archive_file_lambdazip_output_path
  source_code_hash = local.dependency_id != "NO" || fileexists("./code_add_person/package.json") == false ? local.data_archive_file_lambdazip_output_base64sha256 : null
  role             = local.aws_iam_role_lambda_db_proxy_role_arn

  depends_on = [
    data.archive_file.lambdazip,
    local.dependency_id
  ]

  environment {
    variables = {
        env          = var.env
        RDS_USER     = local.rds_username
        RDS_DB       = var.database
        RDS_PW       = local.rds_password
        RDS_PORT     = var.port
        RDS_HOSTNAME = local.aws_db_proxy_rds_db_proxy_endpoint
        ROOT_DOMAIN  = local.root_domain
    }
  }

  vpc_config {
    subnet_ids = [
      local.aws_subnet_nat_a_id,
      local.aws_subnet_nat_b_id
    ]
    security_group_ids = [local.aws_security_group_aurora_id]
  }
}

resource "aws_lambda_alias" "service_person_add_alias" {
  depends_on       = [aws_lambda_function.service_person_add]
  name             = var.env
  function_name    = aws_lambda_function.service_person_add.arn
  function_version = aws_lambda_function.service_person_add.version
}
