import os
import boto3
import json
from datetime import datetime
from utils import create_response, admin_email

sns_client = boto3.client("sns")
BASIC_EMAIL_TOPIC = os.environ["BASIC_EMAIL_TOPIC"]
TEMPLATE_EMAIL_TOPIC = os.environ["TEMPLATE_EMAIL_TOPIC"]
dynamodb = boto3.resource('dynamodb')

leads_table = dynamodb.Table(os.environ['LEADS_TABLE'])

def lambda_handler(event, context):
    body = json.loads(event['body'])
    required_fields = ['name', 'email', 'message']
    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return create_response(400, {'error': 'Missing required fields'})
    
    leads_table.put_item(
        Item={
            'email': body['email'],
            'timestamp': datetime.now().isoformat(),
            'name': body['name'],
            'company': body.get('company', ''),
            'message': body['message']
        }
    )

    send_email(body['name'], body['email'], body.get('company', ''), body['message'])

    return create_response(200, {'message': 'OK'})

def send_email(user_name, user_email, user_company, user_message):
    sns_client.publish(
        TopicArn=BASIC_EMAIL_TOPIC,
        Message=json.dumps(
            {
                "event": "webiste_form",
                "recipient": admin_email,
                "subject": f'Nova poruka sa D-impex websajta - {user_email}',
                "content": f'Korisnik {user_name} iz kompanije {user_company} je poslao sledeću poruku:\n\n {user_message} \n\n Odgovorite mu na email adresu {user_email} \n\n Ovo je automatska D-impex notifikacija.'
            }
        ),
    )

def send_template_email(user_name, user_email, user_company, user_message):
    current_date = datetime.now()
    formatted_date = current_date.strftime("%d.%m.%Y")
    data = json.dumps({'emailDate': formatted_date, 'senderName': user_name, 'senderCompany': user_company, 'senderEmail': user_email, 'senderMessage': user_message})
    sns_client.publish(
        TopicArn=TEMPLATE_EMAIL_TOPIC,
        Message=json.dumps({
            "event": "webiste_form",
            "recipient": user_email,
            "template_name": "DimpexEmailConfirmation",
            "data_to_replace": data
        }),
    )