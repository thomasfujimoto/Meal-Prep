import pandas as pd

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

#return recipes based on user input from survey inputs above, 
#1 = choice selected, 0 not selected
SurveyInput(array of ints):
    #order of array indexes: vegetarian, vegan, treeNutFree, sugarConscious, threeIngredients, cakeWeek, tTMinute, wasteless
    #Base cases: Nothing selected, drop nothing
    #Something selected: Filter out everything not selected
    #if no recipes available by options selected return no recipes found
     

#takes an array of recipe names chosen in the previous frontend step and then creates a grocery list 
GenerateUserGroceryList(array of recipe names):

#takes an array of recipe names chosen in the previous frontend step and then creates a schedule with recipe directions
GenerateUserSchedule(array of recipe names):

#takes recipe string name and returns calore info, ingredients, and directions
RecipeInfo(recipe string name):