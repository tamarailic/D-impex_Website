import boto3
import json

ses_client = boto3.client("ses")

def lambda_handler(event, context):
    body = json.loads(event["Records"][0]["Sns"]["Message"])

    sender_name = "D-impex Webiste Notifikacija"
    sender_email = "uros@startstudentventures.com"
    recipients = [body['recipient']]
    subject = body["subject"]
    content_body = body["content"]
    response = ses_client.send_email(
        Source=f'{sender_name} <{sender_email}>',
        Destination={"ToAddresses": recipients},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": content_body}},
        },
    )
