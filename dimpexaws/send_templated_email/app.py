import boto3
import json
from utils import admin_email

ses_client = boto3.client("ses")

def lambda_handler(event, context):
    body = json.loads(event["Records"][0]["Sns"]["Message"])

    sender_name = "D-impex"
    sender_email = admin_email
    recipients = [body['recipient']]
    template_name = body["template_name"]
    data = body["data_to_replace"]

    send_email(sender_name,sender_email,recipients,template_name,data)

def send_email(sender_name,sender_email,recipients,template_name,data):
    response = ses_client.send_templated_email(
            Source=f'{sender_name} <{sender_email}>',
            Destination={"ToAddresses": recipients},
            Template=template_name,
            TemplateData=data
            )