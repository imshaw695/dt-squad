import pandas as pd

new_data = pd.DataFrame({'col1': [5,6], 'col2': [7,8]})

df = pd.read_excel("testbook.xlsx", sheet_name="Sheet1")
print(df)

df = df.append(new_data, ignore_index=True)
print(df)
writer = pd.ExcelWriter("testbook.xlsx")
df.to_excel(excel_writer=writer, sheet_name="Sheet1", na_rep="", index=False)

writer.save()

