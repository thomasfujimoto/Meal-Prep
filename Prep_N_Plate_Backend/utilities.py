import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.urls import path

# What we need to implement to interact directly with the frontend aka bare bones functionality. 
# User permissions, security, state etc. taken care of in the other Django folder.

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
filePath = "Prep-N-Plate/Prep_N_Plate_Backend/archive/recipes.csv"
filePath2 = "Prep-N-Plate/Prep_N_Plate_Backend/archive/full_format_recipes.json"

#Read and clean CSV where no calorie data is present
df = pd.read_csv(filePath)
df = df.dropna(axis=0, subset='calories')

#Print first 5 rows for the first 5 columns
print(df[df.columns[:5]].head()) 

#Receives the int array which represents survey choices selected or not
@csrf_exempt
@require_http_methods(["POST"])
def receive_intls_data(request):
    pass

#receives the string array which represents the chosen recipes selected after survey 
@csrf_exempt
@require_http_methods(["POST"])
def receive_str_data(request):
    pass
#receives recipe string name user chose to get more info about
@csrf_exempt
@require_http_methods(["POST"])
def receive_strls_data(request):
    pass

def send_to_frontend(request):
    pass

#return recipes based on user input from survey inputs above, 
#1 = choice selected, 0 not selected
#Use this to get df in send function, in there convert DF to CSV
#DONE
def SurveyInput(int_arr):
    #order of array indexes: [bfast, lunch, dinner, vegetarian, vegan, treeNutFree, sugarConscious, tTMinute, calories]

    column_dict = {0: "breakfast", 1: "lunch", 2: "dinner", 3: "vegetarian", 4: "vegan", 5: "treeNutFree", 6: "sugarConscious", 7: "tTMinute", 8: "calories"}

    #Base cases: Nothing selected, drop nothing
    empty = all(x == 0 for x in int_arr)
    if empty == True:
        return df  
    #Something was selected
    else:
        for val in int_arr:
            if val == 0:
                df.drop(column_dict[val], axis=1, inplace=True)
        return df
    
#takes an array of recipe names chosen in the previous frontend step and then creates a grocery list 
#In Progress...
def GenerateUserGroceryList(recipes):
    grocery_list = []
    for recipe in recipes:
        grocery_list += get_total_ingredients(recipe, filePath2)
    return grocery_list


def get_total_ingredients(recipe_name):
    # Read the JSON file path
    with open(filePath2, 'r') as file:
        data = json.load(file)
    
    total_ingredients = {}
    
    recipe_data = None
    for key in data.keys():
        if recipe_name.lower() in key.lower():
            recipe_data = data[key]
            break
        
        if recipe_data:
            # Extract ingredients from the JSON slice
            start_index = recipe_data.find('"fat"')
            end_index = recipe_data.find(']', start_index)
            if start_index != -1 and end_index != -1:
                ingredients_json = recipe_data[start_index:end_index+1]
                ingredients = json.loads(ingredients_json)
                
                # Accumulate ingredients
                for ingredient in ingredients:
                    total_ingredients[ingredient] = total_ingredients.get(ingredient, 0) + 1
    
    return total_ingredients

def GenerateUserSchedule(recipes):
    user_schedule = []
    return_list = []
    for i in range(7):
        day_schedule = [recipes[i], recipes[i + 7], recipes[i + 14]]
        user_schedule.append(day_schedule)
  
    for i in user_schedule:
        return_list.append(OneDaySchedule(user_schedule[i]))

    return return_list


#takes an array of recipe names chosen in the previous frontend step and then creates a schedule with recipe directions
#Assumption: Generates ONE day's schedule. Will be called repeatedly to generate a schedule for the whole week. 

def OneDaySchedule(recipes):
    #Recipes NEEDS to specify which meal is for what time. Do this through implicit specification, 1st meal breakfast 2nd meal lunch 3rd meal dinner.
    #pseudocode
    #Slice recipes into breakfast, lunch, dinner
    #Order schedule by B, L, D. 
    #slice JSON file and get recipe ingredients + directions
    #return json slices
    
    #Recipe x = JSON Encoded String
    b_schedules = dict()
    l_schedules = dict()
    d_schedules = dict()

    b_schedules[recipe[0]] =  get_recipe_slice(recipe)
    l_schedules[recipe[1]] =  get_recipe_slice(recipe)
    d_schedules[recipe[2]] =  get_recipe_slice(recipe)
    #json_string = json.dumps([b_schedules, l_schedules, d_schedules])
    return [b_schedules, l_schedules, d_schedules]
        
    

#takes one recipe string name and returns calore info, ingredients, and directions
#DONE
# def get_recipe_slice(recipe_str):
#     with open(filePath2, 'r') as f:
#         data = json.load(f)
#         recipe_json = None
#         for recipe in data['recipes']:
#             if recipe['title'] == recipe_str:
#                 recipe_json = recipe['json']
#                 break
#         if recipe_json:
#             start_index = recipe_json.find("fat")
#             end_index = recipe_json.find("]", start_index) + 1
#             if start_index != -1 and end_index != -1:
#                 return recipe_json[start_index:end_index]
#         return None
