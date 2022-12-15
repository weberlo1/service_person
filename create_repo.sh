#!/usr/bin/env bash

# Check if the required parameters are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 FOLDER_NAME API_KEY"
  exit 1
fi

# Set the folder name and API key from the input parameters
folder_name=$1
api_key=$2
new_repo_url=https://github.com/weberlo1/$folder_name

# Create Git repository
# curl \
#   -X POST \
#   -H "Accept: application/vnd.github+json" \
#   -H "Authorization: Bearer $api_key"\
#   -H "X-GitHub-Api-Version: 2022-11-28" \
#   https://api.github.com/orgs/weberlo1/repos \
#   -d '{"name":"'$folder_name'"}'

# Set the new remote repository URL
curl \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \‚
  -H "Authorization: Bearer $api_key"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/weberlo1/$folder_name/git/remotes/origin
  -d '{"name":"origin", "url": "'$new_repo_url'"}'

git init
git remote add origin

# # Create the "production", "staging", and "dev" branches
# curl -X POST -u "$api_key" -d "{\"ref\":\"refs/heads/production\"}" https://api.github.com/repos/weberlo1/$folder_name/git/refs
# curl -X POST -u "$api_key" -d "{\"ref\":\"refs/heads/staging\"}" https://api.github.com/repos/weberlo1/$folder_name/git/refs
# curl -X POST -u "$api_key" -d "{\"ref\":\"refs/heads/dev\"}" https://api.github.com/repos/weberlo1/$folder_name/git/refs

# # Delete the "master" branch
# curl -X DELETE -u "$api_key" https://api.github.com/repos/weberlo1/$folder_name/git/refs/heads/master

# # Add all the files in the folder to the repository
# curl -X PUT -u "$api_key" -d "{\"path\":\"/file.txt\",\"message\":\"Initial commit\",\"content\":\"$(base64 <file.txt)\"}" https://api.github.com/repos/weberlo1/$folder_name/contents/file.txt

# # Commit the changes
# curl -X POST -u "$api_key" -d "{\"message\":\"Initial commit\"}" https://api.github.com/repos/weberlo

# # Push the code to the new repository
# curl -X POST -u "$api_key" -d "{\"ref\":\"refs/heads/master\",\"sha\":\"$(curl -H "Authorization: Bearer $api_key" https://api.github.com/repos/weberlo1/$folder_name/commits | jq -r '.[0].sha')\"}" https://api.github.com/repos/weberlo1/$folder_name/git/refs

# # Delete all default labels
# curl -X DELETE -u "$api_key" https://api.github.com/repos/weberlo1/$folder_name/labels

# # Add custom labels from a configuration file
# cat labels.conf | jq -c '.[]' | while read -r label; do
#   curl -X POST -u "$api_key" -d "$label" https://api.github.com/repos/weberlo1/$folder_name/labels
# done