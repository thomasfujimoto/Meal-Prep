import pandas as pd
import json

# Function to filter recipes based on user preferences
import json

def SurveyInput(int_arr, df, output_file):
    # Mapping of indices to column names
    column_dict = {0: "breakfast", 1: "lunch", 2: "dinner", 3: "vegetarian", 4: "vegan", 5: "treeNutFree", 6: "sugarConscious", 7: "tTMinute", 8: "calories"}

    # If no preferences are selected, write the entire DataFrame to the output file
    if all(x == 0 for x in int_arr):
        df.to_json(output_file)
        return df  

    else:
        # Drop columns based on the selected preferences
        columns_to_drop = [column_dict[val] for val in int_arr if val == 0]
        df = df.drop(columns_to_drop, axis=1)
        
        # Ensure the last three columns are breakfast, lunch, and dinner
        columns_remaining = df.columns.tolist()
        columns_to_reorder = [col for col in ['breakfast', 'lunch', 'dinner'] if col in columns_remaining]
        column_order = [col for col in columns_remaining if col not in columns_to_reorder] + columns_to_reorder
        df = df[column_order]
        
        # Limit to 200 recipes if more than 200 are available
        if len(df) > 500:
            df = df.head(500)
        
        # Write the filtered DataFrame to the output file
        df.to_json(output_file)
        
        return df


# Function to generate grocery list from chosen recipes
def GenerateUserGroceryList(recipes):
    grocery_list = []
    for recipe in recipes:
        grocery_list += get_total_ingredients(recipe)
    return grocery_list

# Function to extract ingredients from recipes
def get_total_ingredients(recipe_name):
    # Read the JSON file containing recipes data
    with open(filePath2, 'r') as file:
        data = json.load(file)
    
    total_ingredients = {}
    
    recipe_data = None
    for key in data.keys():
        if recipe_name.lower() in key.lower():
            recipe_data = data[key]
            break
        
    if recipe_data:
        start_index = recipe_data.find('"fat"')
        end_index = recipe_data.find(']', start_index)
        if start_index != -1 and end_index != -1:
            ingredients_json = recipe_data[start_index:end_index+1]
            ingredients = json.loads(ingredients_json)
            
            for ingredient in ingredients:
                total_ingredients[ingredient] = total_ingredients.get(ingredient, 0) + 1
    
    return total_ingredients

# Function to generate user schedule from chosen recipes
def GenerateUserSchedule(recipes):
    user_schedule = []
    return_list = []
    for i in range(7):
        day_schedule = [recipes[i], recipes[i + 7], recipes[i + 14]]
        user_schedule.append(day_schedule)
  
    for i in user_schedule:
        return_list.append(OneDaySchedule(user_schedule[i]))

    return return_list

# Function to generate one day's schedule
def OneDaySchedule(recipes):
    b_schedules = dict()
    l_schedules = dict()
    d_schedules = dict()

    b_schedules[recipe[0]] =  get_recipe_slice(recipe)
    l_schedules[recipe[1]] =  get_recipe_slice(recipe)
    d_schedules[recipe[2]] =  get_recipe_slice(recipe)
    
    return [b_schedules, l_schedules, d_schedules]

# Function to extract recipe details from JSON
def get_recipe_slice(recipe_name):
    with open(filePath2, 'r') as f:
        data = json.load(f)
        recipe_json = None
        for recipe in data['recipes']:
            if recipe['title'] == recipe_name:
                recipe_json = recipe['json']
                break
        if recipe_json:
            start_index = recipe_json.find("fat")
            end_index = recipe_json.find("]", start_index) + 1
            if start_index != -1 and end_index != -1:
                return recipe_json[start_index:end_index]
        return None
