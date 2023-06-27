

# TOKEN = '6239552154:AAGHqi3S3Rq2JswIO9OSI1y_xOcS1EN90tk'
TOKEN = '5886361186:AAGRQf436I0oaRHqSxa2gKoEHjpTU4KW4X8'
from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
from aiogram.utils import executor
from datetime import datetime


# bot = Bot(token=TOKEN)
# dp = Dispatcher(bot)

# ikb=InlineKeyboardMarkup(row_width=2)
# ib1=InlineKeyboardButton(text='Pf',url='https://www.2ip.ru')
# ib2=InlineKeyboardButton(text='Ygoogle',url='https://www.google.com')

# ikb.add(ib1).add(ib2)

# @dp.message_handler(commands=['links'])
# async def link_comman(message:types.Message):
#     await message.answer(text='Select',reply_markup=ikb)
#     await message.answer(f'Message text: {message}')




# @dp.message_handler(commands='add')
# async def add_to_db(message: types.Message):

#     # message.reply_to_message is a types.Message object too
#     try:
#         msg = message.reply_to_message.text # if replied
#     except AttributeError:
#         msg = 'not replied'
    
#     await message.answer(f'Replied message text: {msg}')
#     await message.answer(f'Message text: {message.text}')
    
    
    
    
    
# if __name__ == '__main__':
#     executor.start_polling(dp, skip_updates=True)







import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

# Создание бота и диспетчера
# bot = Bot(token=TOKEN)
# dp = Dispatcher(bot)
import telebot
from telebot import types
# bot = telebot.TeleBot(TOKEN)
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials.

cred = credentials.Certificate("fb.json")


firebase_admin.initialize_app(cred)
db = firestore.client()


doctorsDict={}
l=[]
idCollection=[]
nameDoctors=[]
specDoctors=[]
names=[]
spec=[]
ids=[]
doctor=[]
vrstatus=[]
resultDoctors=db.collection('doctorsList').get()
for doc in resultDoctors:
    names.append(doc.to_dict().get('Name'))
    spec.append(doc.to_dict().get('Specialization'))
    ids.append(doc.id)
    vrstatus.append(doc.to_dict().get('status'))
    # nameDoctors.append(names)
    # specDoctors.append(spec)

x=dict(zip(spec, zip(names, ids,vrstatus)))

    
# hisdict = dict(dname = str(names),  dspec = str(spec),did = str(ids))


# my_dict=hisdict

# x=dict(zip(names, zip(spec, ids)))
# print('x-----   ',x)

# print('outputttt  ',x.get('Клементин'))

# print('nameees --------',x.keys())   
# keys=x.keys()  

#Define the doctor and time arrays

times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM']

#Create a new Telebot instance
bot = telebot.TeleBot(TOKEN)
gMessage=''
#Define the handler for the /start command

def AddRecord(companyNameMessage,binMessage,fioMessage,telMessage,objectNameMessage,status):
    # print('Данные в функции Addrecord',binMessage.text,fioMessage.text,telMessage.text,objectNameMessage.text,status)
    try:
        zayavkaTime = datetime.now()
    except Exception as e:
        print(f"Error occurred while getting current time: {str(e)}")
        return
    data={
          'companyName':str(companyNameMessage.text),
          'companyBin':str(binMessage.text),
          'fio':str(fioMessage.text),
          'phone':str(telMessage.text),
          'objectName':str(objectNameMessage.text),
          'status':str(status),
          'zayavkaTime':zayavkaTime,
          'manager':'',
          }
    db.collection('pacients').add(data)
    

@bot.message_handler(commands=['start'])
def send_welcome(message):
    global gMessage
    gMessage=message
    # Send a welcome message and ask for the user's name
    bot.reply_to(message, "Здравстуйте как к вам обращаться?")
    # Save the user's name in a variable
    bot.register_next_step_handler(message, send_companyName)

def send_companyName(message):
    bot.reply_to(message, ", Введите название компании")
    bot.register_next_step_handler(message, send_bin)


def send_bin(message):
    print('Message sendbin= ',message.text)
    global companyNameMessage
    companyNameMessage=message

   

    bot.reply_to(message, "Введите БИН")

    bot.register_next_step_handler(message, send_name)

def send_name(message):
    # global fioMessage
    # fioMessage=message

    global binMessage
    binMessage=message
    bot.reply_to(message, "Введите ФИО контакнтного лица")

    bot.register_next_step_handler(message, send_telNumber)

def send_telNumber(message):
   
    global fioMessage
    fioMessage=message
    bot.reply_to(message, "Введите  номер телефона контактного лица! ")

    bot.register_next_step_handler(message, send_obj)



def send_obj(message):
    
    global telMessage
    telMessage=message
    
    bot.reply_to(message, "Введите название Объекта")
    
    bot.register_next_step_handler(message, process_address_step)


def process_address_step(message):
    print('ЯВНУТРИ ПОСЛЕДНЕЙ ФУНКЦИИ',message.text)
    global objectNameMessage
    objectNameMessage = message
    # Send a confirmation message to the user with all the details
    # bot.reply_to(gMessage, "Thank you! Here are your details:\nName: "  + "\nPhone: " + telMessage + "\nAddress: " + gMessage + "\nDoctor: " + + "\nTime: " + objectNameMessage )
    bot.reply_to(message,"Спасибо мы приняли вашу заявку !")
    
    status='inProgress'

    AddRecord(companyNameMessage,binMessage,fioMessage,telMessage,objectNameMessage,status)

    
  
            
bot.polling()