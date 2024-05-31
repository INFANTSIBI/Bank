from app import app
from app.utils import *
from app.main.models import *
from app.authentication.models import *
from datetime import datetime
from flask import request
def add_tx_to_db(
        username,
        transactions_details
):
    to_account, amount , currency = transactions_details.values()
    amount = int(amount)
    user_sender = db_query(
        User, 'username', username
    )[1]
    user_receiver = db_query(
        User, 'account_number', to_account
    )[1]
    today = datetime.strftime(datetime.today(), "%d-%m-%Y")
    tx = Transaction(
        from_account = user_sender.account_number,
        to_account = to_account,
        amount = amount,
        currency = currency,
        date = today
    
    )  
    user_sender.balance -= amount
    user_receiver.balance += amount
    db.session.add_all(
        [
            tx,
            user_sender,
            user_receiver
        ]
    )
    db.session.commit()

def validate_transaction(username, transactions_details):
    to_account, amount, currency = transactions_details.values()
    try: 
        amount = int(amount)
    except ValueError:
        return False, "Invalid Amount."
    user_sender = db_query(
        User, 'username', username
    )[1]
    user_receiver = db_query(
        User, 'account_number', to_account
    )[1]
    if user_receiver == None:
        return False, "Account does not exist..!"

    elif to_account == user_sender.account_number:
        return False, "You cannot send money to yourself..!"

    elif amount == '' or int(amount) == 0:
        return False, "Amount can't be 0."

    elif amount > user_sender.balance:
        return False, "Not enough Balance"

    elif currency != "EUR" and currency != "INR":
        return False, "Transaction in this currency {} not supported.".format(currency)
    else:
        return True, "Transaction is completed successfully..!"
    
def get_overview(user):
    return gen_result_dict(
        account_details = gen_result_dict(
            username = user.username,
            accountNumber = user.account_number,
            balance = user.balance
        )
    )

        
@app.route('/send_transaction',methods = ['GET', 'POST'])
def send_transactions():
     message = request.get_json()
     username, transaction_details = message.values()
     validated, validation_msg = validate_transaction(
          username, transaction_details
     )
     if validated:
          add_tx_to_db(
                username, transaction_details
          )
     result = gen_result_dict(
         result = validated,
         message = validation_msg 
       ) 
     return result
    
