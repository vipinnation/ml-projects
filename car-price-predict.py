import pandas as pd
import numpy as np
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, FunctionTransformer
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from sklearn.pipeline import Pipeline


df = pd.read_csv("./data/car_dataset.csv")
 
df.drop_duplicates(inplace=True)
 

df = df[df["fuel"] != "Electric"]

df = df[df["selling_price"] < 1000000]
df = df[df["km_driven"] < 175000]

df = df[df["mileage"] > 10]
df = df[df["mileage"] < 35]

def add_others(feature_name, threshold):
    counts = df[feature_name].value_counts()
    unique = df[feature_name].nunique()

    repl = counts[counts <= threshold].index
    df[feature_name] = df[feature_name].replace(repl,'others')


add_others("company",50)
add_others("name",20) 


func = FunctionTransformer(func=np.log1p) 
df["selling_price"] = func.transform(df["selling_price"])



X = df[["name","year","km_driven","fuel","seller_type","transmission","owner","company"]]
Y = df["selling_price"]

xtrain,xtest,ytrain,ytest = train_test_split(X,Y,test_size=0.2, random_state=42)


encode_data  = ColumnTransformer(remainder="passthrough", transformers=[
    ("encode_data",OneHotEncoder(sparse_output=False, dtype="int32",drop="first") , [0,3,4,5,6,7])
])

 
lr = LinearRegression() 


pipe= Pipeline([
    ("encode_data",encode_data),
    ("model",lr)
])


pipe.fit(xtrain,ytrain)

y_pred = pipe.predict(xtest)

print("R2 Score", r2_score(y_true=ytest, y_pred=y_pred) * 100)

input_data = {
    'name': ['800 ac'],
    'company': ['maruti'],
    'year': [2007],
    'km_driven': [50000],
    'fuel': ['Petrol'],
    'transmission': ['Manual'],
    'owner': ['First Owner'],
    'seller_type':"Individual"
} 



input_df = pd.DataFrame(input_data) 
res = pipe.predict(input_df)
print("Predicated Value ",np.expm1(res))



import pickle

pickle.dump(df,open('artifacts/data.pkl','wb'))
pickle.dump(pipe,open('artifacts/pipe.pkl','wb'))