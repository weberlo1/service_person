resource "aws_api_gateway_rest_api" "person_api" {
  body = file("openapi.yaml")

  name = "person-api"
}

resource "aws_api_gateway_deployment" "person_api" {
  rest_api_id = aws_api_gateway_rest_api.person_api.id

  triggers = {
    redeployment = sha1(file("openapi.yaml"))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "person_api" {
  deployment_id = aws_api_gateway_deployment.person_api.id
  rest_api_id   = aws_api_gateway_rest_api.person_api.id
  stage_name    = "v1"
}

# resource "aws_api_gateway_base_path_mapping" "person_api_domain_name" {
#   api_id      = aws_api_gateway_rest_api.person_api.id
#   stage_name  = aws_api_gateway_stage.person_api.stage_name
#   domain_name = var.connect_domain_name
#   base_path   = var.base_path
# }

resource "aws_lambda_permission" "person_api_api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.service_person_add.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.person_api.execution_arn}/*"
}

resource "aws_api_gateway_usage_plan" "wi_up" {

  name = "person-api"

  api_stages {
    api_id = aws_api_gateway_rest_api.person_api.id
    stage  = aws_api_gateway_stage.person_api.stage_name
  }

  quota_settings {
    limit  = var.quota_limit
    offset = var.limit_offset
    period = var.limit_period
  }

  throttle_settings {
    burst_limit = var.throttle_burst_limit
    rate_limit  = var.throttle_rate_limit
  }
}