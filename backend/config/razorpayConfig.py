import razorpay
from config.Env import ENVConfig
RazorPayClient = razorpay.Client(auth=(ENVConfig.RAZORPAY_KEY_ID, ENVConfig.RAZORPAY_KEY_SCREATE))