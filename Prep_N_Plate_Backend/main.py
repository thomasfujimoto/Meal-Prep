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
#Use this to get df in send function, in there convert DF to CSV
#DONE
def SurveyInput(int_arr):
    #order of array indexes: bfast, lunch, dinner, vegetarian, vegan, treeNutFree, sugarConscious, tTMinute, calories]

    column_dict = {0: "breakfast", 1: "lunch", 2: "dinner", 3: "vegetarian", 4: "vegan", 5: "treeNutFree", 6: "sugarConscious", 7: "tTMinute", 8: "calories"}

    #Base cases: Nothing selected, drop nothing
    empty = all(x == 0 for x in int_arr)
    if empty == True:
        return df  
    #Something was selected
    else:
        for val in int_arr:
            if val == 0:
                df.drop(column_dict[val], axis=1, inPlace=True)
        return df
    
#takes an array of recipe names chosen in the previous frontend step and then creates a grocery list 
#In Progress...
def GenerateUserGroceryList(recipes):
    pass

#takes an array of recipe names chosen in the previous frontend step and then creates a schedule with recipe directions
#In Progress...
def GenerateUserSchedule(recipes):
    pass

#takes one recipe string name and returns calore info, ingredients, and directions
#In Progress...
def RecipeInfo(recipe_str, 'archive/full_format_recipes.json'):


import json

def get_recipe_slice(recipe_title, json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
        recipe_json = None
        for recipe in data['recipes']:
            if recipe['title'] == recipe_title:
                recipe_json = recipe['json']
                break
        if recipe_json:
            start_index = recipe_json.find("fat")
            end_index = recipe_json.find("]", start_index) + 1
            if start_index != -1 and end_index != -1:
                return recipe_json[start_index:end_index]
        return None

# Example usage
recipe_title = 'Pancakes'
json_file = 'recipes.json'

recipe_slice = get_recipe_slice(recipe_title, json_file)
if recipe_slice:
    print("Recipe slice found:")
    print(recipe_slice)
else:
    print("Recipe slice not found.")