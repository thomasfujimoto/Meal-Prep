import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.urls import path
from .views import receive_intls, receive_str, receive_strls, send_data_to_frontend

# What we need to implement to interact directly with the frontend aka bare bones functionality. 
# User permissions, security, state etc. taken care of in the other Django folder.

#Django receive/send setup. Goes in urls.py
urlpatterns = [
    path('api/receive_intls/', receive_intls, name='receive_intls'),
    path('api/receive_str/', receive_str, name='receive_str'),
    path('api/receive_strls/', receive_strls, name='receive_strls'),
    path('api/data/', send_data_to_frontend, name='send_data_to_frontend'),
]

#Categories in the .CSV:
# 22 minute meal
# #cakeweek
# 3 ingredient meal
# vegan
# vegetarian
# tree nut free
# #wasteless
# sugar conscious

#.csv filepath
filePath = "/workspaces/Prep-N-Plate/Prep_N_Plate_Backend/archive/epi_r.csv"

#Read and clean CSV where no calorie data is present
df = pd.read_csv(filePath)
df = df.dropna(axis=0, subset='calories')

#Print first 5 rows for the first 5 columns
print(df[df.columns[:5]].head()) 

#Receives the int array which represents survey choices selected or not
@csrf_exempt
@required_http_methods(["POST"])
def receive_intls_data(request):
    pass

#receives the string array which represents the chosen recipes selected after survey 
@csrf_exempt
@required_http_methods(["POST"])
def receive_str_data(request):
    pass

#receives recipe string name user chose to get more info about
@csrf_exempt
@required_http_methods(["POST"])
def receive_strls_data(request):
    pass

def send_to_frontend(request):
    pass

#return recipes based on user input from survey inputs above, 
#1 = choice selected, 0 not selected
def SurveyInput(array of ints):
    #order of array indexes: vegetarian, vegan, treeNutFree, sugarConscious, threeIngredients, cakeWeek, tTMinute, wasteless
    #Base cases: Nothing selected, drop nothing
    #Something selected: Filter out everything not selected
    #if no recipes available by options selected return no recipes found
    pass
     

#takes an array of recipe names chosen in the previous frontend step and then creates a grocery list 
def GenerateUserGroceryList(array of recipe names):
    pass

#takes an array of recipe names chosen in the previous frontend step and then creates a schedule with recipe directions
def GenerateUserSchedule(array of recipe names):
    pass

#takes recipe string name and returns calore info, ingredients, and directions
def RecipeInfo(recipe string name):
    pass