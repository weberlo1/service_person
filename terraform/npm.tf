resource "null_resource" "lambda_dependencies" {
  count = fileexists("./code_add_person/package.json") ? 1 : 0
  provisioner "local-exec" {
    command = "cd code_add_person && npm install --production"
  }

  triggers = {
    index   = sha256(file("./code_add_person/index.js"))
    package = fileexists("./code_add_person/package.json") ? sha256(file("./code_add_person/package.json")) : null
    lock    = fileexists("./code_add_person/package-lock.json") ? sha256(file("./code_add_person/package-lock.json")) : null
  }
}


data "archive_file" "lambdazip" {
  type        = "zip"
  output_path = "./code_add_person.zip"
  source_dir  = "./code_add_person"

  depends_on = [
    local.dependency_id
  ]
}

locals {
  zip_sha       = data.archive_file.lambdazip.output_base64sha256
  dependency_id = fileexists("./code_add_person/package.json") ? null_resource.lambda_dependencies[0].id : "NO"
  data_archive_file_lambdazip_output_path = data.archive_file.lambdazip.output_path
  data_archive_file_lambdazip_output_base64sha256 = data.archive_file.lambdazip.output_size > var.trigger_on_size || fileexists("code_add_person/package.json") == false ? data.archive_file.lambdazip.output_base64sha256 : null
}