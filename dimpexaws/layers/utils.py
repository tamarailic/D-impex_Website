import json

# admin_email = 'office@d-impex.co.rs'
admin_email = 'uros.pocek@gmail.com'

def create_response(status, body):
    return { 
        'statusCode': status, 
        'headers': {
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps(body, default=str)
        }