chmod 400 $pem_aws
ssh -o "StrictHostKeyChecking=no" -i $pem_aws $user_aws@$ip_aws "rm -rf bank-pro"
ssh -o "StrictHostKeyChecking=no" -i $pem_aws $user_aws@$ip_aws "mkdir bank-pro"
scp -o "StrictHostKeyChecking=no" -i $pem_aws * $user_aws@$ip_aws:~/bank-pro
ssh -o "StrictHostKeyChecking=no" -i $pem_aws $user_aws@$ip_aws "bash" < ./run.sh