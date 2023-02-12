variable "env" {
  default = "dev"
  type    = string
}

variable "database" {
  default = "postgres"
  type    = string
}

variable "port" {
  default = 5432
}

variable "runtime" {
  default = "nodejs12.x"
}

variable "timeout" {
  default = 25
  type    = number
}

variable "is_cron" {
  default = true
  type    = bool
}

variable "api_gw" {
  default = false
  type    = bool
}

variable "rds_creds" {
  default = "analytics_rds_credentials"
}

variable "lambda_handler" {
  default = "index.handler"
}

variable "event_rule_cron_configuration" {
  type    = string
  default = "cron(0/5 * * * ? *)"
}

variable "code_folder" {
  default = "api_integration_code"
}

variable "additional_envs" {
  default = {}
  type    = map(any)
}

variable "api_lambda_assume_role_policy_json" {
  type    = string
  default = "policies/api_lambda_assume_role_policy.json"
}

variable "AmazonAPIGatewayPushToCloudWatchLogs_policy" {
  type    = string
  default = "policies/AmazonAPIGatewayPushToCloudWatchLogs_policy.json"
}

variable "tracing_config_mode" {
  type    = string
  default = "PassThrough"
}

variable "quota_limit" {
  default = 3000000
  type    = number
}

variable "limit_period" {
  default = "MONTH"
  type    = string
}

variable "limit_offset" {
  default = 1
  type    = number
}

variable "throttle_burst_limit" {
  default = 100
  type    = string
}

variable "throttle_rate_limit" {
  default = 100
  type    = string
}

variable "public_key" {
  default = true
  type    = bool
}

variable "head" {
  default = false
  type    = bool
}

variable "proxy" {
  default = true
  type    = bool
}

variable "connect_domain_name" {
  default = false
  type    = bool
}

variable "path_part" {
  default = "v1"
  type    = string
}

variable "base_path" {
  default = "wi"
  type    = string
}

variable "zip_size_for_npm" {
  default     = 5000000
  type        = number
  description = "If the zip size will be lower than this value (which is in bytes) then it won't update the function."
}

variable "authorizer" {
  default = false
  type    = bool
}

locals {
  standard_gateway_params = {
    "method.response.header.Access-Control-Allow-Headers"     = true
    "method.response.header.Access-Control-Allow-Methods"     = true
    "method.response.header.Access-Control-Allow-Origin"      = true
    "method.response.header.Access-Control-Allow-Credentials" = true
    "method.response.header.Access-Control-Max-Age"           = true
    "method.response.header.Access-Control-Expose-Headers"    = true
  }
  custom_geteway_params = {
    "method.response.header.Access-Control-Allow-Headers"     = "'Set-Cookie,Cookie,Session-ID,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,Access-Control-Allow-Origin,Access-Control-Max-Age,Access-Control-Expose-Headers'"
    "method.response.header.Access-Control-Allow-Methods"     = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"      = "'*'"
    "method.response.header.Access-Control-Allow-Credentials" = "'true'"
    "method.response.header.Access-Control-Max-Age"           = "'86400'"
    "method.response.header.Access-Control-Expose-Headers"    = "'Session-ID'"
  }
}

variable "additional_pipeline_config" {
  type    = list(any)
  default = [""]
}

variable "appsync" {
  default = false
  type    = bool
}

variable "appsync_resolver_type" {
  default = "Mutation"
  type = string
}

variable "resolver_field" {
  default = ""
  type    = string
}

variable "trigger_on_size" {
  default = 5000000
  type    = number
}